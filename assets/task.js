export default class Task {
    constructor(task='', date, type='Progress', tags = ['']) {
      this.task = task;
      this.date = date;
      this.type = type;
      this.tags = tags;
    }
  
    get showTask() {
      return this.task;
    }
  
    get showDate() {
      return this.date;
    }
  
    get showType() {
      return this.type;
    }
  
    showTags(index) {
      return this.tags[index];
    }
  
    get showAllTags() {
      return this.tags;
    }

    toString() {
        return `\ntask: ${this.task}\n date: ${this.date}\n type:${this.type}\n tags:${this.tags}`;
    }
}