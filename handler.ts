import { Callback, Context, Handler, ScheduledEvent } from "aws-lambda";
import {SlackConfiguration} from "./domain/SlackConfiguration";
import {EmployeeRepositoryLocalImpl} from "./repository/EmployeeRepositoryLocalImpl";
import {CongratulationService} from "./service/CongratulationService";
import {SlackService} from "./service/SlackService";
import * as data from "./test/data/people_real.json";
import { NversaryEvent } from "./domain/NversaryEvent";

export const greeter: Handler = (event: NversaryEvent, context: Context, cb: Callback) => {
  console.log("event: \n" + JSON.stringify(event, null, 2))
  
  const date = event.dateString ? new Date(event.dateString) : new Date();   
  const webhookUrl: string = process.env.slack_webhook_url;
  
  const service = new CongratulationService(
    new EmployeeRepositoryLocalImpl((data as any)),
    new SlackService(new SlackConfiguration(webhookUrl, false)));

  const call = async () => await service.congratulate(date);
  call();
  cb(null, {});
};
