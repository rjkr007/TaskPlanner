// Create function createTaskHtml

const createTaskHtml = (
  id,
  taskName,
  description,
  assignTo,
  status,
  dueDate
) => {
  // alert(taskName);
  return `
<div class="container" >
      <div class="row">
        <div class="col-md-9">
         
            <table class="table">
              
              
                  <tr data-task-id=${id}>
        
                  <td>${taskName}</td>
                  <td>${description}</td>
                  <td>${assignTo}</td>
                  <td id="done" type="button" class="btn ${
                    status === "To Do"
                      ? "btn-outline-danger"
                      : "btn-outline-success"
                  }">
${status}</td>    
                  <td>${dueDate}</td>    
                 <td> 
             <button class="btn btn-outline-success done-button ${
               status === "To Do" ? "visible" : "invisible"
             }">Mark As Done</button>
       </td>
                  <td>
                    <!-- <a href="" class="btn btn-secondary"> -->
                    <button
                      type="button"
                      class="btn btn-outline-primary"
                      data-toggle="modal"
                      data-target="#editPostModal"
                    >
                      Edit Task
                    </button>
                  </td>
                  <td>
                 
                      <div class="btn btn-outline-danger">
                        <i class="fas fa-trash delete-button"></i>
                        <!-- <i class="fas fa-trash"></i> Delete -->
                      </div>
                    
                  </td>
                  </tr>
              
            </table>
          </div>
        </div>
      </div>
    </div>  
`;
};

// create taskManager class
class TaskManager {
   constructor(currentId = 0) {
    this.tasks = [];
    this.currentId = currentId;
  }
 
  // Add addTask method
  addTask(taskName, description, assignedTo, status, dueDate) {
    // create new object
    const newTask = {
      id: this.currentId++,
      taskname: taskName.trim(),
      description: description.trim(),
      assignedto: assignedTo.trim(),
      status: "To Do",
      duedate: dueDate,
    };
    this.tasks.push(newTask);
  }

  // Create the deleteTask method

  deleteTask(taskId) {
    // console.log(`deleteTask; ${taskId}`);
    // Create an empty array and store it in a new variable, newTasks
    const newTasks = [];
    // Loop over the tasks and find the task with the id passed as a parameter
    for (let i = 0; i < this.tasks.length; i++) {
      // alert(`length ${this.tasks.length}`);
      // console.log(`length ${this.tasks.length}`);

      // current task in the loop
      const task = this.tasks[i];
      // Check if the task id is not the task id passed in as a parameter
      if (task.id !== taskId) {
        newTasks.push(task);
      }
    }
    // Set this.tasks to newTasks
    this.tasks = newTasks;
    // console.log(`this.tasks = ${this.tasks}`);
  }
  getTaskById(taskId) {
    // variable to store the found task
    let foundTask;

    // Loop over the tasks and find the task with the id passed as a parameter
    for (let i = 0; i < this.tasks.length; i++) {
      // current task in the loop
      const task = this.tasks[i];

      // Check if its the right task by comparing the task's id to the id passed as a parameter
      if (task.id === taskId) {
        // Store the task in the foundTask variable
        foundTask = task;
      }
    }

    // Return the found task
    return foundTask;
  }

  // Create the render method
  render() {
    // console.log("render()");
    // console.log(`this.tasks = ${this.tasks.length}`);
    // Create an array to store the tasks' HTML
    const tasksHtmlList = [];
    const tasksList = document.querySelector("#tasksList");
    // Loop over our tasks and create the html, storing it in the array
    for (let i = 0; i <= this.tasks.length; i++) {
      // alert(`length render ${this.tasks.length}`);
      if (!this.tasks.length) {
        tasksList.innerHTML = "";
        return;
      }
      // alert(this.tasks.length);
      // Get the current task in the loop
      const task = this.tasks[i];
      // console.log(`task = ${this.tasks[i]}`);

      if (!task) return;
      // Format the date
      const date = new Date(task.duedate);
      const formattedDate =
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      // Create the task html
      const taskHtml = createTaskHtml(
        task.id,
        task.taskname,
        task.description,
        task.assignedto,
        task.status,
        formattedDate
      );

      // Push it to the tasksHtmlList array
      tasksHtmlList.push(taskHtml);

      // Create the tasksHtml by joining each item in the tasksHtmlList
      // with a new line in between each item.
      const tasksHtml = tasksHtmlList.join("\n");

      // Set the inner html of the tasksList on the page
      // const tasksList = document.querySelector("#tasksList");
      tasksList.innerHTML = tasksHtml;
    }
  }

  // Create the save method
  save() {
    const tasksJson = JSON.stringify(this.tasks);
    localStorage.setItem("tasks", tasksJson);
    // console.log(`localStorage; ${localStorage.tasksJson}`);
    // alert(`localstorage ${localStorage.tasksJson}`);
    const currentId = String(this.currentId);
    localStorage.setItem("currentId", currentId);
  }

  // //  Create the load method

  load() {
    // Check if any tasks are saved in localStorage
    if (localStorage.getItem("tasks")) {
      // Get the JSON string of tasks in localStorage
      const tasksJson = localStorage.getItem("tasks");

      // Convert it to an array and store it in our TaskManager
      this.tasks = JSON.parse(tasksJson);
    }

    //     // Check if the currentId is saved in localStorage
    if (localStorage.getItem("currentId")) {
      //       // Get the currentId string in localStorage
      const currentId = localStorage.getItem("currentId");

      //       // Convert the currentId to a number and store it in our TaskManager
      this.currentId = Number(currentId);
    }
  }
}

// module.exports = TaskManager;
if (typeof module != "undefined") {
  module.exports = TaskManager;
}
