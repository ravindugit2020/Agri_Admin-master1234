export class ProblemsDTO{
  private _farmer_name : string;
  private _farmer_image : string;
  private _problem_title : string;
  private _problem_desc : string;
  private _status : string;

  constructor(farmer_name: string, farmer_image: string, problem_title: string, problem_desc: string, status: string) {
    this._farmer_name = farmer_name;
    this._farmer_image = farmer_image;
    this._problem_title = problem_title;
    this._problem_desc = problem_desc;
    this._status = status;
  }

  get farmer_name(): string {
    return this._farmer_name;
  }

  set farmer_name(value: string) {
    this._farmer_name = value;
  }

  get farmer_image(): string {
    return this._farmer_image;
  }

  set farmer_image(value: string) {
    this._farmer_image = value;
  }

  get problem_title(): string {
    return this._problem_title;
  }

  set problem_title(value: string) {
    this._problem_title = value;
  }

  get problem_desc(): string {
    return this._problem_desc;
  }

  set problem_desc(value: string) {
    this._problem_desc = value;
  }

  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }
}
