// This class will be in charge of storing everything we need from the tasks

class Task{
    constructor(task, date, type) {
        // task = []
        // date = int
        // type = str
        this.task = task;
        this.date = date;
        this.type = type;
    }

    get showTask() {
        // Returns task
        return this.task;
    }

    get showDate() {
        // Returns Date
        return this.date;
    }

    get showType() {
        // Returns type 
        return this.type
    }
}