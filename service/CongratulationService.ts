import {Employee} from "../domain/Employee";
import {FlowdockUser} from "../domain/FlowdockUser";
import {IEmployeeRepository} from "../repository/EmployeeRepository";
import {FlowdockService} from "./FlowdockService";

class CongratulationService {
  public employeeRepository: IEmployeeRepository;
  public flowdockService: FlowdockService;

  constructor(employeeRepository: IEmployeeRepository, flowdockService: FlowdockService ) {
    this.employeeRepository = employeeRepository;
    this.flowdockService = flowdockService;
  }

  public async congratulate(date: Date): Promise<void> {
    if (date.getDay() === 6 || date.getDay() === 0) {
      console.log("Skipping sending message on Saturday and Sunday");
      return Promise.resolve();
    }

    const employees = this.employeeRepository.findAllEmployees().filter((e) => this.shouldBeCongratulated(e, date));
    if (employees.length === 0) {
      console.log("No more employees to congratulate");
      return Promise.resolve();
    }

    const nthWeekday = this.nthWeekDay(date);

    if (employees.length <= nthWeekday) {
      console.log("No more messages to send in this month");
      return Promise.resolve();
    }

    const employee = employees[nthWeekday];
    console.log(employee);
    const tag = await this.getTag(employee.email);
    const yearsAtCompany: number = this.yearsPresent(employee, date);
    const message: string = `Congratulations **${employee.fullName}** ${tag ? tag + " " : ""}` +
      `${yearsAtCompany} ${(yearsAtCompany === 1 ? "year" : "years")} at Nitor! :tada:`;
    await this.flowdockService.sendMessage(message);
    console.log(message);

    return Promise.resolve();
  }

  public shouldBeCongratulated(employee: Employee, now: Date): boolean {
    const monthNow = now.getMonth() + 1;
    const yearNow = now.getFullYear();

    const startMonth = parseInt(employee.presence[0].start.split("-")[1], 0);
    const startYear = parseInt(employee.presence[0].start.split("-")[0], 0);

    return startMonth === monthNow && yearNow > startYear;
  }

  public yearsPresent(employee: Employee, now: Date): number {
    return now.getFullYear() - parseInt(employee.presence[0].start.split("-")[0], 0);
  }

  public nthWeekDay(now: Date) {
    let n = -1;
    for (let i = 1; i <= 31; i++) {
      const date: Date = new Date(Date.UTC(now.getFullYear(), now.getMonth(), i));
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        n++;
      }
      if (date.getDate() === now.getDate()) {
        return n;
      }
    }
  }

  public async getTag(email: string): Promise<string> {
    const user: FlowdockUser = (await this.flowdockService.getFlowUsers()).filter((u) => u.email === email).pop();
    return Promise.resolve(user ? "@" + user.nick : null);
  }

}

export {CongratulationService};
