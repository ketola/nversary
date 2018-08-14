import {EmployeeRepository} from './EmployeeRepository'
import {Employee} from '../domain/Employee'

class EmployeeRepositoryLocalImpl implements EmployeeRepository {

  data : any[]

  constructor(data : any[]){
    this.data = data
  }

  findAllEmployees() : ReadonlyArray<Employee> {
    let people: any[] = (<any>this.data).people
    return people.map(p => new Employee(p.fullName, p.presence))
  }
}

export {EmployeeRepositoryLocalImpl}
