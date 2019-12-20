import { Callback, Context, Handler, ScheduledEvent } from "aws-lambda";
import { Employee } from "./domain/Employee";
import { INversaryEvent } from "./domain/NversaryEvent";
import {SlackConfiguration} from "./domain/SlackConfiguration";
import {EmployeeRepositoryLocalImpl} from "./repository/EmployeeRepositoryLocalImpl";
import { AnniversaryService } from "./service/AnniversaryService";
import {CongratulationService} from "./service/CongratulationService";
import {SlackService} from "./service/SlackService";
import * as data from "./test/data/people_real.json";

export const greeter: Handler = (event: INversaryEvent, context: Context, cb: Callback) => {
  console.log("event: \n" + JSON.stringify(event, null, 2));

  const date = event.dateString ? new Date(event.dateString) : new Date();
  const webhookUrl: string = process.env.slack_webhook_url;
  const channelId: string = process.env.slack_channel_id;
  const appToken: string = process.env.slack_app_token;

  const service = new CongratulationService(new AnniversaryService(new EmployeeRepositoryLocalImpl((data as any))),
    new SlackService(new SlackConfiguration(webhookUrl, channelId, appToken, false)));

  const call = async () => await service.congratulate(date);
  call();
  cb(null, {});
};
