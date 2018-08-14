import {EmployeeRepositoryLocalImpl} from '../repository/EmployeeRepositoryLocalImpl'
import {CongratulationService} from './CongratulationService'
import {FlowdockService} from './FlowdockService'
import {FlowdockConfiguration} from '../domain/FlowdockConfiguration'
import * as data from '../test/data/people_real.json'

it('congratulates people', async () => {
  // todo replace real Flowdock service with a mock and test
  const service = new CongratulationService(new EmployeeRepositoryLocalImpl((<any>data)), new FlowdockService(new FlowdockConfiguration('org', 'flow-name', 'token', true)))
  await service.congratulate()
});
