import React, { useState } from "react";
import API from "../services/api";

const ScheduleTasks: React.FC = () => {
  const [schedule, setSchedule] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateSchedule = () => {
    setError(null);
    setSchedule(null);

    API.post("schedule-tasks/")
      .then((response) => setSchedule(response.data.schedule))
      .catch((error) => {
        console.error("Error generating schedule:", error);
        setError(error.response?.data?.error || "Failed to generate schedule");
      });
  };

  return (
    <div className="p-6 bg-base-200 min-h-screen">
      <h1 className="text-4xl font-bold text-primary mb-8">
        AI Task Scheduler
      </h1>
      <button className="btn btn-primary mb-6" onClick={handleGenerateSchedule}>
        Generate Schedule
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {schedule && (
        <div className="bg-base-200 shadow-md p-4 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Generated Schedule</h2>
          <pre className="whitespace-pre-wrap">{schedule}</pre>
        </div>
      )}
    </div>
  );
};

export default ScheduleTasks;
