// This class will be in charge of storing everything we need from the tasks

class Task{
    constructor(task, date, type, tags) {
        // task = str
        // date = int
        // type = str
        // tags = []
        this.task = task;
        this.date = date;
        this.type = type;
        this.type = tags;
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
        return this.type;
    }

    showTags(index) {
        // Returns tags
        return this.tags[index];
    }

    get showAllTags() {
        return this.tags;
    }
}