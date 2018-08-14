import { ScheduledEvent, Callback, Context, Handler } from 'aws-lambda';
import {CongratulationService} from './service/CongratulationService';
import {FlowdockService} from './service/FlowdockService';
import {FlowdockConfiguration} from './domain/FlowdockConfiguration';
import {EmployeeRepositoryLocalImpl} from './repository/EmployeeRepositoryLocalImpl'
import * as data from './test/data/people_real.json'

export const greeter: Handler = (event: ScheduledEvent, context: Context, cb: Callback) => {
  const organization: string = process.env.flowdock_organization;
  const flow: string = process.env.flowdock_flow;
  const token: string = process.env.flowdock_token;

  const service = new CongratulationService(new EmployeeRepositoryLocalImpl((<any>data)), new FlowdockService(new FlowdockConfiguration(organization, flow, token, false)));

  let call = async () => await service.congratulate();
  call();
  cb(null, {});
}
