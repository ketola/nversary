import {FlowdockService} from './FlowdockService'
import {FlowdockConfiguration} from '../domain/FlowdockConfiguration'

it('sends message', async () => {
  const service = new FlowdockService(new FlowdockConfiguration('org', 'flow-name', 'token', true))
  await service.sendMessage('message..').then(r => console.log(r))
});
