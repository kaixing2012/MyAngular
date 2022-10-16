import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

import { SharedDirectiveModule } from '@shared/directives/shared-directive.module';
import { CcyAmtInputComponent } from './ccy-amt-input/ccy-amt-input.component';
import { CircleCountDownComponent } from './circle-countdown/circle-countdown.component';
import { FormatInputComponent } from './format-input/format-input.component';
import { OnlyDayPickerComponent } from './only-day-picker/only-day-picker.component';
import { TaiChiLoadingComponent } from './tai-chi-loading/tai-chi-loading.component';

const MatComponents = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatGridListModule,
  MatSidenavModule,
  MatTabsModule,
  MatTableModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatRadioModule,
  MatFormFieldModule,
  MatInputModule,
  MatDividerModule,
  MatBadgeModule,
  MatSnackBarModule,
  MatStepperModule,
  MatSlideToggleModule,
];

@NgModule({
  imports: [CommonModule, SharedDirectiveModule],
  exports: [
    MatComponents,
    CircleCountDownComponent,
    FormatInputComponent,
    TaiChiLoadingComponent,
    CcyAmtInputComponent,
    OnlyDayPickerComponent,
  ],
  declarations: [
    CircleCountDownComponent,
    FormatInputComponent,
    TaiChiLoadingComponent,
    CcyAmtInputComponent,
    OnlyDayPickerComponent,
  ],
})
export class SharedComponentModule {}
