import * as helper from './Helper';
import ProgressBar from '../ProgresBar';

export function renderTags(tagRecord: any, focusedTagName: string, tagNameArray: string[], handleTagClick: (tag: string) => void) {
  if (!tagRecord[focusedTagName]) {
    return <div> Loading... </div>
  }
  return tagNameArray.map((tag) => 
    <p
      key={tag}
      className={`hover-button ${tag === focusedTagName ? 'focused-hover-button' : ''}`}
      onClick={() => handleTagClick(tag)}
    >
      {tag}
    </p>
  );
}

export function renderProjects(
  tagRecord: Record<string, { projectNames: string[] }>,
  focusedTagName: string,
  focusedProjectName: string,
  handleProjectClick: (project: string) => void
) {
  if (!tagRecord[focusedTagName]?.projectNames) {
    return <div> Loading... </div>
  }
  return tagRecord[focusedTagName].projectNames.map((project: string) => 
    <p
      key={project}
      className={`hover-button ${project === focusedProjectName ? 'focused-hover-button' : ''}`}
      onClick={() => handleProjectClick(project)}
    >
      {project}
    </p>
  );
}

const renderTaskList = (tasks: any[]) => {
  return (
    <div className="flex-container column-flex-direction flex-no-gap">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={task.status === "completed" ? "completed-task" : ""}
          id="task-grid"
        >
          <div id="task-description">
            <p>{task.description}</p>
          </div>
          <div className="" id="task-due">
            <p>{task.due ? `due ${helper.formatDueDate(task.due)}` : ""}</p>
          </div>
          <div className="" id="task-urgency">
            <p>
              {/* TODO: changes text color based on urgency */}
              {Number(task.urgency).toFixed(1)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
export function renderTasks (
  focusedTagName: string,
  focusedProjectName: string,
  tagRecord: any
) {
  if (!tagRecord[focusedTagName]) {
    return (
      <div id="not-found">
        <p>no tasks exist for current tag</p>
      </div>
    );
  }

  if (focusedProjectName === "") {
    const tasks = tagRecord[focusedTagName]?.tasks;
    return renderTaskList(tasks);
  }

  const tasks = tagRecord[focusedTagName]?.projects[focusedProjectName]?.tasks;
  return renderTaskList(tasks);
};

export function renderHeader(
  tagRecord: any,
  focusedTagName: string,
  focusedProjectName:string
) {
  const isTagSelected = Boolean(tagRecord[focusedTagName]?.totalTasks);
  if (!isTagSelected) {
    return (
      <div id="not-found">
        <p>
          No Tag or Project Selected... (no taskwarrior?)
        </p>
      </div>
    );
  }

  const selectedProject = tagRecord[focusedTagName]?.projects[focusedProjectName];
  const { completedTasks: completedTasksForTag, totalTasks: totalTasksForTag } = tagRecord[focusedTagName];
  const { completedTasks: completedTasksForProject, totalTasks: totalTasksForProject } = selectedProject || {};

  const completedTasks = focusedProjectName ? completedTasksForProject : completedTasksForTag;
  const totalTasks = focusedProjectName ? totalTasksForProject : totalTasksForTag;

  const percentCompleted = Math.floor((completedTasks / totalTasks) * 100);

  return (
    <>
      <div className='flex-container' id="">
        <div>
          <h2 className="header" id="task-header">
            Tasks
          </h2>
          <div className="" id="task-header">
            <p> {
              `${focusedTagName} - ${focusedProjectName ? `${focusedProjectName} - ` : ''}${completedTasks}/${totalTasks} REMAINING`
            } </p>
          </div>
        </div>

        <h1 className='header' id="percent-header">
          {percentCompleted}%
        </h1>
      </div>

      <ProgressBar
        bgcolor="rgba(var(--secondary))"
        completed={percentCompleted}
      />
    </>
  );
}