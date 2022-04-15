import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faOpera } from '@fortawesome/free-brands-svg-icons';
import { Player } from '../../models/player';
import { PlayersService } from '../../services/players.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-amoba-canvas',
  templateUrl: './amoba-canvas.component.html',
  styleUrls: ['./amoba-canvas.component.scss']
})
export class AmobaCanvasComponent implements OnInit {

  iconX:IconDefinition=faOpera
  @ViewChild('container') public container?:ElementRef

  @Input() x?:BehaviorSubject<number>;
  @Input() y?:BehaviorSubject<number>;

  @Input() restartEmitter?:EventEmitter<void>;

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    event.target.innerWidth;
  }
  private gameOver:boolean = false;
  // 2D to 1D => // index = indexX * arrayWidth + indexY;
  public table: Player[]|undefined[] = []
  private step:number= 0;
  private lastX = this.x?.value
  private xSub?:Subscription

  constructor(private readonly _playersService:PlayersService){}

  ngOnInit(): void {
    this.restartEmitter?.subscribe(() => {this.restart()})
    this.xSub = this.x?.subscribe({
      next: (value:number) => {
        console.log(value,this.lastX,this.y?.value);
        if (value && this.lastX && this.y?.value) {
          if ( this.lastX > value) {
            // -1 col
            for (let i = this.y?.value; i >= 0 ; i--) {
              this.table.splice(i*(this.lastX)+value,1)
            }
          }else{
            // +1 col
            for (let i = this.y?.value; i >= 0 ; i--) {
              this.table.splice(i*(this.lastX)+value-1,0,undefined)
            }
          }
        }
        this.lastX = value
      },
      error: (err)=>{console.log(err)},
      complete:()=>{}
    })
    this.tableInit()
  }

  private tableInit():void {
    if (!(this.x?.value && this.y?.value)) {
      return
    }
    for (let i = 0; i < this.x?.value *this.y?.value; i++) {
      this.table[i]= undefined
    }
  }

  ngOnDestroy(): void {
    this.xSub?.unsubscribe()
  }

  restart(): void {
    this.table=[]
    this.step = 0
    this._playersService.restart()
    this.gameOver=false;
  }

  cellOnClick(x:number | undefined, y:number | undefined):void {
    if (this.gameOver || x===undefined || y===undefined || !this.x?.value || this.table[x*this.x?.value+y]) {
      return
    }
    this.table[x*this.x?.value+y] = this._playersService.nextPlayer.value
    if (this.isTie()) {
      // döntetlen
    }
    this.step++
    if (this.isGameOver()) {
      this.gameOver=true
      this._playersService.setWinnerPlayer()
    }
    this._playersService.setNextPlayer()
  }

  private isGameOver():boolean {
    return this.ishorizontalOver() || this.isVerticalOver() || this.isCrossRightOver() || this.isCrossLeftOver()
  }

  private ishorizontalOver():boolean{
    if (!this.y?.value) {
      return true
    }
    for(let i=0;i<this.table.length;i++){
      if (i%this.y?.value<=this.y?.value-5 && this.table[i]) {
        if(this.table[i]===this.table[i+1] && this.table[i]===this.table[i+2]  && this.table[i]===this.table[i+3]  && this.table[i]===this.table[i+4]){
          return true
        }
      }
    }
    return false;
  }

  private isVerticalOver():boolean{
    if (!this.y?.value || !this.x?.value) {
      return true
    }
    for(let i=0;i<this.table.length;i++){
      if(this.table[i] && i<((this.y?.value-4)*this.x?.value)){
        if(this.table[i]===this.table[i+this.x?.value] && this.table[i]===this.table[i+2*this.x?.value]  && this.table[i]===this.table[i+3*this.x?.value]  && this.table[i]===this.table[i+4*this.x?.value]){
          return true;
        }
      }
    }
    return false;
  }

  private isCrossRightOver():boolean{
    if (!this.y?.value || !this.x?.value) {
      return true
    }
    for(var i=0;i<this.table.length;i++){
      if(this.table[i] && i<((this.y?.value-4)*this.x?.value)){
        if((i+5)%this.x?.value!=1){
          if(this.table[i]===this.table[i+(1+this.x?.value)] && this.table[i]===this.table[i+(1+this.x?.value)*2]  && this.table[i]===this.table[i+(1+this.x?.value)*3]  && this.table[i]===this.table[i+4*(1+this.x?.value)]){
            return true;
          }
        }else{
          i+=4;
        }
      }
    }
    return false;
  }

  private isCrossLeftOver():boolean{
    if (!this.y?.value || !this.x?.value) {
      return true
    }
    for(var i=0;i<this.table.length;i++){
      if(this.table[i] && i<((this.y?.value-4)*this.x?.value)){
        if(!(i%this.x?.value<4)){
          if(this.table[i]===this.table[i+(-1+this.x?.value)] && this.table[i]===this.table[i+(-1+this.x?.value)*2]  && this.table[i]===this.table[i+(-1+this.x?.value)*3]  && this.table[i]===this.table[i+4*(-1+this.x?.value)])
          {return true;}
        }else{
          i+=4;
        }
      }
    }
    return false;
  }

  private isTie():boolean {
    return this.x?.value!==undefined && this.y?.value!==undefined && this.step===this.x?.value*this.y?.value
  }
}
