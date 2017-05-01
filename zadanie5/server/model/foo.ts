export class Foo {
  get id() {
    return this._id;
  }

  constructor(
    private _id: number,
    public category: string,
    public name: string,
    public price: number = 0
  ) { }
}