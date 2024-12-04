import React, { useEffect, useState } from "react";
import API from "../services/api";

interface Task {
  id: number;
  name: string;
  priority: string;
  urgency: string;
  duration: number;
  is_completed: boolean;
}

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTab, setActiveTab] = useState<"todo" | "completed">("todo"); // Default tab is 'todo'

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    API.get("tasks/")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  };

  const handleMarkComplete = (taskId: number) => {
    API.patch(`tasks/${taskId}/`, { is_completed: true })
      .then(() => fetchTasks())
      .catch((error) => {
        console.error("Error marking task as complete:", error);
      });
  };

  const filteredTasks = tasks.filter((task) =>
    activeTab === "todo" ? !task.is_completed : task.is_completed
  );

  return (
    <div className="p-6 bg-base-200 min-h-screen">
      <h1 className="text-5xl font-bold text-primary mb-10 text-center">
        Dashboard
      </h1>

      {/* Tabs */}
      <div className="flex justify-center mb-6">
        <button
          className={`btn ${
            activeTab === "todo" ? "btn-primary" : "btn-outline"
          }`}
          onClick={() => setActiveTab("todo")}
        >
          Todo
        </button>
        <button
          className={`btn ml-4 ${
            activeTab === "completed" ? "btn-primary" : "btn-outline"
          }`}
          onClick={() => setActiveTab("completed")}
        >
          Completed
        </button>
      </div>

      {/* Task List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTasks.map((task) => (
          <div key={task.id} className="card bg-emerald-800 shadow-lg">
            <div className="card-body text-white">
              <h2 className="card-title">{task.name}</h2>
              <p>Priority: {task.priority}</p>
              <p>Urgency: {task.urgency}</p>
              <p>Duration: {task.duration} minutes</p>
              {activeTab === "todo" && (
                <button
                  className="btn btn-success text-white mt-4"
                  onClick={() => handleMarkComplete(task.id)}
                >
                  Mark as Complete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <p className="text-center mt-10 text-gray-500">
          No tasks found in this category.
        </p>
      )}
    </div>
  );
};

export default Dashboard;
