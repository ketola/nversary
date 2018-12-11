import {Employee} from "../domain/Employee";
import {IEmployeeRepository} from "./EmployeeRepository";

class EmployeeRepositoryLocalImpl implements IEmployeeRepository {

  public data: any[];

  constructor(data: any[]) {
    this.data = data;
  }

  public findAllEmployees(): ReadonlyArray<Employee> {
    const people: any[] = (this.data as any).people;
    return people.map((p) => new Employee(p.fullName, p.presence));
  }
}

export {EmployeeRepositoryLocalImpl};
