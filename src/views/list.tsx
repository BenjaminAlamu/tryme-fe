import SingleTask from '../components/SingleTask';
import SelectComponent from '../components/SelectComponent';
import ButtonComponent from '../components/ButtonComponent';
import EmptyState from '../components/EmptyState';
import Loader from '../components/Loader';
import CreateEditTask from '../components/CreateEditTask';
import { useMutation, useQueries, useQuery } from 'react-query';
import { api } from '../utils/api';
import { useState, useEffect } from 'react';
import { filterType, taskType, paginationInfoType } from '../types';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';

const List = () => {
  const [list, setList] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState<paginationInfoType | object>({});
  const [filters, setFilters] = useState<filterType>({
    status: undefined,
    priority: undefined,
    page: 0
  });
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [isEditingTask, setIsEditing] = useState<boolean>(false);
  const [activeTask, setActiveTask] = useState<taskType>({
    title: '',
    dueDate: '',
    priority: ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEventHandler<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    setTimeout(() => {
      fetchAllTasks();
    }, 500);
  };

  const handlePaginationCheck = (value: number) => {
    setFilters(prev => ({
      ...prev,
      page: value
    }));
    setTimeout(() => {
      fetchAllTasks();
    }, 500);
  };

  const closeModal = () => {
    setIsOpen(false);
    setActiveTask({
      title: '',
      dueDate: '',
      priority: ''
    });
    setIsEditing(false);
  };

  const handleEdit = (task: taskType) => {
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

  const { isFetching, refetch: fetchAllTasks } = useQuery('fetchTasks', () => {
    const fil = generateFilter();
    api.get(`/task?${fil}`).then(res => {
      setList(res.data.data.data);
      setPaginationInfo({
        ...res.data.data.pagination,
        current_page: res.data.data.pagination.current_page + 1
      });
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
          {isFetching && <Loader />}
          {!isFetching && list.length < 1 && <EmptyState />}
        </>
        <main className="flex flex-wrap ">
          {!isFetching &&
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
        <ResponsivePagination
          current={paginationInfo.current_page}
          total={paginationInfo.total_pages}
          onPageChange={e => {
            handlePaginationCheck(e - 1);
          }}
        />
      </div>
    </>
  );
};

export default List;
