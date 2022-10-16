import { Action } from '@ngrx/store';
import { Collection } from '@shared/models/data-room.model';
import { BaseRequest } from '@shared/requests/base.request';
import { Typeable } from '@shared/types/typeable';

export class DataRoomAction implements Action {
  type: 'LOADING' | 'SUCCESS' | 'FAILURE';
  payload: Collection<any>;
  request: BaseRequest;
  model: Typeable<any>;

  constructor(
    type: 'LOADING' | 'SUCCESS' | 'FAILURE',
    payload?: Collection<any>,
    request?: BaseRequest,
    model?: Typeable<any>
  ) {
    this.type = type;
    this.payload = payload;
    this.request = request;
    this.model = model;
  }
}
