import { ScheduledEvent } from "aws-lambda";

interface NversaryEvent extends ScheduledEvent {
  dateString : string;  
}

export {NversaryEvent};
