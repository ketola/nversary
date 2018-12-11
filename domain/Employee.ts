import {Presence} from "./Presence";

class Employee {
  public fullName: string;
  public presence: Presence[];

  constructor(fullName: string, presence: Presence[]) {
    this.fullName = fullName;
    this.presence =  presence;
  }
}

export {Employee};
