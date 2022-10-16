import { Meta } from './meta.model';

export class DataRoom {
  status: 'LOADING' | 'SUCCESS' | 'FAILURE';
  collection: Map<string, Collection<any>>;
}

export class Collection<T> {
  meta: Meta;
  data: Array<T>;

  constructor(obj: Collection<any>) {
    if (obj) {
      Object.assign(this, obj);
    }
  }
}
