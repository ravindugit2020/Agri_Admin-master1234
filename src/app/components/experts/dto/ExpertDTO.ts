export class ExpertDTO{
  private _expert_name : string;
  private _expert_password : string;
  private _expert_title : string;
  private _expert_desc : string;
  private _expert_contact : string;
  private _expert_mail : string;
  private _expert_img : string;
  private _status : string;

  constructor(expert_name: string, expert_password: string, expert_title: string, expert_desc: string, expert_contact: string, expert_mail: string, expert_img: string, status: string) {
    this._expert_name = expert_name;
    this._expert_password = expert_password;
    this._expert_title = expert_title;
    this._expert_desc = expert_desc;
    this._expert_contact = expert_contact;
    this._expert_mail = expert_mail;
    this._expert_img = expert_img;
    this._status = status;
  }

  get expert_name(): string {
    return this._expert_name;
  }

  set expert_name(value: string) {
    this._expert_name = value;
  }

  get expert_password(): string {
    return this._expert_password;
  }

  set expert_password(value: string) {
    this._expert_password = value;
  }

  get expert_title(): string {
    return this._expert_title;
  }

  set expert_title(value: string) {
    this._expert_title = value;
  }

  get expert_desc(): string {
    return this._expert_desc;
  }

  set expert_desc(value: string) {
    this._expert_desc = value;
  }

  get expert_contact(): string {
    return this._expert_contact;
  }

  set expert_contact(value: string) {
    this._expert_contact = value;
  }

  get expert_mail(): string {
    return this._expert_mail;
  }

  set expert_mail(value: string) {
    this._expert_mail = value;
  }

  get expert_img(): string {
    return this._expert_img;
  }

  set expert_img(value: string) {
    this._expert_img = value;
  }

  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }
}
