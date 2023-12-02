import Empty from '../assets/EmptyState.png';

type EmptyStateProp = {
  text?: any;
};

const EmptyState = (props: EmptyStateProp) => {
  const { text } = props;
  return (
    <div className="mx-auto text-center">
      <img className="text-center mx-auto" src={Empty} />
      <p className="text-2xl text-primary font-bold -mt-4">{text} </p>
    </div>
  );
};

EmptyState.defaultProps = {
  text: "There's nothing here yet"
};

export default EmptyState;
