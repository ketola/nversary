import {Employee} from '../domain/Employee'

interface EmployeeRepository {
  findAllEmployees(): ReadonlyArray<Employee>
}

export {EmployeeRepository}
