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
  const newTaskDueDate = document.querySelector("#newTaskDueDate");
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
  const dueDate = newTaskDueDate.value;
  if (!validFormFieldInput(name)) {
    errorMessageTN.innerHTML = "Invalid Name";
    errorMessageTN.style.display = "block";
  } else {
    errorMessageTN.style.display = "none";
  }
  if (!validFormFieldInput(description)) {
    errorMessageTDES.innerHTML = "Invalid description";
    errorMessageTDES.style.display = "block";
  } else {
    errorMessageTDES.style.display = "none";
  }
  if (!validFormFieldInput(assignedTo)) {
    errorMessageASSTO.innerHTML = "Invalid Assigned To";
    errorMessageASSTO.style.display = "block";
  } else {
    errorMessageASSTO.style.display = "none";
  }
  if (!validFormFieldInput(dueDate)) {
    errorMessageDD.innerHTML = "Invalid Due Date";
    errorMessageDD.style.display = "block";
  } else {
    errorMessageDD.style.display = "none";
  }
});
function validFormFieldInput(data) {
  return data !== null && data !== "";
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
  const editDueDate = editTaskDueDate.value;

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
