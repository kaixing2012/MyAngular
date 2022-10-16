import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, iif, Observable, of, Subscription } from 'rxjs';

export const DATA = {
  king: {
    code: 0,
    name: 'king',
    expression: 'I am the King of the world',
    imageUrl: '/assets/images/king.png'
  },
  queen: {
    code: 1,
    name: 'queen',
    expression: 'I am a nice Queen',
    imageUrl: '/assets/images/queen.png'
  }
};

@Component({
  selector: 'app-attempt',
  templateUrl: './attempt.page.html',
  styleUrls: ['./attempt.page.scss']
})
export class AttemptPage implements OnInit, OnDestroy {

  DATA = DATA;

  data$: Observable<any>;

  dataSubject = new BehaviorSubject<number>(0);

  subscription = new Subscription();
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.dataSubject.subscribe({
        next: (dataIndex) => {
          this.data$ = iif(
            () => dataIndex === DATA.king.code,
            of(this.DATA.king),
            of(this.DATA.queen)
          );
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onTabChange(evt: any): void {
    setTimeout(() => {
      this.dataSubject.next(evt.index);
    }, 200);
  }
}
