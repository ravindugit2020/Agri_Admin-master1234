export class CommentDTO{
  private _comment_desc: string;
  private _status: string;
  private _expert_name: string;
  private _expert_img: string;
  private _problem_id: string;

  constructor(comment_desc: string, status: string, expert_name: string, expert_img: string, problem_id: string) {
    this._comment_desc = comment_desc;
    this._status = status;
    this._expert_name = expert_name;
    this._expert_img = expert_img;
    this._problem_id = problem_id;
  }

  get comment_desc(): string {
    return this._comment_desc;
  }

  set comment_desc(value: string) {
    this._comment_desc = value;
  }

  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }

  get expert_name(): string {
    return this._expert_name;
  }

  set expert_name(value: string) {
    this._expert_name = value;
  }

  get expert_img(): string {
    return this._expert_img;
  }

  set expert_img(value: string) {
    this._expert_img = value;
  }

  get problem_id(): string {
    return this._problem_id;
  }

  set problem_id(value: string) {
    this._problem_id = value;
  }
}
