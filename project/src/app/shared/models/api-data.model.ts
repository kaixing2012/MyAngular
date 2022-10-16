import { Collection } from './data-room.model';

export class ApiData<T> {
  status: 'LOADING' | 'SUCCESS' | 'FAILURE';
  collection: Collection<T>;
}
