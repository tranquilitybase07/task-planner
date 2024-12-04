import React, { useEffect, useState } from "react";
import API from "../services/api";

interface TimeSlot {
  id: number;
  day_of_week: string;
  start_time: string;
  end_time: string;
}

const TimeSlots: React.FC = () => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const fetchTimeSlots = () => {
    API.get("time-slots/")
      .then((response) => setTimeSlots(response.data))
      .catch((error) => console.error("Error fetching time slots:", error));
  };

  const handleAddTimeSlot = (e: React.FormEvent) => {
    e.preventDefault();
    const newTimeSlot = {
      day_of_week: dayOfWeek,
      start_time: startTime,
      end_time: endTime,
    };
    API.post("time-slots/", newTimeSlot)
      .then(() => {
        fetchTimeSlots();
        setDayOfWeek("");
        setStartTime("");
        setEndTime("");
      })
      .catch((error) => console.error("Error adding time slot:", error));
  };

  const handleDeleteTimeSlot = (id: number) => {
    API.delete(`time-slots/${id}/`)
      .then(() => fetchTimeSlots())
      .catch((error) => console.error("Error deleting time slot:", error));
  };

  useEffect(() => {
    fetchTimeSlots();
  }, []);

  return (
    <div className="p-6 bg-base-200 min-h-screen">
      <h1 className="text-4xl font-bold text-primary mb-8">
        Manage Time Slots
      </h1>
      <form onSubmit={handleAddTimeSlot} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Day of Week</span>
          </label>
          <select
            value={dayOfWeek}
            onChange={(e) => setDayOfWeek(e.target.value)}
            className="select select-bordered"
          >
            <option value="" disabled>
              Select a day
            </option>
            {daysOfWeek.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Start Time</span>
          </label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">End Time</span>
          </label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="input input-bordered"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-4"
          disabled={!dayOfWeek || !startTime || !endTime}
        >
          Add Time Slot
        </button>
      </form>

      <h2 className="text-2xl font-bold mt-8">Existing Time Slots</h2>
      <ul className="mt-4">
        {timeSlots.map((slot) => (
          <li
            key={slot.id}
            className="flex justify-between items-center bg-emerald-800 text-white shadow-md p-4 rounded-lg mb-2"
          >
            <span>
              {slot.day_of_week}: {slot.start_time} - {slot.end_time}
            </span>
            <button
              className="btn btn-danger text-white"
              onClick={() => handleDeleteTimeSlot(slot.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimeSlots;
