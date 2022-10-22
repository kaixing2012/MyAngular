import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ApiData } from '@shared/models/api-data.model';
import { BaseRequest } from '@shared/requests/base.request';
import { Typeable } from '@shared/types/typeable';
import * as DataRoomSelector from '@store/app/app.selector';
import { AppState } from '@store/app/app.state';
import { DataRoomAction } from '@store/data-room/data-room.action';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private readonly store: Store<AppState>,
  ) { }

  request<T>(request: BaseRequest, model: Typeable<T>): Observable<ApiData<T>> {
    const action = new DataRoomAction('LOADING', undefined, request, model);
    this.store.dispatch(action);

    return this.store
      .pipe(
        select(DataRoomSelector.getDataRoom),
        switchMap(res => {
          const apiData = new ApiData<T>();
          apiData.collection = res.collection?.get(request.name);
          apiData.status = res.status;

          return of(apiData);
        })
      );
  }
}
