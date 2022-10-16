export class User {

  ID: number;
  NAME: string;
  EMAIL: string;
  GENDER: string;
  STATUS: string;

  constructor(obj: any) {

    if (obj) {
      this.ID = obj.id;
      this.NAME = obj.name;
      this.EMAIL = obj.email;
      this.GENDER = obj.gender;
      this.STATUS = obj.status;
    }
  }
}
