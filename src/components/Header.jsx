import { Plus } from "lucide-react";
import useTaskStore from "../store/useTaskStore";
import LogoWeb from '/logoWeb.svg';

function Header({ onAddTask }) {
  const filter = useTaskStore((state) => state.filter);
  const setFilter = useTaskStore((state) => state.setFilter);

  return (
    <header className="bg-white/70 backdrop-blur-md border-b border-gray-200 px-6 h-20 flex items-center justify-between fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center gap-2">
        <img src={LogoWeb} alt="NextStep" className="w-12 h-12" />
        <div>
          <h1 className="text-[25px] font-bold text-gray-900">NextStep</h1>
          <p className="text-xs text-gray-400">Your intelligent task manager</p>
        </div>
      </div>

      <div className="flex  items-center gap-0.2">
        <div className="flex items-center gap-0.3 bg-gray-200 px-1 py-1 rounded-lg">
          {["all", "active", "completed"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-5 py-2 rounded-lg text-black text-bold text-sm font-medium capitalize
              ${
                filter === item
                  ? "bg-white text-emerald-500 border border-white rounded-lg shadow"
                  : "text-gray-400"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <button onClick={onAddTask} className="bg-emerald-300 items-center text-black px-7 py-3 gap-1 flex rounded-[10px] text-[15px] font-medium ml-2 shadow">
          <Plus size={17} color="#000000" />
          Add Task
        </button>
      </div>
    </header>
  );
}

export default Header;