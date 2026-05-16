import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Flame, TrendingUp } from "lucide-react";
import useTaskStore from "../store/useTaskStore";

function ProgressCard() {
  const tasks = useTaskStore((state) => state.tasks);
  const total = tasks.length;
  const done = tasks.filter((t) => t.done).length;
  const percentage = total > 0 ? Math.round((done / total) * 100) : 0;

  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const [animatedOffset, setAnimatedOffset] = useState(circumference);
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const [animatedDone, setAnimatedDone] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedOffset(offset);
    }, 300);

    let start = 0;
    const duration = 1200;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setAnimatedPercentage(Math.round(progress * percentage));
      setAnimatedDone(Math.round(progress * done));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow">
      <h2 className="font-semibold text-[20px] text-gray-900 mb-5">
        Today's Progress
      </h2>
      <div className="flex items-center gap-10">

        {/* Círculo de Progresso */}
        <div className="relative w-24 h-24">
          <svg width="96" height="96" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="48" cy="48" r="36" fill="none" stroke="#e5e7eb" strokeWidth="8" />
            <motion.circle
              cx="48"
              cy="48"
              r="36"
              fill="none"
              stroke="#6ee7b7"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="font-bold text-emerald-300 text-3xl leading-none">
              {animatedDone}
            </p>
            <p className="text-xs text-gray-400">of {total}</p>
          </div>
        </div>

        {/* Métricas */}
        <div className="flex flex-col gap-4">
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center">
              <CheckCircle2 size={23} className="text-emerald-500" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-3xl leading-none">
                {animatedPercentage}%
              </p>
              <p className="text-xs text-gray-400">Completed</p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center">
              <Flame size={23} className="text-orange-400" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-3xl leading-none">7</p>
              <p className="text-xs text-gray-400">Day Streak</p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center">
              <TrendingUp size={23} className="text-indigo-400" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-lg leading-none">73%</p>
              <p className="text-xs text-gray-400">Weekly Goal</p>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}

export default ProgressCard;