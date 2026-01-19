import { CompletedWorkout } from "@/app/components/CompletedWorkoutsPanel";
import { CheckCircle, Calendar, Dumbbell, CircleDot, Bike, Trophy, Filter, CalendarDays, List, Star, Trash2 } from "lucide-react";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface HistoryViewProps {
  completedWorkouts: CompletedWorkout[];
  onDeleteWorkout: (index: number) => void;
}

export function HistoryView({ completedWorkouts, onDeleteWorkout }: HistoryViewProps) {
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [filter, setFilter] = useState<"all" | "strength" | "running" | "cycling">("all");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const filteredWorkouts = completedWorkouts.filter((workout) => {
    if (filter !== "all" && workout.workoutType !== filter) return false;
    if (selectedDate && viewMode === "calendar") {
      const workoutDate = new Date(workout.completedAt);
      return workoutDate.toDateString() === selectedDate.toDateString();
    }
    return true;
  });

  const sortedWorkouts = [...filteredWorkouts].sort(
    (a, b) =>
      new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
  );

  const strengthCount = completedWorkouts.filter(
    (w) => w.workoutType === "strength"
  ).length;
  const runningCount = completedWorkouts.filter(
    (w) => w.workoutType === "running"
  ).length;
  const cyclingCount = completedWorkouts.filter(
    (w) => w.workoutType === "cycling"
  ).length;

  // Get dates that have workouts for calendar highlighting
  const workoutDates = completedWorkouts.map(
    (w) => new Date(w.completedAt).toDateString()
  );
  const uniqueWorkoutDates = [...new Set(workoutDates)];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Workout History</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <Trophy className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-blue-600">
            {completedWorkouts.length}
          </p>
          <p className="text-sm text-gray-600">Total Workouts</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 text-center">
          <Dumbbell className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-purple-600">{strengthCount}</p>
          <p className="text-sm text-gray-600">Strength</p>
        </div>
        <div className="bg-orange-50 rounded-lg p-4 text-center">
          <CircleDot className="w-8 h-8 text-orange-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-orange-600">{runningCount}</p>
          <p className="text-sm text-gray-600">Running</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <Bike className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-green-600">{cyclingCount}</p>
          <p className="text-sm text-gray-600">Cycling</p>
        </div>
      </div>

      {/* View Mode Toggle & Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === "list"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <List className="w-4 h-4" />
              List
            </button>
            <button
              onClick={() => setViewMode("calendar")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === "calendar"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <CalendarDays className="w-4 h-4" />
              Calendar
            </button>
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-gray-500" />
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("strength")}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === "strength"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Strength
            </button>
            <button
              onClick={() => setFilter("running")}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === "running"
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Running
            </button>
            <button
              onClick={() => setFilter("cycling")}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === "cycling"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Cycling
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {viewMode === "calendar" ? (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Calendar */}
          <div className="flex-shrink-0 bg-white rounded-lg shadow-md p-4">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              modifiers={{
                hasWorkout: (date) =>
                  uniqueWorkoutDates.includes(date.toDateString()),
              }}
              modifiersStyles={{
                hasWorkout: {
                  fontWeight: "bold",
                  backgroundColor: "#dbeafe",
                  borderRadius: "50%",
                },
              }}
              className="border rounded-lg p-3"
            />
            {selectedDate && (
              <button
                onClick={() => setSelectedDate(undefined)}
                className="mt-2 w-full text-sm text-blue-600 hover:text-blue-700"
              >
                Clear selection
              </button>
            )}
          </div>

          {/* Workouts for selected date or all */}
          <div className="flex-1">
            {selectedDate && (
              <h3 className="font-medium text-gray-900 mb-4">
                Workouts on{" "}
                {selectedDate.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </h3>
            )}
            {sortedWorkouts.length === 0 ? (
              <div className="text-center py-12 text-gray-500 bg-white rounded-lg shadow-md">
                <CheckCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>No workouts found.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {sortedWorkouts.map((workout, index) => {
                  const originalIndex = completedWorkouts.findIndex(w => w === workout);
                  return (
                    <WorkoutItem key={index} workout={workout} onDelete={() => onDeleteWorkout(originalIndex)} />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ) : (
        // List View
        <>
          {sortedWorkouts.length === 0 ? (
            <div className="text-center py-12 text-gray-500 bg-white rounded-lg shadow-md">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p>No completed workouts yet.</p>
              <p className="text-sm mt-2">Start a workout to see it here!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {sortedWorkouts.map((workout, index) => {
                const originalIndex = completedWorkouts.findIndex(w => w === workout);
                return (
                  <WorkoutItem key={index} workout={workout} onDelete={() => onDeleteWorkout(originalIndex)} />
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function WorkoutItem({ workout, onDelete }: { workout: CompletedWorkout; onDelete: () => void }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const getWorkoutStyle = () => {
    switch (workout.workoutType) {
      case "strength":
        return {
          bgColor: "bg-purple-100",
          icon: <Dumbbell className="w-5 h-5 text-purple-600" />,
        };
      case "running":
        return {
          bgColor: "bg-orange-100",
          icon: <CircleDot className="w-5 h-5 text-orange-600" />,
        };
      case "cycling":
        return {
          bgColor: "bg-green-100",
          icon: <Bike className="w-5 h-5 text-green-600" />,
        };
    }
  };

  const style = getWorkoutStyle();

  return (
    <div className="bg-white p-4 rounded-lg shadow-md relative">
      {/* Delete Button */}
      <button
        onClick={() => setShowDeleteConfirm(true)}
        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        title="Delete workout"
      >
        <Trash2 className="w-5 h-5" />
      </button>

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="absolute inset-0 bg-white rounded-lg flex items-center justify-center p-4 z-10">
          <div className="text-center">
            <p className="text-gray-900 font-medium mb-4">
              Delete this workout?
            </p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDelete();
                  setShowDeleteConfirm(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-start justify-between mb-2 pr-8">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${style.bgColor}`}>
            {style.icon}
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{workout.workoutTitle}</h3>
            <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(workout.completedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        </div>
        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
      </div>

      {/* Performance Rating */}
      {workout.performance?.rating && (
        <div className="flex items-center gap-1 mb-2">
          <span className="text-sm text-gray-600">Rating:</span>
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < workout.performance!.rating!
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
      )}

      {/* Duration */}
      {workout.performance?.duration && (
        <div className="text-sm text-gray-600 mb-2">
          <span className="font-medium">Duration:</span> {workout.performance.duration}
        </div>
      )}

      {/* Notes */}
      {workout.notes && (
        <div className="mt-2 p-3 bg-gray-50 rounded border border-gray-200">
          <p className="text-sm text-gray-700">{workout.notes}</p>
        </div>
      )}
    </div>
  );
}