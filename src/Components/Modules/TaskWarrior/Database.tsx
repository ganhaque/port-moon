export async function addTask(
  tag: string,
  project: string,
  description: string,
  due: string
): Promise<number> {
  const newTag = tag !== '' ? `tag:'${tag}' ` : '';
  const newProject = project !== '' ? `project:'${project}' ` : '';
  if (description === '') {
    console.error("a task must have a description");
    return Promise.reject(new Error("a task must have a description"));
  }
  const newDescription = `description:'${description}' `;
  const newDueDate = due !== '' ? `due:'${due}' ` : '';
  const cmd = `task add ` + newTag + newProject + newDescription + newDueDate;
  console.log(cmd);

  if (window.electronAPI?.executeCommand) {
    return window.electronAPI.executeCommand(cmd)
      .then((output) => {
        console.log(output);
        const regex = /Created task (\d+)/;
        const match = output.match(regex);
        if (match) {
          const taskNumber = parseInt(match[1]);
          return taskNumber;
        } else {
          throw new Error('Could not find task number in output');
        }
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  } else {
    return Promise.reject(new Error("window.electronAPI.executeCommand is not defined"));
  }
}

export function completeTask(taskID: number) {
  const cmd = `task done ` + taskID;
  console.log(cmd);

  if (window.electronAPI?.executeCommand) {
    window.electronAPI.executeCommand(cmd)
      .then((output) => {
        console.log(output);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

export function modifyTask(
  taskID: number,
  tag: string,
  project: string,
  description: string,
  due: string,
  priority: string
) {
  const newTag = tag !== '' ? `tag:'${tag}' ` : '';
  const newProject = project !== '' ? `project:'${project}' ` : '';
  const newDescription = description !== '' ? `description:'${description}' ` : '';
  const newDueDate = due !== '' ? `due:'${due}' ` : '';
  const newPriority = priority !== '' ? `priority:'${priority}' ` : '';
  const cmd = `task modify ` +
    taskID + ' ' +
    newTag +
    newProject +
    newDescription +
    newDueDate +
    newPriority
  ;
  console.log(cmd);

  if (window.electronAPI?.executeCommand) {
    window.electronAPI.executeCommand(cmd)
      .then((output) => {
        console.log(output);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

export function undoTask() {
  const cmd = `echo 'y' | task undo`;
  console.log(cmd);
  if (window.electronAPI?.executeCommand) {
    window.electronAPI.executeCommand(cmd)
      .then((output) => {
        console.log(output);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

// MAYBE: delete tag and project functionality
// if so then scan last line of output and return
// how many tasks was deleted
export function deleteTask(
  taskID: number
) {
  if (!taskID || taskID < 0) {
    console.error("taskID is invalid");
    return;
  }
  else if (taskID === 0) {
    console.error("not a good idea to delete all completed task");
    return;
  }
  const cmd = `echo 'y' | task delete ` + taskID;
  console.log(cmd);
  if (window.electronAPI?.executeCommand) {
    window.electronAPI.executeCommand(cmd)
      .then((output) => {
        console.log(output);
      })
      .catch((err) => {
        console.error(err);
      });
  }

}
