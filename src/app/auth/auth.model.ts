export class User {
  constructor(
    public id: string,
    public authz: boolean,
    public username: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  get token() {
    return Date.now() < new Date(this._tokenExpirationDate).getTime()
      ? this._token
      : null;
  }
}
