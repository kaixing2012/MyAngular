# MyAngular

Coming soon

# Getting Started

Coming soon

# Shared Components
> ## Shared Components
> 
> > ### CCY Amount Input Field
> > 
> > ts
> > ```typescript
> > form = new FormGroup({
> >   test: new FormControl(0, Validators.compose([Validators.required]))
> > })
> > 
> > onBlur(): void {
> >   // Do Something on forcus out
> > }
> > ```
> > 
> > html
> > ```html
> > <form [formGroup]="form">
> >   <app-ccy-amt-input
> >     formControlName="test" 
> >     [placeholder]="'請輸入金額'"
> >     [decimalPlace]="0" 
> >     [minAmt]="0" 
> >     (blurFunction)="onBlur()">
> >   </app-ccy-amt-input>
> > </form>
> > ```
> > 
> > ### Circle Countdown
> > 
> > ts
> > ```typescript
> > timerSwitcher$ = new BehaviorSubject<TimeSwitcherState>(
> >   {isStartToTick: true}
> > );
> > 
> > onTimeCheck(event: TimerOutput): void {
> >   // Do something when time is ticking
> > }
> > ```
> > 
> > html
> > ``` html
> > <app-circle-countdown 
> >   [timeLimit]="50" 
> >   [timerSize]="50" 
> >   [color]="''" 
> >   [sideNote]="'有效時間'" 
> >   [restartName]="''" 
> >   [switcher]="timerSwitcher$" 
> >   (tick)="onTimeCheck($event)"
> > > 
> > </app-circle-countdown>
> > ```
> > 