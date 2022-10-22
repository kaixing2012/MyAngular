import { Component, OnInit } from '@angular/core';
import { ThemeService, THEME_MODE, THEME_OPTIONS } from '@shared/services/theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  readonly THEME_OPTIONS = THEME_OPTIONS;

  currentTheme$: Observable<string>;

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
}
