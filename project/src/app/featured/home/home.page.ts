import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  subscription = new Subscription();

  form = new FormGroup({
    ccy: new FormControl({ value: 0, disabled: false }),
  });
  active = 1;
  decimalPlace = 4;
  value = 1000;

  // 宣告當前倒數的時間
  currentTickTime?: number;

  // 宣告是否重置計時器
  isResetTimer?: boolean;

  // 宣告倒數計時器開關
  // timerSwitcher$ = new BehaviorSubject<TimeSwitcherState>({
  //   isStartToTick: true,
  // });

  constructor() {}

  ngOnInit(): void {
    // 設定開始倒數
    // this.timerSwitcher$.next({ isStartToTick: true });
  }

  submit(): void {
    console.log(this.form.value);
    console.log(this.form.valid);
  }
  increase(): void {
    this.value++;
  }

  decrease(): void {
    this.value--;
  }

  /**
   * 確認到數時間
   * @param event: 來自 Circle Counter Emitter 的當下秒數
   * @returns void
   */
  // onTimeCheck(event: TimerOutput): void {
  //   if (event.tickVal < 1) {
  //     // this.isNextDisable = true;
  //     if (event.isStopInSubscription) {
  //       // this.isNextDisable = true;
  //     }
  //   }

  //   this.currentTickTime = event.tickVal;
  // }

  /**
   * 確認是否使用者重置 Timer
   * @param event: 來自 Circle Counter Emitter 來確認使用者是否按重置時間
   * @returns void
   */
  //  onResetTimer(): void {
  //   this.timerSwitcher$.next({ isStartToTick: true });
  // }
  onBlurGetFeeInfo(): void {
    return;
  }
}
