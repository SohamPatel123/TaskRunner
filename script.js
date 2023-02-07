const prompt = require("prompt-sync")();

class TaskRunner {
    constructor(q) {
      this.q = q;
      this.current_task = {};
    }
    foo(retVal, timer) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(retVal);
        }, timer);
      });
    }
    async runTask() {
      if (this.q.length === 0) return;
      this.current_task = this.q[0];
      let current_retVal = this.current_task.retVal;
      let current_timer = this.current_task.timer;
      let res = await this.foo(current_retVal, current_timer);
      this.q.shift();
      this.current_task = null;
      console.log("function complete: ", res);
      this.runTask();
    }
  
    addTask(id, retVal, timer) {
      console.log("added --->", id, retVal, timer);
      let newTask = { id: id, retVal: retVal, timer: timer };
      this.q.push(newTask);
      if (this.q.length === 1) this.runTask();
    }
  
    removeTask(id) {
        if(this.q.length)
            console.log("queue is empty, so there is no element to be deleted");
      for (let t = 0; t < this.q.length; t++) {
        let task = this.q[t];
        if (task.id === id) {
          if (t) {
            this.q.splice(t, 1);
            console.log("deleted function with id: ", id);
          } else console.log("this function is running");
        }
      }
    }
  
    displayPendingTasks() {
      console.log("current pending tasks queue: ", this.q);
    }
  
    displayCurrentTask() {
      console.log("current running task: ", this.current_task);
    }
  }
  
  let t = new TaskRunner([]);

function display_loop() {
    let val = prompt(" enter 1: Add task, 2: Delete task, 3: Display current running task, 4: Display current queue : ");
    let flag = 1;
    switch(val) {
        case "1":
            let id = prompt("enter id of task to be added : ");
            let returnVal = prompt("enter return value : ");
            let timer = prompt("enter timeout period : ");
            t.addTask(id, returnVal, timer);
            break;
        case "2":
            let d_id = prompt("enter id of task to be deleted : ");
            t.removeTask(d_id);
            break;
        case "3":
            t.displayCurrentTask();
            break;
        case "4":
            t.displayPendingTasks();
            break;
        default:
            flag=0;
            return;
    }
    if(flag)
        setTimeout(() => {
            display_loop();
        }, 0);
}
display_loop();