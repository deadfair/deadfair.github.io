export class Link<T>{

  private _previous: Link<T> | null = null;
  private _next: Link<T> | null = null;
  constructor(private _value: T){}

  public get previous(): Link<T> | null {
    return this._previous;
  }
  public set previous(value: Link<T> | null) {
    this._previous = value;
  }

  public get next(): Link<T> | null {
    return this._next;
  }
  public set next(value: Link<T> | null) {
    this._next = value;
  }
  public get value(): T {
    return this._value;
  }
  public set value(value: T) {
    this._value = value;
  }
}
