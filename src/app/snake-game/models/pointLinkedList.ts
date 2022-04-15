import { AIPoint } from "./aipoint"
import { LinkedList } from "./linkedList"

export class PointLinkedList extends LinkedList<AIPoint>{

  private isSamePointWithHead(aipoint: AIPoint): boolean {
    return this._head ? this._head.value.isSamePoint(aipoint):false
  }
  private isSamePointWithTail(aipoint: AIPoint): boolean {
    return this._tail ? this._tail.value.isSamePoint(aipoint):false
  }

  public isPointInLinkedList(aipoint:AIPoint ):boolean{
    if (this._head===null) {
      return false
    }
    if (this.isSamePointWithTail(aipoint)) {
      return false
    }
    if (this.isSamePointWithHead(aipoint)) {
      return true
    }
    let temp = this._head
    while (temp.next!==null) {
      temp = temp.next
      if (temp.value.isSamePoint(aipoint)) {
        return true
      }
    }
    return false
  }
}
