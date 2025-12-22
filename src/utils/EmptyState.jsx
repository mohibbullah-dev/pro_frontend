import BottomNav from "../components/shared/BottomNav";

const EmptyState = ({ title, description, actionLabel, onAction }) => {
  console.log("title :", title);
  console.log("description :", description);
  console.log("title :", actionLabel);
  console.log("title :", onAction);

  return (
    <div className="w-full flex items-center justify-center h-[calc(100vh-5rem)]">
      <div className="flex flex-col items-center justify-center gap-2">
        {" "}
        <h2 className="text-white text-2xl">{title + " !" || "No data yet"}</h2>
        <p className="text-lg text-gray-400">{description}</p>
        {actionLabel && (
          <button
            className="bg-amber-400 inline w-25 rounded-md p-2 text-lg hover:bg-amber-500 font-semibold text-white"
            onClick={onAction}
          >
            <a href="">{actionLabel}</a>
          </button>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default EmptyState;
