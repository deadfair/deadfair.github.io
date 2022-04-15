import { Directions } from "./directions";
import { Point } from "./point";

export class AIPoint extends Point {

  private _RIGHT:boolean = true;
  private _DOWN:boolean = true;
  private _LEFT:boolean = true;
  private _UP:boolean = true;

  public get RIGHT():boolean { return this._RIGHT; }
  public get DOWN():boolean { return this._DOWN; }
  public get LEFT():boolean { return this._LEFT; }
  public get UP():boolean { return this._UP; }

  public set RIGHT(bool:boolean) { this._RIGHT=bool; }
  public set DOWN(bool:boolean) { this._DOWN=bool;}
  public set LEFT(bool:boolean){  this._LEFT=bool}
  public set UP(bool:boolean) { this._UP=bool}


  public IsAllDirectionDisabled():boolean {
    return !this._RIGHT && !this._DOWN && !this._LEFT && !this._UP
  }

  public disableDirectionTowardsAiPoint(aipoint:Point,directions:Directions):void {
    if (aipoint.createPointByPointsSub(this).isSamePoint(directions.DOWN)) {
      this._DOWN=false;return
    }
    if (aipoint.createPointByPointsSub(this).isSamePoint(directions.LEFT)) {
      this._LEFT=false;return
    }
    if (aipoint.createPointByPointsSub(this).isSamePoint(directions.UP)) {
      this._UP=false;return
    }
    if (aipoint.createPointByPointsSub(this).isSamePoint(directions.RIGHT)) {
      this._RIGHT=false;return
    }
  }

  public disableDirectionFromsAiPoint(aipoint:Point,directions:Directions):void {
    if (this.createPointByPointsSub(aipoint).isSamePoint(directions.DOWN)) {
      this._DOWN=false;return
    }
    if (this.createPointByPointsSub(aipoint).isSamePoint(directions.LEFT)) {
      this._LEFT=false;return
    }
    if (this.createPointByPointsSub(aipoint).isSamePoint(directions.UP)) {
      this._UP=false;return
    }
    if (this.createPointByPointsSub(aipoint).isSamePoint(directions.RIGHT)) {
      this._RIGHT=false;return
    }
  }

  public override createPointByPointsSum(point:Point):AIPoint{
    return new AIPoint(this.x + point.x, this.y + point.y)
  }

}
