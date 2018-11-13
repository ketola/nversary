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

  async congratulate(date: Date) : Promise<void> {
    if(date.getDay() === 6 || date.getDay() === 0){
      console.log('Skipping sending message on Saturday and Sunday')
      return
    }

    const employees = this.employeeRepository.findAllEmployees().filter(e => this.shouldBeCongratulated(e, date))
    const nthWeekday = this.nthWeekDay(date);

    if(employees.length <= nthWeekday){
      console.log('No more messages to send in this month')
      return
    }

    const employee = employees[nthWeekday]
    const yearsAtCompany : Number = this.yearsPresent(employee, date)
    const message : string = 'Congratulations ' + employee.fullName + '. ' + yearsAtCompany + (yearsAtCompany === 1 ? ' year' : ' years') + ' at Nitor!'
    await this.flowdockService.sendMessage(message)
    console.log(message)

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

  nthWeekDay(now : Date){
    let n = -1;
    for(let i = 1; i <= 31; i++){
      const date : Date = new Date(Date.UTC(now.getFullYear(), now.getMonth(), i))
      if(date.getDay() !== 0 && date.getDay() !== 6){
        n++
      }
      if(date.getDate() == now.getDate()){
        return n
      }
    }
  }
}

export {CongratulationService}
