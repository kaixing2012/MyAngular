import { BaseRequest } from './base.request';

export class PostGetRequest extends BaseRequest {
  constructor(page: string) {
    super();
    this.method = 'get';
    this.name = 'posts';
    this.uri = `${this.name}?${page}`;
  }
}
