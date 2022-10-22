import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ThemeService } from '@shared/services/theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent implements OnInit, AfterViewChecked {

  title = 'Edward Y. Rogers';

  currentTheme$: Observable<string>;

  constructor(
    private readonly titleService: Title,
    private readonly themeService: ThemeService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.currentTheme$ = this.themeService.currentTheme$;

    this.titleService.setTitle(this.title);
  }

  ngAfterViewChecked(): void {
    this.themeService.themeSwitcher$.next(undefined);
    this.changeDetectorRef.detectChanges();
  }
}
