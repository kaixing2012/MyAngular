import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'project';

  form = new FormGroup({
    test: new FormControl(0, Validators.required),
  });

  onBlurGetFeeInfo(): void {
    return;
  }
}
