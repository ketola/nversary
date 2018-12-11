import {FlowdockConfiguration} from "../domain/FlowdockConfiguration";
import {EmployeeRepositoryLocalImpl} from "../repository/EmployeeRepositoryLocalImpl";
import * as data from "../test/data/people_real.json";
import {CongratulationService} from "./CongratulationService";
import {FlowdockService} from "./FlowdockService";

it("congratulates people", async () => {
  // todo replace real Flowdock service with a mock and test
  const service = new CongratulationService(
    new EmployeeRepositoryLocalImpl((data as any)),
    new FlowdockService(new FlowdockConfiguration("org", "flow-name", "token", true)));

  await service.congratulate(new Date("2018-11-01T03:24:00"));
  await service.congratulate(new Date("2018-11-02T03:24:00"));
  await service.congratulate(new Date("2018-11-03T03:24:00"));
  await service.congratulate(new Date("2018-11-04T03:24:00"));
  await service.congratulate(new Date("2018-11-05T03:24:00"));

  await service.congratulate(new Date("2018-11-06T03:24:00"));
  await service.congratulate(new Date("2018-11-07T03:24:00"));
  await service.congratulate(new Date("2018-11-08T03:24:00"));
  await service.congratulate(new Date("2018-11-09T03:24:00"));
  await service.congratulate(new Date("2018-11-10T03:24:00"));

  await service.congratulate(new Date("2018-11-11T03:24:00"));
  await service.congratulate(new Date("2018-11-12T03:24:00"));
  await service.congratulate(new Date("2018-11-13T03:24:00"));
  await service.congratulate(new Date("2018-11-14T03:24:00"));
  await service.congratulate(new Date("2018-11-15T03:24:00"));
});
