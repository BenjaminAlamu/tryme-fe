import { TagSimple } from '@phosphor-icons/react';
import { MouseEventHandler } from 'react';

type TaskCardProp = {
  task: any;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | any;
};

const TaskCard = (props: TaskCardProp) => {
  const { task } = props;
  return (
    <div className="rounded-lg shadow-lg m-4 p-4">
      <p>{task.title} </p>
      <p>{task.dueDate} </p>
      <main className="flex w-full flex-wrap justify-between  mt-4">
        <p className="bg-red-400 py-2 px-4 rounded capitalize">{task.priority}</p>
        <main className="flex gap-x-2">
          <p className="text-blue-500">Edit</p>
          <p className="text-green-500">Mark Completed</p>
        </main>
      </main>
    </div>
  );
};

export default TaskCard;
