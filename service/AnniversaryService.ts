import {CongratulationDay} from "../domain/CongratulationDay";
import {SlackUser} from "../domain/SlackUser";
import {IEmployeeRepository} from "../repository/EmployeeRepository";
import {SlackService} from "./SlackService";

class AnniversaryService {
  private employeeRepository: IEmployeeRepository;

  constructor(employeeRepository: IEmployeeRepository) {
    this.employeeRepository = employeeRepository;
  }

  public getEmployeeToCongratulateToday(date: Date): CongratulationDay {
    const employee = this.getCongratulationsForThisMonth(date)
    .find((day) => day.date.getDate() === date.getDate());
    console.log("Employee to congratulate today: " + JSON.stringify(employee));
    return employee;
  }

  private getCongratulationsForThisMonth(date: Date){
    const peopleWithAnniversaryThisMonth = this.employeeRepository.findAllEmployees()
        .filter((e) => e.presence[0].start.getMonth() == date.getMonth())
        .filter((e) => e.presence[0].start.getFullYear() !== date.getFullYear())
        .sort((e1, e2) => e1.presence[0].start.getFullYear() - e2.presence[0].start.getFullYear());

    const congratulationDaysInThisMonth = this.getCongratulationDaysForThisMonth(date);

    peopleWithAnniversaryThisMonth.forEach((employee) => {
      congratulationDaysInThisMonth
        .sort((d1, d2) => Math.abs(d1.date.getDate() - 
          employee.presence[0].start.getDate()) - Math.abs(d2.date.getDate() - employee.presence[0].start.getDate()));
          for(let day of congratulationDaysInThisMonth){
            if(day.employeeToCongratulate == null){
              day.employeeToCongratulate = employee;
              break;
            }
          }
    });
    return congratulationDaysInThisMonth;
  }

  private getCongratulationDaysForThisMonth(d: Date): Array<CongratulationDay> {
    const date = new Date();
    date.setTime(d.getTime());
    const currentMonth = date.getMonth();
    const days = [];
    
    for(let i = 1; i < 31; i++){
        date.setDate(i);
        if(date.getMonth() !== currentMonth){
            break;
        }

        if(date.getDay() !== 0 && date.getDay() !== 6){
          const newCongratulationDate = new Date();
          newCongratulationDate.setTime(date.getTime());
          days.push(new CongratulationDay(newCongratulationDate));
        }
    }
    return days;
  }
}

export {AnniversaryService};
