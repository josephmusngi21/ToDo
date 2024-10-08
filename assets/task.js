export default class Task {
  constructor(task = '', date = new Date(), type = 'Progress', tags = ['+'], description = '') {
      this.task = task;
      this.date = date;
      this.type = type;
      this.tags = tags;
      this.description = description;
  }

  showTask() {
      return this.task;
  }

  showDate() {
      const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' };
      const formattedDate = this.date.toLocaleDateString('en-US', dateOptions);

      const hours = this.date.getHours();
      const minutes = this.date.getMinutes();
      const period = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12; // Converts 0 to 12 for midnight
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      const formattedTime = `${formattedHours}:${formattedMinutes} ${period}`;

      return `${formattedDate}, ${formattedTime}`;
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
      return `task: ${this.task}, date and time: ${this.showDate()}, type: ${this.type}, tags: ${this.tags}, description: ${this.description}`;
  }
}
