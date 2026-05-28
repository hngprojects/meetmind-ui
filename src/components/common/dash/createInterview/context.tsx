import AddContextForm from "./AddContextForm";

const Context = () => {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-lg font-bold">Add Context</h1>
      <p className="text-base text-text-subtext">
        Tell the AI what to focus on
      </p>

      <p
        className="bg-text-primary w-[50%] md:w-[25%] p-2 
                   text-center rounded-lg text-white"
      >
        Form input
      </p>

      <div>
        <div>
          <AddContextForm />
        </div>
      </div>
    </div>
  );
};

export default Context;
