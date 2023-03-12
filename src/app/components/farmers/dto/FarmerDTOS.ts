export class FarmerDTOS{
  private _farmer_id: string;
  private _farmer_name : string;
  private _farmer_contact : string;
  private _farmer_image : string;
  private _farmer_password : string;
  private _fertilizer : string;
  private _status : string;

  constructor(farmer_id: string, farmer_name: string, farmer_contact: string, farmer_image: string, farmer_password: string, fertilizer: string, status: string) {
    this._farmer_id = farmer_id;
    this._farmer_name = farmer_name;
    this._farmer_contact = farmer_contact;
    this._farmer_image = farmer_image;
    this._farmer_password = farmer_password;
    this._fertilizer = fertilizer;
    this._status = status;
  }

  get farmer_id(): string {
    return this._farmer_id;
  }

  set farmer_id(value: string) {
    this._farmer_id = value;
  }

  get farmer_name(): string {
    return this._farmer_name;
  }

  set farmer_name(value: string) {
    this._farmer_name = value;
  }

  get farmer_contact(): string {
    return this._farmer_contact;
  }

  set farmer_contact(value: string) {
    this._farmer_contact = value;
  }

  get farmer_image(): string {
    return this._farmer_image;
  }

  set farmer_image(value: string) {
    this._farmer_image = value;
  }

  get farmer_password(): string {
    return this._farmer_password;
  }

  set farmer_password(value: string) {
    this._farmer_password = value;
  }

  get fertilizer(): string {
    return this._fertilizer;
  }

  set fertilizer(value: string) {
    this._fertilizer = value;
  }

  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }
}
