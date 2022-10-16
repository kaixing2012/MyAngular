import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getDataRoom } from '@store/app/app.selector';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-tai-chi-loading',
  templateUrl: './tai-chi-loading.component.html',
  styleUrls: ['./tai-chi-loading.component.scss']
})
export class TaiChiLoadingComponent implements OnInit, OnDestroy {

  subscription = new Subscription();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private readonly store: Store
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.store
      .pipe(
        select(getDataRoom),
        tap((res) => {
          if ( res.status === 'LOADING') {
            this.document.body.style.overflow = 'hidden';
          } else {
            this.document.body.style.overflow = 'auto';
          }
        })
      )
      .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
