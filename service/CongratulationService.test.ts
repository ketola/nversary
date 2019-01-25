import {Employee} from "../domain/Employee";
import {FlowdockConfiguration} from "../domain/FlowdockConfiguration";
import {Presence} from "../domain/Presence";
import {EmployeeRepositoryLocalImpl} from "../repository/EmployeeRepositoryLocalImpl";
import {CongratulationService} from "./CongratulationService";
import {FlowdockService} from "./FlowdockService";

const flowdockService: FlowdockService = new FlowdockService(
    new FlowdockConfiguration("org", "flow-name", "token", true));

const data = {
    people : [
      {
        fullName: "Employee One",
        presence: [{start: "2017-02"}],
      },
      {
        fullName: "Employee Two",
        presence: [{start: "2017-02"}],
      },
      {
        fullName: "Employee Three",
        presence: [{start: "2017-02"}],
      },
    ],
};

const service = new CongratulationService(
  new EmployeeRepositoryLocalImpl((data as any)),
  flowdockService);

it("does not congratulate on weekends", async () => {
  const spyOnSendMessage = jest.spyOn(flowdockService, "sendMessage");
  await service.congratulate(new Date("2018-02-03T03:24:00"));
  expect(spyOnSendMessage).toHaveBeenCalledTimes(0);
});

it("does congratulate on weekdays", async () => {
  const spyOnSendMessage = jest.spyOn(flowdockService, "sendMessage");
  await service.congratulate(new Date("2018-02-02T03:24:00"));
  expect(spyOnSendMessage).toHaveBeenCalledTimes(1);
});

it("calculates years in company", () => {
  const  e: Employee = new Employee("Employee Name", [new Presence("2017-02")] );
  expect(service.yearsPresent(e, new Date("2018-02-03T03:24:00"))).toBe(1);
  expect(service.yearsPresent(e, new Date("2019-02-03T03:24:00"))).toBe(2);
});

it("calculates nth weekday", () => {
  expect(service.nthWeekDay(new Date("2019-02-01T03:24:00"))).toBe(0);
  expect(service.nthWeekDay(new Date("2019-02-04T03:24:00"))).toBe(1);
  expect(service.nthWeekDay(new Date("2019-02-05T03:24:00"))).toBe(2);
});

it("detects work anniversary", () => {
  const  e: Employee = new Employee("Employee Name", [new Presence("2017-02")] );
  expect(service.shouldBeCongratulated(e, new Date("2018-02-01T03:24:00"))).toBeTruthy();
  expect(service.shouldBeCongratulated(e, new Date("2019-02-01T03:24:00"))).toBeTruthy();
  expect(service.shouldBeCongratulated(e, new Date("2019-03-01T03:24:00"))).toBeFalsy();
});
