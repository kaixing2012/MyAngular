/**
 * 圓形倒數器 Component
 */
import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input,
  OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild
} from '@angular/core';
import { Observable, of, Subject, Subscription, timer } from 'rxjs';
import { map, tap } from 'rxjs/operators';

interface SecondToTime {
  currentDays: string;
  currentHours: string;
  currentMinutes: string;
  currentSeconds: string;
}

export interface TimerOutput {
  tickVal: number;
  isStopInSubscription: boolean;
}

export interface TimeSwitcherState {
  isStartToTick: boolean;
  isShowingTimeLeft?: boolean;
  isStopInSubscription?: boolean;
}
@Component({
  selector: 'app-circle-countdown',
  templateUrl: './circle-countdown.component.html',
  styleUrls: ['./circle-countdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class CircleCountDownComponent implements OnChanges, OnInit, OnDestroy {

  // 宣告計時器開關
  @Input() switcher: Subject<TimeSwitcherState>;
  // 宣告倒數總時間
  @Input() timeLimit: number;
  // 宣告計時器尺寸
  @Input() timerSize: number;
  // 宣告計時器旁邊文字
  @Input() sideNote: string;
  // 宣告計時器重置按鈕文字
  @Input() restartName: string;
  // 宣告計時器顏色
  @Input() color: string;
  // true會隱藏重新計時(僅倒數一次)
  @Input() cancelTimer: boolean;
  // cancelTimer === true 隱藏重新計時顯示文字
  @Input() cancelContent: string;
  // 宣告時間輸出者
  @Output() readonly tick: EventEmitter<TimerOutput> = new EventEmitter();
  // 宣告重置時間輸出者
  @Output() readonly restart: EventEmitter<boolean> = new EventEmitter();

  // 宣告計時器外圈 ViewChild
  @ViewChild('baseTimerPathRemaining', { static: false }) baseTimerPathRemaining: ElementRef;

  // 宣告計時器 ViewChild
  @ViewChild('circleTimer', { static: true }) circleTimer: ElementRef;

  // 宣告計時器外圈總長
  private readonly FULL_DASH_ARRAY = 283;

  // 宣告計時器尖閣時間
  private readonly TICK = 100;

  // 宣告計時器時間
  private timeLeft: number;
  // private timeWhenPause: number;
  // private timeRecorded: number;

  // 宣告計時器原始倒數總時間
  private originalLimit: number;

  // 宣告計時器
  timer$: Observable<{ currentTime: number }>;

  // 宣告計時器剩餘時間數字格式
  formatedTime: string;

  // 宣告計時器剩餘時間數字大小
  fontSize: string;

  // 宣告計時器圈圈變數
  circleDasharray: string;

  subscription = new Subscription();

  constructor(
    private readonly changeDetector: ChangeDetectorRef
  ) {

    // this.platform.ready()
    //   .then(() => {
    //     // 當APP退到背景時(Android, IOS)
    //     // 螢幕鎖屏時(only Android)
    //     document.addEventListener('pause', () => {
    //       console.log('CircleCountDownComponent Going Background');

    //       setTimeout(() => {
    //         // 紀錄當前timestamp
    //         this.timeWhenPause = Math.floor(Date.now());
    //         this.timeRecorded = this.timeLeft;

    //         console.log('CircleCountDownComponent Set Time When Pause', this.timeLeft);
    //       }, 0);
    //     });
    //     // 螢幕鎖屏時(only IOS)
    //     document.addEventListener('resign', () => {
    //       console.log('CircleCountDownComponent Going Background');

    //       setTimeout(() => {
    //         this.timeWhenPause = Math.floor(Date.now());
    //         this.timeRecorded = this.timeLeft;

    //         console.log('CircleCountDownComponent Set Time When Pause', this.timeLeft);
    //       }, 0);
    //     });
    //     // 當APP從背景到前景狀態時(Android, IOS)
    //     // 解除鎖屏時(only Android)
    //     document.addEventListener('resume', () => {
    //       // 紀錄當前 timestamp 再與退到背景的timestamp相減 得到APP退到背景/鎖屏的時間
    //       const newTimeLeft = this.timeRecorded - (Math.floor(Date.now()) - this.timeWhenPause);
    //       const newTimeLeftRound100 = Math.round(newTimeLeft / 100) * 100;
    //       this.timeLeft = newTimeLeftRound100;
    //       this.checkIfSwitchOffTimer();
    //       this.circleDasharray = this.getCircleDasharray();

    //       console.log('CircleCountDownComponent Back To frontground', this.timeLeft);
    //     });
    //     // 解除鎖屏時(only IOS)
    //     document.addEventListener('active', () => {
    //       const newTimeLeft = this.timeRecorded - (Math.floor(Date.now()) - this.timeWhenPause);
    //       const newTimeLeftRound100 = Math.round(newTimeLeft / 100) * 100;
    //       this.timeLeft = newTimeLeftRound100;
    //       this.checkIfSwitchOffTimer();
    //       this.circleDasharray = this.getCircleDasharray();

    //       console.log('CircleCountDownComponent Back To frontground', this.timeLeft);
    //     });
    //   })
    //   .catch();
  }

  ngOnChanges(changes: SimpleChanges): void {
    Object.keys(changes)
      .forEach(propName => {
        if (changes.hasOwnProperty(propName)) {
          switch (propName) {
            case 'timeLimit':
              this.timeLeft = changes[propName].currentValue;

              if (!this.originalLimit) {
                // PR20010016-3214
                // 為了防止零秒後的分秒顯示，故在顯示上減一秒
                // 其中會在這個 convertSecondsToTime method 加一秒
                // 只寫在這裡是因為這裡是整個限制秒數的開始點
                this.originalLimit = (changes[propName].currentValue - 1) * 1000;
                this.timeLeft = this.originalLimit;
              }

              break;

            case 'timerSize':
              this.timerSize = changes[propName].currentValue;
              break;

            case 'sideNote':
              this.sideNote = changes[propName].currentValue;
              break;

            case 'color':
              this.color = changes[propName].currentValue;
              break;

            default:
              break;
          }
        }
      });
  }

  ngOnInit(): void {
    this.subscription.add(
      this.switcher
        .subscribe(res => {
          // 倒數器開關狀態
          const isStartToTick = res.isStartToTick;
          // 暫停倒數器，但是否顯示甚於時間
          const isShowingTimeLeft = res?.isShowingTimeLeft;

          this.circleDasharray = this.getCircleDasharray();

          this.changeDetector.markForCheck();

          console.log('CircleCountDownComponent isStartToTick', isStartToTick);
          console.log('CircleCountDownComponent isShowingTimeLeft', isShowingTimeLeft);

          if (!isStartToTick) {
            if (isShowingTimeLeft) {
              this.timer$ = of({ currentTime: this.timeLeft });
            } else {
              this.timer$ = of({ currentTime: 0 });
            }
          } else if (isStartToTick) {

            this.timer$ = timer(0, this.TICK)
              .pipe(
                // 倒扣時間
                map(() => {

                  return {
                    currentTime: this.timeLeft -= 100
                  };
                }),

                // 計算計時器外圈剩餘長度跟輸出當前時間
                tap(tickTimer => {
                  this.checkIfSwitchOffTimer();
                  this.circleDasharray = this.getCircleDasharray();
                  this.setCounterSize();
                  this.setTimeFormatted(tickTimer.currentTime);
                  this.tick.emit({
                    tickVal: tickTimer.currentTime,
                    isStopInSubscription: res.isStopInSubscription ? res.isStopInSubscription : false
                  });
                })
              );
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * 計算計時器外圈剩餘長度
   * @returns void
   */
  private getCircleDasharray(): string {
    // 計算剩餘長度
    return `${(this.calculateTimeFraction() * this.FULL_DASH_ARRAY)} ${this.FULL_DASH_ARRAY}`;
  }

  /**
   * 計算計時器外圈剩餘長度
   * @returns number
   */
  private calculateTimeFraction(): number {
    // 剩餘時間除總時
    const rawTimeFraction = this.timeLeft / this.originalLimit;

    return rawTimeFraction - (1 / this.originalLimit) * (1 - rawTimeFraction);
  }

  /**
   * 設置計時器的尺寸
   * @returns void
   */
  private setCounterSize(): void {
    const circleTimerStyle = this.circleTimer?.nativeElement.style;

    if (!this.timerSize) {
      const grandParentStyle = this.circleTimer?.nativeElement.parentNode.parentNode.style;

      if (grandParentStyle.width) {
        circleTimerStyle.width = '100%';
        this.setFontSize(this.timeLeft, grandParentStyle.width);
      } else {
        circleTimerStyle.display = 'none';
      }
    } else {
      circleTimerStyle.width = `${this.timerSize}px`;
      this.setFontSize(this.timeLeft, this.timerSize);
    }
  }

  /**
   * 設定倒數文字尺寸
   * @param currentMS: 當前時間（分秒）
   * @param containerHeight: 元件的高度
   * @returns string
   */
  private setFontSize(currentMS: number, containerWidth: string | number): void {
    const width = typeof containerWidth === 'string'
      ? parseInt(containerWidth, 10)
      : containerWidth;

    if (currentMS % 10 === 0) {

      const newTimeLeft = currentMS / 1000;

      if (newTimeLeft < 60) {
        this.fontSize = `${width * 0.3}px`;
      } else if (newTimeLeft < 3600) {
        this.fontSize = `${width * 0.2}px`;
      } else {
        this.fontSize = `${width * 0.1}px`;
      }
    }
  }

  /**
   * 設定倒數文字格式
   * @param currentMS: 當前時間（分秒）
   * @returns string
   */
  private setTimeFormatted(currentMS: number): void {
    if (currentMS % 10 === 0) {
      const newTimeLeft = currentMS / 1000;

      const currentTime = this.convertSecondsToTime(newTimeLeft);

      if (newTimeLeft < 60) {
        this.formatedTime = `${currentTime.currentSeconds}`;
      } else if (newTimeLeft < 3600) {
        this.formatedTime = `${currentTime.currentMinutes}:${currentTime.currentSeconds}`;
      } else {
        this.formatedTime = `${currentTime.currentHours}:${currentTime.currentMinutes}:${currentTime.currentSeconds}`;
      }
    }
  }

  /**
   * 轉化秒數到時間格式
   * @returns: SecondToTime
   */
  convertSecondsToTime(time: number): SecondToTime {
    const d = Math.floor(time / (3600 * 24));
    const h = Math.floor(time % (3600 * 24) / 3600);
    const m = Math.floor(time % 3600 / 60);
    const s = Math.floor(time % 60);

    return {
      currentDays: d.toString(),
      currentHours: ('0' + h).slice(-2),
      currentMinutes: ('0' + m).slice(-2),
      // PR20010016-3214
      // 為了防止零秒後的分秒顯示，故在顯示上加一秒
      currentSeconds: ('0' + (s + 1)).slice(-2)
    };
  }

  private checkIfSwitchOffTimer(): void {
    if (this.timeLeft < 1) {
      this.switcher.next({isStartToTick: false});
    }
  }

  /**
   * 輸出是否重置時間
   * @returns void
   */
  onResetTimer(): void {
    this.timeLeft = this.originalLimit;
    this.restart.emit();
  }
}
