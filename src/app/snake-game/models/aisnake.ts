import { CanvasSizes } from "../interfaces/canvalsizes";
import { Difficulty } from "../interfaces/difficulty";
import { AIPoint } from "./aipoint";
import { Link } from "./link";
import { Point } from "./point";
import { PointLinkedList } from "./pointLinkedList";
import { Snake } from "./snake";

export class AISnake extends Snake{

  private _road!:PointLinkedList;

  constructor(difficultyID:string,private _canvasSizes:CanvasSizes,difficultys:Difficulty[]){
    super(difficultyID,_canvasSizes,difficultys)
  }

  public calculateRoad(apple:Point):void{
    let endlessLoopSaver = 0
    this.initRoad();
    while (this._road.tail && !this._road.tail.value.isSamePoint(apple) && endlessLoopSaver<10000) {
      this.closeBadDirrections()
      while (this._road.tail && this._road.tail.value.IsAllDirectionDisabled() && endlessLoopSaver<10000) {
        this.moveBackOneStepInRoad()
        this.closeBadDirrections()      // néha lefut 1 millászor is     // optimalizálnás: itt csak azt kéne bezárni ahonnan jövök
        endlessLoopSaver++
      }
      this._road.push(this.choseRoadNewDirrection(apple))
    }
    this._road.shift()    // mert az almát kikell venni, ui.:evésnél is belerakjuk
  }

  public override move():void{
    const head:AIPoint | null =  this._road.shift()
    if (head) {
      this._body.push(new Point(head.x, head.y))
      this._body.shift();
    }
  }

  private initRoad():void{
    this._road=new PointLinkedList(new AIPoint(this._body[this._body.length-1].x,this._body[this._body.length-1].y))
    if (this._body.length>1 && this._road.head) {
      this._road.head.value.disableDirectionFromsAiPoint(this.getHead(1),this._directions)
    }
  }

  private moveBackOneStepInRoad():void{
    const previousTail = this._road.pop()
    if (previousTail && this._road.tail) {
      this._road.tail.value.disableDirectionTowardsAiPoint(previousTail,this._directions);
    }
  }

  public override directionListener(event: KeyboardEvent): void{
    event.preventDefault();
  }

  private closeBadDirrections():void{
    const tail = this._road.tail as Link<AIPoint>
    if (tail.value.UP) {
      const up =tail.value.createPointByPointsSum(this._directions.UP)
      if (this.isPointInAiBody(up) || this.isPointInRoad(up) || this.isKillMyselfInWall(up)) {
        tail.value.UP=false
      }
    }
    if (tail.value.DOWN) {
      const down =tail.value.createPointByPointsSum(this._directions.DOWN)
      if (this.isPointInAiBody(down) || this.isPointInRoad(down)  || this.isKillMyselfInWall(down)) {
        tail.value.DOWN=false
      }
    }
    if (tail.value.LEFT) {
      const left =tail.value.createPointByPointsSum(this._directions.LEFT)
      if (this.isPointInAiBody(left) || this.isPointInRoad(left) || this.isKillMyselfInWall(left)) {
        tail.value.LEFT=false
      }
    }
    if (tail.value.RIGHT) {
      const right =tail.value.createPointByPointsSum(this._directions.RIGHT)
      if (this.isPointInAiBody(right) || this.isPointInRoad(right) || this.isKillMyselfInWall(right)) {
        tail.value.RIGHT=false
      }
    }
  }

  private isPointInAiBody(point:AIPoint):boolean{
    return this._body.slice(this._road.length,this._body.length).some((item:Point)=>item.isSamePoint(point))
  }
  private isPointInRoad(point:AIPoint):boolean{
    return this._road.isPointInLinkedList(point)
  }

  private twoStepToDie():AIPoint | undefined{
    const tail = this._road.tail as Link<AIPoint>
      const arr=[tail.value.UP,tail.value.DOWN,tail.value.RIGHT,tail.value.LEFT]
      if (tail.value.UP) {
        const up =tail.value.createPointByPointsSum(this._directions.UP).createPointByPointsSum(this._directions.UP)
        this.willIDie(up)?arr[0]=false:null
      }
      if (tail.value.DOWN) {
        const down =tail.value.createPointByPointsSum(this._directions.DOWN).createPointByPointsSum(this._directions.DOWN)
        this.willIDie(down)?arr[1]=false:null
      }
      if (tail.value.RIGHT) {
        const right =tail.value.createPointByPointsSum(this._directions.RIGHT).createPointByPointsSum(this._directions.RIGHT)
        this.willIDie(right)? arr[2]=false:null
      }
      if (tail.value.LEFT) {
        const left =tail.value.createPointByPointsSum(this._directions.LEFT).createPointByPointsSum(this._directions.LEFT)
        this.willIDie(left)?arr[3]=false:null
      }
      if (arr[3]) {
        return tail.value.createPointByPointsSum(this._directions.LEFT)
      }
      if (arr[1]) {
        return tail.value.createPointByPointsSum(this._directions.DOWN)
      }
      if (arr[0]) {
        return tail.value.createPointByPointsSum(this._directions.UP)
      }
      if (arr[2]) {
        return tail.value.createPointByPointsSum(this._directions.RIGHT)
      }
    return undefined
  }

  private willIDie(aIPoint:AIPoint):boolean{
    return this.isPointInAiBody(aIPoint) || this.isPointInRoad(aIPoint) || this.isKillMyselfInWall(aIPoint)
  }


  private choseRoadNewDirrection(apple:Point):AIPoint{
    const tail = this._road.tail as Link<AIPoint>
    const up = tail.value.createPointByPointsSum(this._directions.UP)
    const right = tail.value.createPointByPointsSum(this._directions.RIGHT)
    const down =  tail.value.createPointByPointsSum(this._directions.DOWN)
    const left = tail.value.createPointByPointsSum(this._directions.LEFT)
    const validOptions:AIPoint[] = this.getRoadTailValidOptionsInArray(up,left,right,down)
    const closestPointForApple = this.closestPointForApple(apple,up,left,right,down)
    const twoStepToDie= this.twoStepToDie()
    if (closestPointForApple) {
      return closestPointForApple
    }
    if (validOptions.length>1 && twoStepToDie) {
      return twoStepToDie
    }
    // ha mégis olyan helyre kéne lépnem mint amiket előzö iffel kizártam ,akkor melyikkel zárom be magam mert azt már le is lehet zárni azt az uttat sőt,
    // vizsgálhatom mindig hogy bezárom e az utat? vagy a road felépítésénél nem az almáig akarunk jutni, hanem az almáig majd 2 szembe lévő sarokig
    // így olyan út jön létre amivel egyrész eljutok az almáig, másrészt a sarokig utánna vis talán kisseb eséllyel halok meg
    if (validOptions.length>0) {
        return validOptions[0]
    }
    return right
  }

  private closestPointForApple(apple:Point,up:AIPoint, left:AIPoint, right:AIPoint,down:AIPoint):AIPoint | undefined{
    const tail = this._road.tail as Link<AIPoint>
    if (tail.value.RIGHT && tail.value.getDistanceByPoint(apple) > right.getDistanceByPoint(apple)) {
      return right                // ide talán kéne feltétel még mert ugye attol még hogy ez az irány jó lehet hogy bezárom magam? talán a twostepp cucc itt is
    }
    if (tail.value.UP && tail.value.getDistanceByPoint(apple) > up.getDistanceByPoint(apple)) {
      return up
    }
    if (tail.value.DOWN && tail.value.getDistanceByPoint(apple) > down.getDistanceByPoint(apple)) {
      return down
    }
    if (tail.value.LEFT && tail.value.getDistanceByPoint(apple) > left.getDistanceByPoint(apple)) {
      return left
    }
    return undefined
  }

  private getRoadTailValidOptionsInArray(up:AIPoint, left:AIPoint, right:AIPoint,down:AIPoint):AIPoint[]{
    const result:AIPoint[] = []
    const tail = this._road.tail as Link<AIPoint>
    if (tail.value.UP) {
      result.push(up)
    }
    if (tail.value.DOWN) {
      result.push(down)
    }
    if (tail.value.RIGHT) {
      result.push(right)
    }
    if (tail.value.LEFT) {
      result.push(left)
    }
    return result
  }

  private isKillMyselfInWall(aiPoint:AIPoint):boolean {
    return aiPoint.x<0 || aiPoint.y<0 || aiPoint.x>=this._canvasSizes.width || aiPoint.y>=this._canvasSizes.height
  }
}

