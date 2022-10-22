import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, skip, tap } from 'rxjs/operators';

export const THEME_MODE = {
  DARK: 'project-dark-theme',
  LIGHT: 'project-light-theme',
};

export const THEME_OPTIONS = Object
  .keys(THEME_MODE)
  .reduce((prev, curr) => ({
    ...prev,
    [THEME_MODE[curr]]: {
      icon: THEME_MODE[curr] !== THEME_MODE.LIGHT ? 'light_mode' : 'dark_mode',
      label: THEME_MODE[curr] !== THEME_MODE.LIGHT ? 'Light Mode' : 'Dark Mode'
    }
  }), {});

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme = THEME_MODE.DARK;

  themeSwitcher$ = new BehaviorSubject(this.currentTheme);

  currentTheme$ = new Observable<string>();

  constructor(
    private readonly overlayContainer: OverlayContainer
  ) {

    this.currentTheme$ = this.themeSwitcher$
      .pipe(
        skip(1),
        tap(theme => this.currentTheme = theme ?? this.currentTheme),
        tap(theme => this.setThemeMode(theme)),
        map(_ => this.currentTheme)
      );
  }

  private setThemeMode(mode: string): void {
    if (mode === THEME_MODE.LIGHT) {
      this.overlayContainer
        .getContainerElement()
        .classList.remove(THEME_MODE.DARK);

      this.overlayContainer
        .getContainerElement()
        .classList.add(THEME_MODE.LIGHT);

    } else {
      this.overlayContainer
        .getContainerElement()
        .classList.remove(THEME_MODE.LIGHT);

      this.overlayContainer
        .getContainerElement()
        .classList.add(THEME_MODE.DARK);
    }
  }
}
