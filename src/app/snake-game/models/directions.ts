import {Point} from './point'

export class Directions{
  private static _RIGHT:Point = new Point(1,0);
  private static _DOWN:Point =  new Point(0,1);
  private static _LEFT:Point =  new Point(-1 ,0);
  private static _UP:Point =  new Point(0,-1 );
  private static _defaultDirrection:Point = new Point(1,0)

  private _currentDirection:Point;
  private _lastDirection:Point;
  private _multiply = 1;


  constructor(multiply:number){
    this._multiply = multiply
    this._currentDirection = Directions._defaultDirrection.createPointByMultiply(this._multiply)
    this._lastDirection = Directions._defaultDirrection.createPointByMultiply(this._multiply)
  }
  public get RIGHT(){return Directions._RIGHT.createPointByMultiply(this._multiply)}
  public get DOWN(){return Directions._DOWN.createPointByMultiply(this._multiply)}
  public get LEFT(){return Directions._LEFT.createPointByMultiply(this._multiply)}
  public get UP(){return Directions._UP.createPointByMultiply(this._multiply)}
  public get currentDirection(){return this._currentDirection}
  public get lastDirection(){return this._lastDirection}

  public set currentDirection(direction:Point){this._currentDirection=direction}
  public set lastDirection(direction:Point){this._lastDirection=direction}

  private oppositeDirectionByLastDirection():Point{
    return this._lastDirection.createPointByMultiply(-1)
  }

  public isDirectionOppositeToLastDirection(point:Point):boolean{
    return this.oppositeDirectionByLastDirection().isSamePoint(point)
  }
}

