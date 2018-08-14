import {Presence} from './Presence'

class Employee {
  fullName: string
  presence: Array<Presence>

  constructor(fullName: string, presence: Array<Presence>){
    this.fullName = fullName
    this.presence =  presence
  }
}

export {Employee}
