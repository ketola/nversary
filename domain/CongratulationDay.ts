import { Employee } from "./Employee";

class CongratulationDay {
    public date: Date;
    public employeeToCongratulate: Employee;

    constructor(date: Date) {
        this.date = date;
    }
}

export {CongratulationDay};
