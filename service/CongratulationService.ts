import {Employee} from '../domain/Employee'
import {EmployeeRepository} from '../repository/EmployeeRepository'
import {FlowdockService} from './FlowdockService'

class CongratulationService {
  employeeRepository : EmployeeRepository
  flowdockService : FlowdockService

  constructor(employeeRepository : EmployeeRepository, flowdockService : FlowdockService ){
    this.employeeRepository = employeeRepository
    this.flowdockService = flowdockService
  }

  async congratulate() : Promise<void> {
    const employees = this.employeeRepository.findAllEmployees()
    const now : Date = new Date()
    for (let e of employees) {
      if(this.shouldBeCongratulated(e, now)){
        const yearsAtCompany : Number = this.yearsPresent(e, now)
        const message : string = 'Congratulations ' + e.fullName + '. ' + yearsAtCompany + (yearsAtCompany === 1 ? ' year' : ' years') + ' at Nitor!'
        await this.flowdockService.sendMessage(message)
        console.log(message)
      }
    }

    return Promise.resolve()
  }

  shouldBeCongratulated(employee : Employee, now : Date) : boolean {
    const monthNow = now.getMonth()+1;
    const yearNow = now.getFullYear();

    const startMonth = parseInt(employee.presence[0].start.split('-')[1])
    const startYear = parseInt(employee.presence[0].start.split('-')[0])

    return startMonth === monthNow && yearNow > startYear
  }

  yearsPresent(employee : Employee, now : Date) : Number {
    return now.getFullYear() - parseInt(employee.presence[0].start.split('-')[0])
  }
}

export {CongratulationService}
