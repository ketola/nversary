import { Callback, Context, Handler, ScheduledEvent } from "aws-lambda";
import {SlackConfiguration} from "./domain/SlackConfiguration";
import {EmployeeRepositoryLocalImpl} from "./repository/EmployeeRepositoryLocalImpl";
import {CongratulationService} from "./service/CongratulationService";
import {SlackService} from "./service/SlackService";
import * as data from "./test/data/people_real.json";

export const greeter: Handler = (event: ScheduledEvent, context: Context, cb: Callback) => {
  const webhookUrl: string = process.env.slack_webhook_url;
  
  const service = new CongratulationService(
    new EmployeeRepositoryLocalImpl((data as any)),
    new SlackService(new SlackConfiguration(webhookUrl, false)));

  const call = async () => await service.congratulate(new Date());
  call();
  cb(null, {});
};
