import SingleTask from '../components/SingleTask';
import SelectComponent from '../components/SelectComponent';

const List = props => {
  return (
    <>
      <div className="container mx-auto">
        <p>Holla</p>
        <p>Here are all your tasks</p>

        <SelectComponent
          name="is_percentage"
          onChange={() => null}
          placeholder="Select Status"
          className=" h-10"
          options={[{ name: 'This Week', id: 'This Week' }]}
        />
        <main className="flex flex-wrap ">
          {[1, 2, 3, 4, 5, 6, 6, 7].map(function (data) {
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
