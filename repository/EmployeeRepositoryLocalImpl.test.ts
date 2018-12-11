import * as data from "../test/data/people.json";
import {EmployeeRepositoryLocalImpl} from "./EmployeeRepositoryLocalImpl";

it("returns employees", () => {
  const repo = new EmployeeRepositoryLocalImpl((data as any));
  expect("Jösse Jalkanen").toEqual(repo.findAllEmployees()[0].fullName);
  expect("Hemppa Könönen").toEqual(repo.findAllEmployees()[1].fullName);
});
