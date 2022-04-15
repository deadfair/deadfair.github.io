export class Point{
  constructor(private readonly _x:number, private readonly _y:number){}
  get x(){ return this._x; }
  get y(){ return this._y; }


  isSamePoint(point:Point){
    return this.x === point.x && this.y === point.y
  }

  createPointByPointsSum(point:Point){
    return new Point(this.x + point.x, this.y + point.y)
  }

  createPointByMultiply(multiply:number){
    return new Point(this.x * multiply, this.y * multiply)
  }

  createPointByPointsSub(point:Point){
    return new Point(this.x - point.x, this.y - point.y)
  }

  isSameDirectionByPoint(point:Point){
    return  (this.x<=0 && point.x<=0) && (this.y<=0 && this.y<=0) ||
            (this.x>=0 && point.x>=0) && (this.y>=0 && this.y>=0) ||
            (this.x<=0 && point.x<=0) && (this.y>=0 && this.y>=0) ||
            (this.x>=0 && point.x>=0) && (this.y<=0 && this.y<=0)
  }

  getDistanceByPoint(point:Point){
    return ((this.x - point.x)**2+(this.y - point.y)**2)**0.5
  }
}
