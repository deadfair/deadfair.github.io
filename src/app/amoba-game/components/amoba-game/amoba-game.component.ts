import { Component, EventEmitter, OnInit } from '@angular/core';
import { Player } from '../../models/player';
import { faPlus, faMinus,IconDefinition, faRandom} from '@fortawesome/free-solid-svg-icons';
import { AmobaButtonGroup } from '../../interfaces/amobabuttongroup';
import { PlayersService } from '../../services/players.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-amoba-game',
  templateUrl: './amoba-game.component.html',
  styleUrls: ['./amoba-game.component.scss']
})
export class AmobaGameComponent implements OnInit {

  x?:BehaviorSubject<number> = new BehaviorSubject<number>(10);
  y?:BehaviorSubject<number> = new BehaviorSubject<number>(10);


  public playerHoverFlags:AmobaButtonGroup[] = [
    {id:"player",text:"Player", plus:false,minus:false,shuffle:false},
    {id:"column",text:"Column", plus:false,minus:false},
    {id:"row",text:"Row", plus:false,minus:false}
  ]
  public icons:{plus:IconDefinition,minus:IconDefinition,shuffle:IconDefinition}={plus:faPlus,minus:faMinus,shuffle:faRandom}
  public winnerPlayer?:Player
  public nextPlayer?:Player
  public restartEmitter:EventEmitter<void> = new EventEmitter();
  constructor(private readonly _playersService:PlayersService) { }

  public readonly currentPlayers: Player[] =this._playersService.allPlayers

  private winnerPlayerSub?:Subscription;
  private nextPlayerSub?:Subscription;

  ngOnInit(): void {
    // mert az icont nem engedte async-al
    this.winnerPlayerSub = this._playersService.winnerPlayer.subscribe({
      next:(player) =>{this.winnerPlayer = player;},
      error:(err)=>{console.log(err)},
      complete:()=>{}
      }
    )
    this.nextPlayerSub = this._playersService.nextPlayer.subscribe({
      next:(player:Player) =>{this.nextPlayer = player;},
      error:(err)=>{console.log(err)},
      complete:()=>{}
      }
    )
  }

  ngOnDestroy(): void {
    this.winnerPlayerSub?.unsubscribe();
    this.nextPlayerSub?.unsubscribe();
  }

  public restart(): void {
    this.restartEmitter.emit()
  }

  public shuffle(amobaButtonGroup:AmobaButtonGroup):void{
    if (amobaButtonGroup.id==="player") {
      this.shufflePlayers()
      return
    }
  }

  public plus(amobaButtonGroup:AmobaButtonGroup):void{
    if (amobaButtonGroup.id==="player") {
      this.addPlayer()
      return
    }
    if (amobaButtonGroup.id==="row") {
      this.incrementRows()
      return
    }
    if (amobaButtonGroup.id==="column") {
      this.incrementColumns()
      return
    }
  }
  public minus(amobaButtonGroup:AmobaButtonGroup):void{
    if (amobaButtonGroup.id==="player") {
      this.removePlayer()
      return
    }
    if (amobaButtonGroup.id==="row") {
      this.decrementRows()
      return
    }
    if (amobaButtonGroup.id==="column") {
      this.decrementColumns()
      return
    }
  }

  private addPlayer():void{
    this._playersService.addPlayer()
  }
  private removePlayer():void{
    this._playersService.removePlayer()
  }

  private shufflePlayers():void{
    this._playersService.shufflePlayers()
  }

  private incrementRows():void{
    this.y?.next(this.y.value + 1)
  }
  private incrementColumns():void{
    this.x?.next(this.x.value + 1)
  }

  private decrementRows():void{
    if (this.y?.value===1) {
      return
    }
    this.y?.next(this.y.value - 1)
  }
  private decrementColumns():void{
    if (this.x?.value===1) {
      return
    }
    this.x?.next(this.x.value - 1)
  }
}
