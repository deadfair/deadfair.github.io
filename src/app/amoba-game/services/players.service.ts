import { Injectable } from '@angular/core';
import { faOpera } from '@fortawesome/free-brands-svg-icons';
import { faTimes, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, Subject } from 'rxjs';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor() { }

  private _allSign: IconDefinition[]=[faOpera,faTimes]

  private _allPlayers: Player[]=[new Player(1,"black",faOpera),new Player(2,"black",faTimes)]
  private _nextPlayer:BehaviorSubject<Player> = new BehaviorSubject<Player>(this._allPlayers[0]);
  private _winnerPlayer:Subject<Player|undefined> = new Subject<Player|undefined>();

  get allPlayers(): Player[] {return this._allPlayers}
  get nextPlayer(): BehaviorSubject<Player> {return this._nextPlayer}
  get winnerPlayer(): Subject<Player|undefined> {return this._winnerPlayer}



  public restart():void {
    this.setWinnerPlayer(null)
    this._nextPlayer.next(this._allPlayers[0])
  }

  public setWinnerPlayer(isNull?:null){
    if (isNull ===null) {
      this._winnerPlayer.next(undefined);
    }else{
      this._winnerPlayer.next(this._nextPlayer.value);
    }
  }

  public setNextPlayer(){
    this._nextPlayer.next(this.getNextPlayer())
  }

  private getRandomColor():string{
    return 'rgb(' + (Math.floor(Math.random() * 256)) +
              ',' + (Math.floor(Math.random() * 256)) +
              ',' + (Math.floor(Math.random() * 256)) + ')';
  }

  private getPlayersMaxID():number {
    return Math.max(...this._allPlayers.map(p=> p.id))
  }

  private getRandomSign():IconDefinition{
    const randomNum = Math.floor(Math.random() * this._allSign.length)
    return this._allSign[randomNum]
  }

  public addPlayer():void{
    const newPlayer = new Player(this.getPlayersMaxID()+1,this.getRandomColor(),this. getRandomSign())
    this._allPlayers.push(newPlayer)
  }

  public removePlayer():void{
    if (this._allPlayers.length === 2) {
      return
    }
    this._allPlayers.pop()
  }

  public shufflePlayers():void{
    this._allPlayers = this.shuffle(this._allPlayers)
  }


  public shuffle(array:Player[]) {
    let currentIndex:number = array.length;
      while (currentIndex != 0) {
      let randomIndex:number = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  private getNextPlayer():Player {
    const currentI:number = this._allPlayers.findIndex(player => player.id === this._nextPlayer.value.id)
    // ide jöhetne vmi ha currentI === -1
    if (currentI === this._allPlayers.length - 1) {
      return this._allPlayers[0]
    }
    return this._allPlayers[currentI+1]
  }

}
