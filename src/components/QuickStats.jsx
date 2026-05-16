import { TrendingUp } from "lucide-react";
import useTaskStore from "../store/useTaskStore";

function QuickStats() {
  const tasks = useTaskStore((state) => state.tasks);

  const activeTasks = tasks.filter((t) => !t.done).length;
  const completedTasks = tasks.filter((t) => t.done).length;
  const highPriority = tasks.filter((t) => t.priority === "high" && !t.done).length;

  return (
    <div className="bg-gradient-to-br from-emerald-300 to-emerald-600 rounded-2xl p-6 shadow">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-semibold text-[20px] text-black">Quick Stats</h2>
        <TrendingUp size={22} color="black" />
      </div>

      <div className="flex flex-col">
        <h1 className="font-bold text-3xl text-black">{activeTasks}</h1>
        <p className="text-[14px] mb-4 text-black">Active Tasks</p>

        <h1 className="font-bold text-3xl text-black">{completedTasks}</h1>
        <p className="text-[14px] mb-4 text-black">Completed</p>

        <h1 className="font-bold text-3xl text-black">{highPriority}</h1>
        <p className="text-[14px] text-black">High Priority</p>
      </div>
    </div>
  );
}

export default QuickStats;