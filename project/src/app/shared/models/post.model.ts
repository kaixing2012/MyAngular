export class Post {
  ID: number;
  USER_ID: number;
  TITLE: string;
  BODY: string;

  constructor(obj: any) {
    if (obj) {
      this.ID = obj.id;
      this.USER_ID = obj.user_id;
      this.TITLE = obj.title;
      this.BODY = obj.body;
    }
  }
}
