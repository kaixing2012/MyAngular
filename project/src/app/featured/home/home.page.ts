import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TimerOutput, TimeSwitcherState } from '@shared/components/circle-countdown/circle-countdown.component';
import { ThemeService, THEME_MODE, THEME_OPTIONS } from '@shared/services/theme.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  readonly THEME_OPTIONS = THEME_OPTIONS;

  currentTheme$: Observable<string>;

  timerSwitcher$ = new BehaviorSubject<TimeSwitcherState>({isStartToTick: true});

  form = new FormGroup({
    test: new FormControl(0, Validators.compose([Validators.required]))
  });

  constructor(
    private readonly themeService: ThemeService
  ) { }

  ngOnInit() {
    this.currentTheme$ = this.themeService.currentTheme$;
  }

  onThemeSwitch(theme: string): void {
    this.themeService.themeSwitcher$.next(
      theme === THEME_MODE.LIGHT ? THEME_MODE.DARK : THEME_MODE.LIGHT
    );
  }

  onBlur(): void {

  }

  onTimeCheck(event: TimerOutput): void {
    if (event.tickVal < 1) {

    }
  }
}
