import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Collection } from '@shared/models/data-room.model';
import { catchError, map, mergeMap, Observable, of } from 'rxjs';
import { DataRoomAction } from './data-room.action';

@Injectable()
export class DataRoomEffect {
  constructor(
    private readonly actions$: Actions,
    private readonly http: HttpClient
  ) {
  }

  load$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType<DataRoomAction>('LOADING'),
      mergeMap((action, index) => {
        const baseUri = 'https://gorest.co.in/public/v1';
        const request = action.request;
        const uri = `${baseUri}/${request.uri}`;

        switch (request.method) {

          case 'get':
            return this.http.get<Collection<any>>(uri)
              .pipe(
                map((res) => {
                  const payload = new Collection({
                    meta: res.meta,
                    data: res.data.map((d) => new action.model(d))
                  });

                  return new DataRoomAction('SUCCESS', payload, action.request);
                }),
                catchError((err) => of(new DataRoomAction('FAILURE')))
              );

          case 'post':
            const body = {

            };

            return this.http.post<Collection<any>>(uri, body)
            .pipe(
              map((res) =>
                new DataRoomAction('SUCCESS', res, action.request)
              ),
              catchError((err) => of(new DataRoomAction('FAILURE')))
            );
          default:
            break;
        }

      })
    );
  });
}

