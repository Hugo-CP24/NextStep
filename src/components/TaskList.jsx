import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, List, GripVertical, CheckCircle2, Circle, Flame, Zap, Battery, Calendar } from "lucide-react";
import useTaskStore from "../store/useTaskStore";

function TaskList() {
  const tasks = useTaskStore((state) => state.tasks);
  const toggleTask = useTaskStore((state) => state.toggleTask);
  const filter = useTaskStore((state) => state.filter);
  const [view, setView] = useState("grid");

  const filteredTasks = tasks.filter((t) => {
    if (filter === "active") return !t.done;
    if (filter === "completed") return t.done;
    return true;
  });

  const nextStepId = tasks.find((t) => !t.done && t.priority === "high")?.id
    || tasks.find((t) => !t.done)?.id;

  const energyInfo = (energy) => {
    if (energy === "high") return { label: "High Energy", color: "text-orange-400", bg: "bg-orange-50", icon: <Flame size={12} className="text-orange-400" /> };
    if (energy === "medium") return { label: "Medium Energy", color: "text-yellow-500", bg: "bg-yellow-50", icon: <Zap size={12} className="text-yellow-500" /> };
    return { label: "Low Energy", color: "text-indigo-400", bg: "bg-indigo-50", icon: <Battery size={12} className="text-indigo-400" /> };
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-semibold text-[20px] text-gray-900">Your Tasks</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setView("list")}
            className={`p-1.5 rounded-lg border ${view === "list" ? "border-emerald-500 bg-emerald-50" : "border-gray-200"}`}
          >
            <List size={18} className={view === "list" ? "text-emerald-500" : "text-gray-400"} />
          </button>
          <button
            onClick={() => setView("grid")}
            className={`p-1.5 rounded-lg border ${view === "grid" ? "border-emerald-500 bg-emerald-50" : "border-gray-200"}`}
          >
            <LayoutGrid size={18} className={view === "grid" ? "text-emerald-500" : "text-gray-400"} />
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className={`grid gap-3 ${view === "grid" ? "grid-cols-2" : "grid-cols-1"}`}>
        <AnimatePresence>
          {filteredTasks.map((task, index) => {
            const isNext = task.id === nextStepId;
            const energy = energyInfo(task.energy);
            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
                className={`relative p-4 rounded-xl border ${isNext ? "border-emerald-500 border-2" : "border-gray-200"}`}
              >
                {/* Badge Next Step */}
                {isNext && (
                  <div className="absolute -top-3 left-3 bg-emerald-500 text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Zap size={9} /> Next Step
                  </div>
                )}

                <div className="flex gap-2 items-start">
                  <GripVertical size={16} className="text-gray-300 mt-1 flex-shrink-0" />

                  <button onClick={() => toggleTask(task.id)} className="mt-0.5 flex-shrink-0">
                    {task.done
                      ? <CheckCircle2 size={20} className="text-emerald-500" />
                      : <Circle size={20} className="text-gray-300" />
                    }
                  </button>

                  <div className="flex-1 min-w-0">
                    <p className={`font-medium text-sm ${task.done ? "line-through text-gray-400" : "text-gray-900"}`}>
                      {task.title}
                    </p>
                    {task.description && (
                      <p className="text-xs text-gray-400 mt-0.5 truncate">{task.description}</p>
                    )}

                    <div className="flex flex-wrap gap-1.5 mt-2 items-center">
                      <span className={`flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${energy.bg} ${energy.color}`}>
                        {energy.icon} {energy.label}
                      </span>
                      {task.date && (
                        <span className="flex items-center gap-1 text-[10px] text-gray-400">
                          <Calendar size={10} /> {task.date}
                        </span>
                      )}
                      {task.tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-medium text-violet-500 bg-violet-50 px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default TaskList;