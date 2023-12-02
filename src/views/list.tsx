import SingleTask from '../components/SingleTask';
import SelectComponent from '../components/SelectComponent';
import EmptyState from '../components/EmptyState';
import Loader from '../components/Loader';
import { useMutation, useQueries, useQuery } from 'react-query';
import { api } from '../utils/api';
import { useState } from 'react';

const List = props => {
  const [list, setList] = useState([]);
  const {
    isLoading,
    error: loadingMessagesError,
    data: listData,
    refetch: fetchAllTasks
  } = useQuery('fetchTasks', () =>
    api.get(`/task`).then(res => {
      setList(res.data.data.tasks);
      console.log({ res: res.data.data.tasks, list });
    })
  );
  return (
    <>
      <div className="container mx-auto">
        <p>Holla</p>
        <p>Here are all your tasks {isLoading ? 'sss' : 'aaa'}</p>

        <SelectComponent
          name="is_percentage"
          onChange={() => null}
          placeholder="Select Status"
          className=" h-10"
          options={[{ name: 'This Week', id: 'This Week' }]}
        />
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
                  <SingleTask task={data} />
                </section>
              );
            })}
        </main>
      </div>
    </>
  );
};

export default List;
