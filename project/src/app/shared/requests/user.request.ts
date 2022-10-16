import { BaseRequest } from './base.request';

export class UserGetRequest extends BaseRequest {
  constructor(page: string) {
    super();
    this.method = 'get';
    this.name = 'users';
    this.uri = `${this.name}?${page}`;
  }
}
