export class BaseRequest {
  method: 'get' | 'post' | 'put' | 'delete';
  name: string;
  uri: string;
}
