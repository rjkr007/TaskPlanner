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
          <div class="card">
            </div>
            <table class="table table-striped">
              <thead class="thead-dark">
                <tr>
                  <th>Task Name</th>
                  <th>Task Description</th>
                  <th>Assigned to</th>
                  <th>Status</th>
                  <th>Due Date</th>
                  <th>Mark As Done</th>
                  <th>Edit Task</th>
                  <th>Delete</th>
                 </tr>
              </thead>
              <tbody>
                  <tr data-task-id=${id}>
        
                  <td>${taskName}</td>
                  <td>${description}</td>
                  <td>${assignTo}</td>
                  <td>${status}</td>    
                  <td>${dueDate}</td>    
                 <td> 
<div class="d-flex w-100 justify-content-end">
            <button class="btn btn-outline-success done-button ${
              status === "To Do"
            }">Mark As Done</button>
        </div>
</td>
                  <td>
                    <!-- <a href="" class="btn btn-secondary"> -->
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-toggle="modal"
                      data-target="#editPostModal"
                    >
                      Edit Task
                    </button>
                  </td>
                  <td>
                    <div class="col-md-3">
                      <a href="index.html" class="btn btn-danger">
                        <i class="fas fa-trash"></i>
                        <!-- <i class="fas fa-trash"></i> Delete -->
                      </a>
                    </div>
                  </td>

                  </tr>
                </tbody>
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
  }
}
// }

// const taskman = new TaskManager();

// taskman.addTask();

// Call addTask method
// taskman.addTask(
//   "Groceries",
//   "Purchase Groceries",
//   "John",
//   "2021-01-10",
//   "TODO"
// );
// // taskman.addTask(
// //   "Childern's Books",
// //   "Time to Play",
// //   "Bluey",
// //   "./images/bluey.jpg"
// // );
// console.log(taskman.tasks);
