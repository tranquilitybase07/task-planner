import React, { useState } from "react";
import API from "../services/api";

const AddTask: React.FC = () => {
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("low");
  const [urgency, setUrgency] = useState("low");
  const [duration, setDuration] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTask = {
      name: taskName,
      priority,
      urgency,
      duration: parseInt(duration, 10),
      is_completed: false,
      user: "ankushkumar",
    };

    API.post("tasks/", newTask)
      .then(() => {
        alert("Task added successfully!");
        setTaskName("");
        setPriority("low");
        setUrgency("low");
        setDuration("");
      })
      .catch((error) => {
        console.error("Error adding task:", error);
      });
  };

  return (
    <div className="p-6 bg-base-200 min-h-screen font-sans">
      <div className="card bg-base-100 shadow-lg p-8 max-w-lg mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-6">Add a New Task</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-secondary">Task Name</span>
            </label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="input input-bordered"
              placeholder="Enter your task"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-secondary">Priority</span>
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="select select-bordered"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-secondary">Urgency</span>
            </label>
            <select
              value={urgency}
              onChange={(e) => setUrgency(e.target.value)}
              className="select select-bordered"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-secondary">
                Duration (minutes)
              </span>
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="input input-bordered"
              placeholder="Enter duration"
            />
          </div>
          <button type="submit" className="btn btn-primary w-full mt-4">
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
