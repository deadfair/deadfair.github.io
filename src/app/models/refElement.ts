import { ElementRef } from "@angular/core";

export class RefElement {
  private _elementRef?: ElementRef

  constructor(private readonly _id: string,private readonly _text:string){}

  public get id(): string {return this._id;}
  public get elementRef(): ElementRef | undefined {return this._elementRef}
  public get text(): string {return this._text}

  public set elementRef(value: ElementRef | undefined){this._elementRef = value}
}
