export default class Task {
  constructor(task = '', date = new Date(), type = 'Progress', tags = ['+'], description = '') {
      this.task = task;
      this.date = date;
      this.type = type;
      this.tags = tags;
      this.description = description; // Ensure description is assigned properly
  }

  showTask() {
      return this.task;
  }

  showDate() {
      return this.date.toString();
  }

  showType() {
      return this.type;
  }

  showTags(index) {
      return this.tags[index];
  }

  showAllTags() {
      return this.tags;
  }

  showDescription() {
      return this.description;
  }

  toString() {
      return `task: ${this.task}, date: ${this.date}, type: ${this.type}, tags: ${this.tags}, description: ${this.description}`;
  }
}
