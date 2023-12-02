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
      <p>Title goes here </p>
      <p>Due Date </p>
      <main className="flex w-full flex-wrap justify-end gap-x-2 mt-4">
        <p className="text-blue-500">Edit</p>
        <p className="text-green-500">Mark Completed</p>
        <p className="text-red-500">Delete</p>
      </main>
    </div>
  );
};

export default TaskCard;
