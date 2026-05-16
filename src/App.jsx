import { useState } from "react";
import Header from "./components/Header";
import ProgressCard from "./components/ProgressCard";
import QuickStats from "./components/QuickStats";
import TaskList from "./components/TaskList";
import AddTaskModal from "./components/AddTaskModal";

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAddTask={() => setShowModal(true)} />
      <div className="max-w-4xl mx-auto p-6 flex flex-col gap-4 pt-24">
        <ProgressCard />
        <QuickStats />
        <TaskList />
      </div>
      {showModal && <AddTaskModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default App;