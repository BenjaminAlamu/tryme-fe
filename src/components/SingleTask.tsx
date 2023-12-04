import { format } from 'date-fns';
import { MouseEventHandler } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { api } from '../utils/api';

type TaskCardProp = {
  task: any;
  className?: string;
  handleEdit: any;
  onClick?: MouseEventHandler<HTMLButtonElement> | any;
  refectchData: () => void;
};

const TaskCard = (props: TaskCardProp) => {
  const { task, handleEdit, refectchData } = props;
  const [loading, setLoading] = useState(false);

  const { mutate } = useMutation((payload: string) => deleteTask(payload), {
    onError: error => {
      toast.error(error.response.data.message);
      setLoading(false);
    },
    onSuccess: () => {
      toast.success('Task deleted Successful');
      refectchData();
    }
  });

  const deleteTask = async (id: string) => {
    try {
      setLoading(true);
      return api.delete(`/task/${id}`);
    } catch (e) {
      return e;
    }
  };

  return (
    <div className="rounded-lg shadow-lg m-4 p-4">
      <p>{task.title} </p>
      <p>{format(new Date(task.dueDate), 'do MMMM yyyy')} </p>
      <main className="flex w-full flex-wrap justify-between items-center mt-4">
        <p className="bg-blue-400 py-1 px-4 rounded capitalize">{task.priority}</p>
        {loading ? (
          <p>Loading....</p>
        ) : (
          <main className="flex items-center gap-x-2">
            <p
              onClick={() => {
                handleEdit(task);
              }}
              className="text-blue-500"
            >
              Edit
            </p>
            <p className="text-green-500">Mark Completed</p>
            <button
              onClick={() => {
                mutate(task._id);
              }}
              className="text-red-400 "
            >
              Delete
            </button>
          </main>
        )}
      </main>
    </div>
  );
};

export default TaskCard;
