import {Employee} from "../domain/Employee";
import {SlackConfiguration} from "../domain/SlackConfiguration";
import {Presence} from "../domain/Presence";
import {EmployeeRepositoryLocalImpl} from "../repository/EmployeeRepositoryLocalImpl";
import {CongratulationService} from "./CongratulationService";
import {SlackService} from "./SlackService";
import {SlackUser} from "../domain/SlackUser";

const slackService: SlackService = new SlackService(
    new SlackConfiguration("https://webhookurl", true));

const data = {
    people : [
      {
        fullName: "Employee One",
        email: "employee.one@email.com",
        presence: [{start: "2017-02-01"}],
      },
      {
        fullName: "Employee Two",
        email: "employee.two@email.com",
        presence: [{start: "2017-02-01"}],
      },
      {
        fullName: "Employee Three",
        email: "employee.three@email.com",
        presence: [{start: "2017-02-01"}],
      },
    ],
};

const service = new CongratulationService(
  new EmployeeRepositoryLocalImpl((data as any)),
  slackService);

it("does not congratulate on weekends", async () => {
  const spyOnSendMessage = jest.spyOn(slackService, "sendMessage");
  await service.congratulate(new Date("2018-02-03T03:24:00"));
  expect(spyOnSendMessage).toHaveBeenCalledTimes(0);
});

it("does congratulate on weekdays", async () => {
  const spyOnSendMessage = jest.spyOn(slackService, "sendMessage");
  await service.congratulate(new Date("2018-02-02T03:24:00"));
  expect(spyOnSendMessage).toHaveBeenCalledTimes(1);
});

it("tags user when email is found", async () => {
  const spyOnSendMessage = jest.spyOn(slackService, "sendMessage");
  slackService.getChannelUsers = jest.fn().mockReturnValue([new SlackUser("NickName", "employee.two@email.com")])
  await service.congratulate(new Date("2018-02-02T03:24:00"));
  expect(spyOnSendMessage).toBeCalledWith("Congratulations *Employee Two* @NickName 1 year at Nitor! :tada:");
});

it("does not tag user when email is not found", async () => {
  const spyOnSendMessage = jest.spyOn(slackService, "sendMessage");
  slackService.getChannelUsers = jest.fn().mockReturnValue([new SlackUser("NickName", "employee.five@email.com")])
  await service.congratulate(new Date("2018-02-02T03:24:00"));
  expect(spyOnSendMessage).toBeCalledWith("Congratulations *Employee Two* 1 year at Nitor! :tada:");
});

it("calculates years in company", () => {
  const  e: Employee = new Employee("Employee Name", "emp.name@email.com", [new Presence("2017-02")] );
  expect(service.yearsPresent(e, new Date("2018-02-03T03:24:00"))).toBe(1);
  expect(service.yearsPresent(e, new Date("2019-02-03T03:24:00"))).toBe(2);
});

it("calculates nth weekday", () => {
  expect(service.nthWeekDay(new Date("2019-02-01T03:24:00"))).toBe(0);
  expect(service.nthWeekDay(new Date("2019-02-04T03:24:00"))).toBe(1);
  expect(service.nthWeekDay(new Date("2019-02-05T03:24:00"))).toBe(2);
  expect(service.nthWeekDay(new Date("2019-06-01T03:24:00"))).toBe(-1);
});

it("detects work anniversary", () => {
  const  e: Employee = new Employee("Employee Name", "emp.name@email.com", [new Presence("2017-02")] );
  expect(service.shouldBeCongratulated(e, new Date("2018-02-01T03:24:00"))).toBeTruthy();
  expect(service.shouldBeCongratulated(e, new Date("2019-02-01T03:24:00"))).toBeTruthy();
  expect(service.shouldBeCongratulated(e, new Date("2019-03-01T03:24:00"))).toBeFalsy();
});
