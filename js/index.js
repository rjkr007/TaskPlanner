//Change  body background color
document.querySelector("body").style.backgroundColor = "#e6faff";

// Initialize a new TaskManager with currentId set to 0
const taskManager = new TaskManager(0);

taskManager.load();
taskManager.render();

// Select the New Task Form
const newTaskForm = document.querySelector("#newTaskForm");
const newTaskDueDate = document.querySelector("#newTaskDueDate");
// console.log(newTaskDueDate + "line 12");
const newDateToday = new Date();
// console.log(newDateToday + "line 14");

// Select the title of the task modal so can switch between add & edit modes
const taskModalTitle = document.querySelector("#createTaskModalLabel");
const updateTask = document.querySelector("#updateTask");
// Store taskform mode - add OR edit
let taskFormMode;
// Empty variable to store edited task temporarily
let editedTask;

// Event listener for add task button
const createTaskButton = document.querySelector("#createTaskButton");
createTaskButton.addEventListener("click", () => {
  taskFormMode = "add";
  taskModalTitle.innerHTML = "Add Task";
  updateTask.innerHTML = "Add Task";
});

// Select the inputs for Add Task Form
const newTaskNameInput = document.querySelector("#newTaskNameInput");
const newTaskDescription = document.querySelector("#newTaskDescription");
const newTaskAssignedTo = document.querySelector("#newTaskAssignedTo");
const newStatus = document.querySelector("#newStatus");
// const newTaskDueDate = document.querySelector("#newTaskDueDate");
// const newDateToday = new Date();
const errorMessageTN = document.querySelector("#alertMessageTN");
const errorMessageTDES = document.querySelector("#alertMessageTDES");
const errorMessageASSTO = document.querySelector("#alertMessageASSTO");
const errorMessageDD = document.querySelector("#alertMessageDD");

// Select task modal window
let taskModal = document.getElementById("addPostModal");

// Add an 'onsubmit' event listener
newTaskForm.addEventListener("submit", (event) => {
  // alert("here");
  // Prevent default action
  event.preventDefault();

  // Get the values of the inputs
  const taskName = newTaskNameInput.value;
  const description = newTaskDescription.value;
  const assignedTo = newTaskAssignedTo.value;
  const status = newStatus.value;
  const dueDate = newTaskDueDate.value;
  // console.log(dueDate + "line 60");
    // ? new Date(newTaskDueDate.value)
    // : null;

  if (!validFormFieldInput(taskName)) {
    errorMessageTN.innerHTML = "Invalid Name";
    errorMessageTN.style.display = "block";
    newTaskNameInput.focus();
  }
  // else {
  //   errorMessageTN.style.display = "none";
  // }
  else if (!validFormFieldInput(description)) {
    errorMessageTDES.innerHTML = "Invalid description";
    errorMessageTDES.style.display = "block";
    newTaskDescription.focus();
  }
  // else {
  //   errorMessageTDES.style.display = "none";
  // }
  else if (!validFormFieldInput(assignedTo)) {
    errorMessageASSTO.innerHTML = "Invalid Assigned To";
    errorMessageASSTO.style.display = "block";
    newTaskAssignedTo.focus();
  }
  // else {
  //   errorMessageASSTO.style.display = "none";
  // }
  else if (newTaskDueDate.value == null || dueDate < newDateToday) {
    errorMessageDD.innerHTML = "Invalid Due Date";
    errorMessageDD.style.display = "block";
    newTaskDueDate.focus();
  } else {
    errorMessageTN.style.display = "none";
    errorMessageTDES.style.display = "none";
    errorMessageASSTO.style.display = "none";
    errorMessageDD.style.display = "none";

    // Send validated values to TaskManager
    if (taskFormMode === "add") {
      taskManager.addTask(taskName, description, assignedTo, status, dueDate);
    }

    if (taskFormMode === "edit") {
      taskManager.editTask(
        editedTask,
        taskName,
        description,
        assignedTo,
        status,
        dueDate
      );
      // Switch task form mode to 'add'
      taskFormMode = "add";
      // Switch title of the modal
      taskModalTitle.innerHTML = "Add Task";
      // Close modal when save button clicked
      // $("#createTaskModal").modal("toggle");
    }

    // taskManager.addTask(name, description, assignedTo, status, dueDate);
    taskManager.save();
    taskManager.render();

    $("#addPostModal").modal("hide");

    // Clear the form
    newTaskNameInput.value = "";
    newTaskDescription.value = "";
    newTaskAssignedTo.value = "";
    newStatus.value = "";
    newTaskDueDate.value = "";
  }
});

// Select the Tasks List
const tasksList = document.querySelector("#tasksList");

// Add an 'onclick' event listener to the Tasks List
tasksList.addEventListener("click", (event) => {
  // Check if a "Mark As Done" button was clicked
  if (event.target.classList.contains("done-button")) {
    // Get the parent Task
    const parentTask = event.target.parentElement.parentElement;
    // alert(parentTask);
    // Get the taskId of the parent Task.
    const taskId = Number(parentTask.dataset.taskId);
    // alert(taskId);
    // Get the task from the TaskManager using the taskId
    const task = taskManager.getTaskById(taskId);

    // Update the task status to 'DONE'
    task.status = "DONE";
    // Save the tasks to localStorage
    taskManager.save();

    // // Render the tasks
    taskManager.render();
  }

  // Open edit mode when edit-button clicked
  if (event.target.classList.contains("edit-button")) {
     // Switch task form mode to 'edit'
    taskFormMode = "edit";
    // Switch title of the modal to "edit"
    taskModalTitle.innerHTML = "Edit Task";
    updateTask.innerHTML = "Update Task";
    const parentTask = event.target.parentElement.parentElement;
//  alert(parentTask);
    const taskId = Number(parentTask.dataset.taskId);
    // alert(taskId);
    editedTask = taskManager.getTaskById(taskId);

    // Fill task form fields with stored values
    newTaskNameInput.value = editedTask.taskName;
    newTaskDescription.value = editedTask.description;
    newTaskAssignedTo.value = editedTask.assignedTo;
    newStatus.value = editedTask.status;
    newTaskDueDate.value = editedTask.dueDate;
    // console.log(newTaskDueDate + "line 179");
  // }

  // Call taskManager.save() to save task to localStorage
  taskManager.save();

  // Call taskManager render method to push tasks to html
  taskManager.render();
  }
     
  
  if (event.target.classList.contains("delete-button")) {
    // Get the parent Task
    const parentTask = event.target.parentElement.parentElement.parentElement;
    // alert(parentTask);
    // Get the taskId of the parent Task.
    const taskId = Number(parentTask.dataset.taskId);
    // alert(taskId);
    // console.log(`delete ${taskId}`);
    taskManager.deleteTask(taskId);
    taskManager.save();
    taskManager.render();
  }
});

function validFormFieldInput(data) {
  // alert("in validate function");
  // alert(`--${data}--`);
  // return data !== null && data !== "";
  if (data.trim().length === 0) {
    return false;
  } else {
    return true;
  }
}

// // Select the Edit Task Form
// const editTaskForm = document.querySelector("#editTaskForm");

// // Add an 'onsubmit' event listener
// editTaskForm.addEventListener("submit", (event) => {
//   // Prevent default action
//   event.preventDefault();

// Select the inputs for Edit Task Form
// const editTaskNameInput = document.querySelector("#editTaskNameInput");
// const editTaskDescription = document.querySelector("#editTaskDescription");
// const editTaskAssignedTo = document.querySelector("#editTaskAssignedTo");
// const editStatus = document.querySelector("#editStatus");
// const editTaskDueDate = document.querySelector("#editTaskDueDate");
// const errorMessageEditTN = document.querySelector("#alertMessageEditTN");
// const errorMessageEditTDES = document.querySelector("#alertMessageEditTDES");
// const errorMessageEditASSTO = document.querySelector(
//   "#alertMessageEditASSTO"
// );
// const errorMessageEditDD = document.querySelector("#alertMessageEditDD");

/*
      Validation code here
  */

// Get the values of the inputs
// const editName = editTaskNameInput.value;
// const editDescription = editTaskDescription.value;
// const editAssignedTo = editTaskAssignedTo.value;
// const editStatus = editStatus.value;
// const editDueDate = editTaskDueDate.value;

// Clear the form
// editTaskNameInput.value = "";
// editTaskDescription.value = "";
// editTaskAssignedTo.value = "";
// editStatus.value = "";
// editTaskDueDate.value = "";

//   if (!validFormFieldInput(editName)) {
//     errorMessageEditTN.innerHTML = "Invalid Name";
//     errorMessageEditTN.style.display = "block";
//   } else {
//     errorMessageEditTN.style.display = "none";
//   }
//   if (!validFormFieldInput(editDescription)) {
//     errorMessageEditTDES.innerHTML = "Invalid description";
//     errorMessageEditTDES.style.display = "block";
//   } else {
//     errorMessageEditTDES.style.display = "none";
//   }
//   if (!validFormFieldInput(editAssignedTo)) {
//     errorMessageEditASSTO.innerHTML = "Invalid Assigned To";
//     errorMessageEditASSTO.style.display = "block";
//   } else {
//     errorMessageEditASSTO.style.display = "none";
//   }
//   if (!validFormFieldInput(editDueDate)) {
//     errorMessageEditDD.innerHTML = "Invalid Due Date";
//     errorMessageEditDD.style.display = "block";
//   } else {
//     errorMessageEditDD.style.display = "none";
//   }
// });

// function validFormFieldInput(data) {
//   return data !== null && data !== "";
// }
