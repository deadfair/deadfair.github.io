import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export class Player{
  constructor( private readonly _id:number,private readonly _color:string, private readonly _sign:IconDefinition){}
  public get id(){return this._id}
  public get sign(){return this._sign}
  public get color(){return this._color}
};
