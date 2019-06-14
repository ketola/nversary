import {FlowdockConfiguration} from "../domain/FlowdockConfiguration";
import {FlowdockService} from "./FlowdockService";

it("sends message", async () => {
  const service = new FlowdockService(new FlowdockConfiguration("org", "flow-name", "token", true));
  await service.sendMessage("message..").then((r) => console.log(r));
});

it("gets flow users", async () => {
  const service = new FlowdockService(new FlowdockConfiguration("org", "flow-name", "token", true));
  await service.getFlowUsers().then((r) => console.log(r));
});

