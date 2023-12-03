import { compareAsc, format } from 'date-fns';
import { MouseEventHandler } from 'react';

type TaskCardProp = {
  task: any;
  className?: string;
  handleEdit: any;
  onClick?: MouseEventHandler<HTMLButtonElement> | any;
};

const TaskCard = (props: TaskCardProp) => {
  const { task, handleEdit } = props;
  return (
    <div className="rounded-lg shadow-lg m-4 p-4">
      <p>{task.title} </p>
      <p>{format(new Date(task.dueDate), 'do MMMM yyyy')} </p>
      <main className="flex w-full flex-wrap justify-between items-center mt-4">
        <p className="bg-blue-400 py-1 px-4 rounded capitalize">{task.priority}</p>
        <main className="flex gap-x-2">
          <p
            onClick={() => {
              handleEdit(task);
            }}
            className="text-blue-500"
          >
            Edit
          </p>
          <p className="text-green-500">Mark Completed</p>
        </main>
      </main>
    </div>
  );
};

export default TaskCard;
