// Create function createTaskHtml

const createTaskHtml = (
  id,
  taskName,
  description,
  assignTo,
  status,
  dueDate
) => `
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
                    <div class="col-md-3">
                      <a href="#" class="btn btn-outline-danger">
                        <i class="fas fa-trash delete-button"></i>
                        <!-- <i class="fas fa-trash"></i> Delete -->
                      </a>
                    </div>
                  </td>
                  </tr>
              
            </table>
          </div>
        </div>
      </div>
    </div>  
`;

// create taskManager class
class TaskManager {
  constructor(currentId) {
    this.tasks = [];
    this.currentId = 0;
  }

  // Add addTask method
  addTask(taskName, description, assignedTo, status, dueDate) {
    // create new object
    const newTask = {
      id: this.currentId++,
      taskname: taskName,
      description: description,
      assignedto: assignedTo,
      status: "To Do",
      duedate: dueDate,
    };
    this.tasks.push(newTask);
  }

  //delete task

  deleteTask(taskId) {
    const newTask = [];
    // Loop over the tasks and find the task with the id passed as a parameter
    for (let i = 0; i < this.tasks.length; i++) {
      // current task in the loop
      const task = this.tasks[i];
      if (task.id !== taskId) {
        newTasks.push(task);
      }
    }
    this.tasks = newTasks;
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
    // Create an array to store the tasks' HTML
    const tasksHtmlList = [];
    // Loop over our tasks and create the html, storing it in the array
    for (let i = 0; i < this.tasks.length; i++) {
      // Get the current task in the loop
      const task = this.tasks[i];

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
      const tasksList = document.querySelector("#tasksList");
      tasksList.innerHTML = tasksHtml;
    }
    // save()
    // {
    //   const tasksJson = JSON.stringify(this.tasks);
    //   localStorage.setItem("tasks", tasksJson);
    //   const currentId = String(this.currentId);
    //   localStorage.setItem("currentId", currentId);
    // }
    // // //// Create the load method
    // load()
    // {
    //   // Check if any tasks are saved in localStorage
    //   if (localStorage.getItem("tasks")) {
    //     // Get the JSON string of tasks in localStorage
    //     const tasksJson = localStorage.getItem("tasks");

    //     // Convert it to an array and store it in our TaskManager
    //     this.tasks = JSON.parse(tasksJson);
    //   }

    //   //     // Check if the currentId is saved in localStorage
    //   if (localStorage.getItem("currentId")) {
    //     //       // Get the currentId string in localStorage
    //     const currentId = localStorage.getItem("currentId");

    //     //       // Convert the currentId to a number and store it in our TaskManager
    //     this.currentId = Number(currentId);
    //   }
    // }
  }
}
