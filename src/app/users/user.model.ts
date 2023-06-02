export class User {
  constructor(
    public uuid: string,
    public authz: boolean,
    public username: string
  ) {}
}
