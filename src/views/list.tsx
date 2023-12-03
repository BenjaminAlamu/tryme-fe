import SingleTask from '../components/SingleTask';
import SelectComponent from '../components/SelectComponent';
import ButtonComponent from '../components/ButtonComponent';
import EmptyState from '../components/EmptyState';
import Loader from '../components/Loader';
import CreateEditTask from '../components/CreateEditTask';
import { useMutation, useQueries, useQuery } from 'react-query';
import { api } from '../utils/api';
import { useState, useEffect } from 'react';

const List = props => {
  const [list, setList] = useState([]);
  const [filters, setFilters] = useState({
    status: undefined,
    priority: undefined
  });
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isEditingTask, setIsEditing] = useState(false);
  const [activeTask, setActiveTask] = useState({
    title: '',
    dueDate: '',
    priority: ''
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const closeModal = (e: any) => {
    setIsOpen(false);
    setActiveTask({
      title: '',
      dueDate: '',
      priority: ''
    });
    setIsEditing(false);
  };

  const handleEdit = (task: any) => {
    setIsEditing(true);
    setActiveTask(task);
    setIsOpen(true);
  };

  const generateFilter = () => {
    const sortedFilters = JSON.parse(JSON.stringify(filters));
    const keys = Object.keys(sortedFilters);
    const values = Object.values(sortedFilters);
    let fil = '';
    keys.map((k, index) => {
      fil += `${k}=${values[index]}&`;
    });
    return fil;
  };

  const { isLoading, refetch: fetchAllTasks } = useQuery('fetchTasks', () => {
    const fil = generateFilter();
    api.get(`/task?${fil}`).then(res => {
      setList(res.data.data.tasks);
    });
  });
  return (
    <>
      <CreateEditTask
        refectchData={fetchAllTasks}
        task={activeTask}
        isOpen={modalIsOpen}
        handleClose={closeModal}
        isEditing={isEditingTask}
      />
      <div className="container mx-auto">
        <main className="flex w-full justify-between items-center">
          <section>
            <p>Holla</p>
            <p>Here are all your tasks</p>
          </section>
          <ButtonComponent className="!w-auto" onClick={() => setIsOpen(true)} text="Add task" />
        </main>

        <main className="flex w-full gap-x-2 justify-end items-center my-2">
          <span>Filter by:</span>
          <SelectComponent
            name="status"
            id="status"
            onChange={handleChange}
            placeholder="Select Status"
            className=" h-10"
            options={[
              { name: 'Pending', id: 'pending' },
              { name: 'Inprogress', id: 'in-progress' },
              { name: 'Completed', id: 'completed' }
            ]}
          />

          <SelectComponent
            name="priority"
            id="priority"
            onChange={handleChange}
            placeholder="Select Priority"
            className=" h-10"
            options={[
              { name: 'Low', id: 'low' },
              { name: 'Medium', id: 'medium' },
              { name: 'High', id: 'high' }
            ]}
          />
        </main>
        <>
          {isLoading && <Loader />}
          {!isLoading && list.length < 1 && <EmptyState />}
        </>
        <main className="flex flex-wrap ">
          {!isLoading &&
            list.length &&
            list.map(function (data) {
              return (
                <section className="w-full md:w-1/3 2xl:w-1/4">
                  <SingleTask
                    handleEdit={e => {
                      handleEdit(e);
                    }}
                    task={data}
                  />
                </section>
              );
            })}
        </main>
      </div>
    </>
  );
};

export default List;
