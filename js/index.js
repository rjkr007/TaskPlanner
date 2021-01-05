//Change  body background color
document.querySelector("body").style.backgroundColor = "#e6faff";

// Initialize a new TaskManager with currentId set to 0
const taskManager = new TaskManager(0);

// taskManager.load();
//  taskManager.render();

// Select the New Task Form
const newTaskForm = document.querySelector("#newTaskForm");

// Add an 'onsubmit' event listener
newTaskForm.addEventListener("submit", (event) => {
  // Prevent default action
  event.preventDefault();

  // Select the inputs for Add Task Form
  const newTaskNameInput = document.querySelector("#newTaskNameInput");
  const newTaskDescription = document.querySelector("#newTaskDescription");
  const newTaskAssignedTo = document.querySelector("#newTaskAssignedTo");
  const newStatus = document.querySelector("#newStatus");
  const newTaskDueDate = document.querySelector("#newTaskDueDate");
  const newDateToday = new Date();
  const errorMessageTN = document.querySelector("#alertMessageTN");
  const errorMessageTDES = document.querySelector("#alertMessageTDES");
  const errorMessageASSTO = document.querySelector("#alertMessageASSTO");
  const errorMessageDD = document.querySelector("#alertMessageDD");

  /*
        Validation code here
    */

  // Get the values of the inputs
  const name = newTaskNameInput.value;
  const description = newTaskDescription.value;
  const assignedTo = newTaskAssignedTo.value;
  const status = newStatus.value;
  const dueDate = newTaskDueDate.value.trim()
    ? new Date(newTaskDueDate.value)
    : null;

  if (!validFormFieldInput(name)) {
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

    taskManager.addTask(name, description, assignedTo, status, dueDate);
    // taskManager.save();

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
    // taskManager.save();

    // Render the tasks
    taskManager.render();
  }
  if (event.target.classList.contains("delete-button")) {
    // Get the parent Task
    const parentTask = event.target.parentElement.parentElement;
    // alert(parentTask);
    // Get the taskId of the parent Task.
    const taskId = Number(parentTask.dataset.taskId);
    taskManager.deleteTask(taskId);
    taskManager.save();
    taskManager.render();
  }
});

function validFormFieldInput(data) {
  // return data !== null && data !== "";
  if (data.trim().length === 0) {
    return false;
  } else {
    return true;
  }
}

// // Select the Edit Task Form
const editTaskForm = document.querySelector("#editTaskForm");

// Add an 'onsubmit' event listener
editTaskForm.addEventListener("submit", (event) => {
  // Prevent default action
  event.preventDefault();

  // Select the inputs for Edit Task Form
  const editTaskNameInput = document.querySelector("#editTaskNameInput");
  const editTaskDescription = document.querySelector("#editTaskDescription");
  const editTaskAssignedTo = document.querySelector("#editTaskAssignedTo");
  // const editStatus = document.querySelector("#editStatus");
  const editTaskDueDate = document.querySelector("#editTaskDueDate");
  const errorMessageEditTN = document.querySelector("#alertMessageEditTN");
  const errorMessageEditTDES = document.querySelector("#alertMessageEditTDES");
  const errorMessageEditASSTO = document.querySelector(
    "#alertMessageEditASSTO"
  );
  const errorMessageEditDD = document.querySelector("#alertMessageEditDD");

  /*
      Validation code here
  */

  // Get the values of the inputs
  const editName = editTaskNameInput.value;
  const editDescription = editTaskDescription.value;
  const editAssignedTo = editTaskAssignedTo.value;
  // const editStatus = editStatus.value;
  const editDueDate = editTaskDueDate.value;

  // // Clear the form
  // editTaskNameInput.value = "";
  // editTaskDescription.value = "";
  // editTaskAssignedTo.value = "";
  // editStatus.value = "";
  // editTaskDueDate.value = "";

  if (!validFormFieldInput(editName)) {
    errorMessageEditTN.innerHTML = "Invalid Name";
    errorMessageEditTN.style.display = "block";
  } else {
    errorMessageEditTN.style.display = "none";
  }
  if (!validFormFieldInput(editDescription)) {
    errorMessageEditTDES.innerHTML = "Invalid description";
    errorMessageEditTDES.style.display = "block";
  } else {
    errorMessageEditTDES.style.display = "none";
  }
  if (!validFormFieldInput(editAssignedTo)) {
    errorMessageEditASSTO.innerHTML = "Invalid Assigned To";
    errorMessageEditASSTO.style.display = "block";
  } else {
    errorMessageEditASSTO.style.display = "none";
  }
  if (!validFormFieldInput(editDueDate)) {
    errorMessageEditDD.innerHTML = "Invalid Due Date";
    errorMessageEditDD.style.display = "block";
  } else {
    errorMessageEditDD.style.display = "none";
  }
});
function validFormFieldInput(data) {
  return data !== null && data !== "";
}
