const assert = require("assert");
const TaskManager = require("./../js/taskManager.js");

describe("Testing taskmanager function", () => {
  it("Checks for Add Task", () => {
    const taskManager = new TaskManager(0);
    taskManager.addTask("shoppping", "At Aldi", "Rajeev", "24/01/2021");
    let len = taskManager.tasks.length;
    assert.strictEqual(len, 1);
  });

  it("Checks for Delete Task", () => {
    const taskManager = new TaskManager(0);
    taskManager.addTask("shoppping", "At Aldi", "Rajeev", "24/01/2021");
    taskManager.addTask("Cleaning", "Driveway", "Rajeev", "27/01/2021");
    taskManager.addTask("Gardening", "In Garden", "Rajeev", "25/01/2021");
    taskManager.deleteTask(0);
    let len = taskManager.tasks.length;
    assert.strictEqual(len, 2);
  });

  it("Gets Task by ID", () => {
    const taskManager = new TaskManager(0);
    taskManager.addTask("shoppping", "At Aldi", "Rajeev", "24/01/2021");
    taskManager.addTask("Cleaning", "Driveway", "Rajeev", "27/01/2021");
    foundTask = taskManager.getTaskById(1);
    console.log(foundTask);
    newTaskName = "Cleaning";
    assert.strictEqual(foundTask.taskname, newTaskName);
  });
});
