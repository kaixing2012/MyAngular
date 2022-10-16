import { Store } from '@ngrx/store';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @HostBinding('class') cssClass: any;

  title = 'Edward\'s Angular Demo';

  env: typeof environment = environment;

  isDarkMode = false;

  testSubject = new Subject();
  subscription = new Subscription();

  constructor(
    private readonly titleService: Title,
    private readonly overlayContainer: OverlayContainer,
    private readonly store: Store
  ) { }

  ngOnInit() {
    this.titleService.setTitle(this.title);

    this.setThemeMode('dark');
  }

  setThemeMode(mode: string): void {

    if (mode === 'light') {
      this.overlayContainer.getContainerElement().classList.remove('project-dark-theme');

      this.overlayContainer.getContainerElement().classList.add('project-light-theme');
      this.cssClass = 'project-light-theme';

      this.isDarkMode = false;
    } else {
      this.overlayContainer.getContainerElement().classList.remove('project-light-theme');

      this.overlayContainer.getContainerElement().classList.add('project-dark-theme');
      this.cssClass = 'project-dark-theme';

      this.isDarkMode = true;
    }
  }

  onModeClick(mode: string): void {
    this.setThemeMode(mode);
  }
}
