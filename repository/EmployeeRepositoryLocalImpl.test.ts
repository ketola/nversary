import {EmployeeRepositoryLocalImpl} from './EmployeeRepositoryLocalImpl'
import * as data from '../test/data/people.json'

it('returns employees', () => {
  const repo = new EmployeeRepositoryLocalImpl((<any>data))
  expect("Jösse Jalkanen").toEqual(repo.findAllEmployees()[0].fullName);
  expect("Hemppa Könönen").toEqual(repo.findAllEmployees()[1].fullName);
});
