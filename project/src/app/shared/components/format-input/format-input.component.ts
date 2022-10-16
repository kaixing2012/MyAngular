import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-format-input',
  templateUrl: './format-input.component.html',
  styleUrls: ['./format-input.component.scss']
})
export class FormatInputComponent implements OnInit {

  @Input()
  value: any;
  @Input()
  inputFormat: string;
  @Input()
  outputFormat: string;
  @Input()
  decimal: number;

  @Output() readonly sendout = new EventEmitter();

  lastValue: any;

  constructor() { }

  ngOnInit(): void {

  }

  onFocus(): void {

    if (this.value) {
      if (this.value.includes(this.outputFormat)) {
        this.lastValue = this.value.replaceAll(this.outputFormat, '');
      } else {
        this.lastValue = this.value;
      }
    } else {
      this.lastValue = '';
    }

    this.sendout.emit(this.lastValue);
  }

  onKey(value: any): void {
    this.sendout.emit(value);
  }

  onBlur(): void {
    const valEmitted = this.value.replace(this.inputFormat, this.outputFormat);
    this.sendout.emit(valEmitted);
  }
}
