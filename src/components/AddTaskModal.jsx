import { useState } from "react";
import { X, Plus, Flame, Zap, Battery } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useTaskStore from "../store/useTaskStore";

function AddTaskModal({ onClose }) {
  const addTask = useTaskStore((state) => state.addTask);

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    energy: "medium",
    date: "",
    tags: [],
  });

  const [tagInput, setTagInput] = useState("");

  const handleAddTask = () => {
    if (!form.title.trim()) return;
    addTask(form);
    onClose();
  };

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    setForm({ ...form, tags: [...form.tags, tagInput.trim()] });
    setTagInput("");
  };

  return (
    <AnimatePresence>
      {/* Overlay */}
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Modal */}
        <motion.div
          className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-xl"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-[18px] text-gray-900">Quick Add Task</h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X size={18} className="text-gray-400" />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {/* Título */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">
                Task Title
              </label>
              <input
                autoFocus
                type="text"
                placeholder="What needs to be done?"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-emerald-400 outline-none text-sm text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* Descrição */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">
                Description (optional)
              </label>
              <textarea
                placeholder="Add more details..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm text-gray-900 placeholder-gray-400 bg-gray-50 resize-none"
              />
            </div>

            {/* Prioridade + Energia */}
            <div className="flex gap-4">
              {/* Prioridade */}
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700 block mb-1.5">
                  Priority
                </label>
                <div className="flex gap-2">
                  {["low", "medium", "high"].map((p) => (
                    <button
                      key={p}
                      onClick={() => setForm({ ...form, priority: p })}
                      className={`flex-1 py-2 rounded-xl border-2 text-xs font-medium capitalize transition-all
                        ${form.priority === p
                          ? "border-emerald-500 bg-emerald-50 text-emerald-600"
                          : "border-gray-200 text-gray-500"
                        }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Energia */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">
                  Energy Level
                </label>
                <div className="flex gap-2">
                  {[
                    { key: "low", icon: <Battery size={16} className="text-indigo-400" /> },
                    { key: "medium", icon: <Zap size={16} className="text-yellow-400" /> },
                    { key: "high", icon: <Flame size={16} className="text-orange-400" /> },
                  ].map(({ key, icon }) => (
                    <button
                      key={key}
                      onClick={() => setForm({ ...form, energy: key })}
                      className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all
                        ${form.energy === key
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-gray-200"
                        }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Data */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">
                Due Date (optional)
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm text-gray-500 bg-gray-50"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">
                Tags
              </label>
              {/* Tags adicionadas */}
              {form.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {form.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 text-[11px] font-medium text-violet-500 bg-violet-50 px-2.5 py-0.5 rounded-full"
                    >
                      {tag}
                      <button
                        onClick={() => setForm({ ...form, tags: form.tags.filter((t) => t !== tag) })}
                        className="text-violet-300 hover:text-violet-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a tag..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm placeholder-gray-400 bg-gray-50"
                />
                <button
                  onClick={handleAddTag}
                  className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0"
                >
                  <Plus size={18} color="white" />
                </button>
              </div>
            </div>

            {/* Botões */}
            <div className="flex gap-3 mt-2">
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                className="flex-1 py-3 rounded-xl bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 transition-colors"
              >
                Add Task
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default AddTaskModal;