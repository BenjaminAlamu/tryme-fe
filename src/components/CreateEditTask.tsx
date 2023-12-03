import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import InputComponent from '../components/InputComponent';
import SelectComponent from '../components/SelectComponent';
import { useForm } from 'react-hook-form';
import ButtonComponent from '../components/ButtonComponent';
import { X } from '@phosphor-icons/react';
import { api } from '../utils/api';
import { toast } from 'react-toastify';

import { useMutation } from 'react-query';

type TaskCardProp = {
  task?: any;
  isOpen: boolean;
  isEditing: boolean;
  className?: string;
  handleClose?: any;
  refectchData: any;
};

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

const CreateEditTask = (props: TaskCardProp) => {
  const { task, isOpen, handleClose, refectchData, isEditing } = props;
  const [loading, setLoading] = useState(false);

  const [payload, setPayload] = useState({
    ...task
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { ...task } });
  const onSubmit = data => {
    mutate(data);
  };

  const { mutate } = useMutation(
    payload => (isEditing ? updateTask(payload) : createTask(payload)),
    {
      onError: error => {
        toast.error(error.response.data.message);
        setLoading(false);
      },
      onSuccess: res => {
        toast.success('Task created Successful');
        setLoading(false);
        refectchData();
        handleClose();
      }
    }
  );

  const createTask = async data => {
    try {
      setLoading(true);
      return api.post('/task/create', payload);
    } catch (e) {
      return e;
    }
  };
  const updateTask = async data => {
    try {
      setLoading(true);
      return api.put(`/task/${payload._id}`, payload);
    } catch (e) {
      return e;
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setPayload(prev => ({
      ...prev,
      [name]: value
    }));
  };
  return (
    <div className="rounded-lg shadow-lg m-4 p-4">
      <Modal
        isOpen={isOpen}
        onRequestClose={handleClose}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <main className="w-full flex items-center justify-between">
          <h2 className="text-2xl text-primary font-bold pb-2">
            {isEditing ? 'Edit' : 'Add'} Task
          </h2>

          <button onClick={handleClose}>
            <X size={32} />
          </button>
        </main>
        <hr />
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="my-4">
          <section className="my-4">
            <InputComponent
              id="title"
              value={payload.title}
              name="title"
              labelText="Task Details"
              register={register}
              placeholder="e.g Create a PR"
              handleChange={handleChange}
              errorMessage="This is a compulsory field"
              error={!!errors.title}
              validation={{
                required: true
              }}
            />
          </section>

          <section className="my-4">
            <InputComponent
              id="dueDate"
              value={payload.dueDate}
              name="dueDate"
              type="date"
              labelText="Due Date"
              register={register}
              placeholder="e.g Benjamin Alamu"
              handleChange={handleChange}
              errorMessage="Please a due date"
              error={!!errors.dueDate}
              validation={{}}
            />
          </section>

          <section className="my-4">
            <SelectComponent
              name="priority"
              id="priority"
              onChange={handleChange}
              placeholder="Select Priority"
              className=" h-10 w-full"
              options={[
                { name: 'Low', id: 'low' },
                { name: 'Medium', id: 'medium' },
                { name: 'High', id: 'high' }
              ]}
            />
          </section>

          <main className="w-full py-4">
            <ButtonComponent
              isDisabled={loading}
              isLoading={loading}
              text={isEditing ? 'Edit Task' : 'Add Task'}
            />
          </main>
        </form>
      </Modal>
    </div>
  );
};

export default CreateEditTask;
