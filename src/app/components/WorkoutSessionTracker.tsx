import { useState } from "react";
import { X, Check, AlertCircle, Plus, Minus, Minimize2, XCircle, Maximize2 } from "lucide-react";
import { Workout } from "@/app/components/WorkoutCard";

interface ExerciseLog {
  name: string;
  sets: {
    setNumber: number;
    reps: number;
    weight: number;
    completed: boolean;
    failed: boolean;
  }[];
  notes?: string;
}

interface WorkoutSessionTrackerProps {
  workout: Workout;
  onComplete: (logs: ExerciseLog[]) => void;
  onCancel: () => void;
  onMinimize: () => void;
  onRestore?: () => void;
  isMinimized?: boolean;
  theme?: "light" | "dark";
}

export function WorkoutSessionTracker({
  workout,
  onComplete,
  onCancel,
  onMinimize,
  onRestore,
  isMinimized = false,
  theme = "light",
}: WorkoutSessionTrackerProps) {
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);
  const [exerciseLogs, setExerciseLogs] = useState<ExerciseLog[]>(
    workout.exercises.map((ex) => ({
      name: ex.name,
      sets: Array.from({ length: ex.sets || 3 }, (_, i) => ({
        setNumber: i + 1,
        reps: typeof ex.reps === "string" ? parseInt(ex.reps.split("-")[0]) : 0,
        weight: 0,
        completed: false,
        failed: false,
      })),
      notes: "",
    }))
  );

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

  const currentExercise = exerciseLogs[currentExerciseIndex];
  const isLastExercise = currentExerciseIndex === exerciseLogs.length - 1;

  const updateSet = (
    setIndex: number,
    field: "reps" | "weight" | "completed" | "failed",
    value: number | boolean
  ) => {
    const newLogs = [...exerciseLogs];
    if (field === "completed" && value === true) {
      newLogs[currentExerciseIndex].sets[setIndex].failed = false;
    } else if (field === "failed" && value === true) {
      newLogs[currentExerciseIndex].sets[setIndex].completed = false;
    }
    newLogs[currentExerciseIndex].sets[setIndex][field] = value as never;
    setExerciseLogs(newLogs);
  };

  const addSet = () => {
    const newLogs = [...exerciseLogs];
    const lastSet = currentExercise.sets[currentExercise.sets.length - 1];
    newLogs[currentExerciseIndex].sets.push({
      setNumber: currentExercise.sets.length + 1,
      reps: lastSet?.reps || 0,
      weight: lastSet?.weight || 0,
      completed: false,
      failed: false,
    });
    setExerciseLogs(newLogs);
  };

  const removeSet = () => {
    if (currentExercise.sets.length > 1) {
      const newLogs = [...exerciseLogs];
      newLogs[currentExerciseIndex].sets.pop();
      setExerciseLogs(newLogs);
    }
  };

  const handleNext = () => {
    if (isLastExercise) {
      onComplete(exerciseLogs);
    } else {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
    }
  };

  const completedSets = currentExercise.sets.filter((s) => s.completed).length;
  const totalSets = currentExercise.sets.length;

  // Calculate total progress
  const totalCompletedSets = exerciseLogs.reduce(
    (acc, log) => acc + log.sets.filter((s) => s.completed).length,
    0
  );
  const totalAllSets = exerciseLogs.reduce((acc, log) => acc + log.sets.length, 0);

  // Minimized view
  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={onRestore}
          className="bg-blue-600 text-white px-6 py-4 rounded-lg shadow-xl hover:bg-blue-700 transition-all hover:scale-105"
        >
          <div className="flex items-center gap-3">
            <Maximize2 className="w-5 h-5" />
            <div className="text-left">
              <div className="font-semibold">{workout.title}</div>
              <div className="text-xs text-blue-100">
                {totalCompletedSets}/{totalAllSets} sets • Exercise {currentExerciseIndex + 1}/{exerciseLogs.length}
              </div>
            </div>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className={`rounded-lg shadow-xl max-w-2xl w-full my-8 ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      }`}>
        {/* Header */}
        <div className={`p-6 border-b ${
          theme === "dark" ? "border-gray-700" : "border-gray-200"
        }`}>
          <div className="flex items-center justify-between mb-2">
            <h2 className={`text-2xl font-bold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}>{workout.title}</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={onMinimize}
                className={`p-2 rounded-lg transition-colors ${
                  theme === "dark"
                    ? "text-gray-400 hover:text-blue-400 hover:bg-blue-900/20"
                    : "text-gray-400 hover:text-blue-600 hover:bg-blue-50"
                }`}
                title="Minimize and continue in background"
              >
                <Minimize2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowCloseConfirm(true)}
                className={`p-2 rounded-lg transition-colors ${
                  theme === "dark"
                    ? "text-gray-400 hover:text-red-400 hover:bg-red-900/20"
                    : "text-gray-400 hover:text-red-600 hover:bg-red-50"
                }`}
                title="Cancel workout"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className={`flex items-center gap-2 text-sm ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}>
            <span>
              Exercise {currentExerciseIndex + 1} of {exerciseLogs.length}
            </span>
            <span>•</span>
            <span>
              {completedSets}/{totalSets} sets completed
            </span>
          </div>
          {/* Progress bar */}
          <div className={`mt-3 h-2 rounded-full overflow-hidden ${
            theme === "dark" ? "bg-gray-700" : "bg-gray-200"
          }`}>
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{
                width: `${((currentExerciseIndex + completedSets / totalSets) / exerciseLogs.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Exercise Details */}
        <div className="p-6">
          <h3 className={`text-xl font-semibold mb-4 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            {currentExercise.name}
          </h3>

          {/* Set Controls */}
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={removeSet}
              disabled={currentExercise.sets.length <= 1}
              className={`p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed ${
                theme === "dark"
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className={`text-sm font-medium ${
              theme === "dark" ? "text-gray-200" : "text-gray-700"
            }`}>
              {currentExercise.sets.length} Sets
            </span>
            <button
              onClick={addSet}
              className={`p-2 rounded-lg ${
                theme === "dark"
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Sets Table */}
          <div className="space-y-3 mb-6">
            {currentExercise.sets.map((set, index) => (
              <div
                key={index}
                className={`border-2 rounded-lg p-4 transition-colors ${
                  set.completed
                    ? theme === "dark"
                      ? "border-green-500 bg-green-900/20"
                      : "border-green-500 bg-green-50"
                    : set.failed
                    ? theme === "dark"
                      ? "border-red-500 bg-red-900/20"
                      : "border-red-500 bg-red-50"
                    : theme === "dark"
                    ? "border-gray-600 bg-gray-700"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex items-center gap-4 mb-3">
                  <span className={`font-semibold w-16 ${
                    theme === "dark" ? "text-gray-200" : "text-gray-700"
                  }`}>
                    Set {set.setNumber}
                  </span>
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs mb-1 ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}>
                        Reps
                      </label>
                      <input
                        type="number"
                        value={set.reps}
                        onChange={(e) =>
                          updateSet(index, "reps", parseInt(e.target.value) || 0)
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          theme === "dark"
                            ? "bg-gray-600 border-gray-500 text-white"
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                        min="0"
                      />
                    </div>
                    <div>
                      <label className={`block text-xs mb-1 ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}>
                        Weight (lbs)
                      </label>
                      <input
                        type="number"
                        value={set.weight}
                        onChange={(e) =>
                          updateSet(index, "weight", parseInt(e.target.value) || 0)
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          theme === "dark"
                            ? "bg-gray-600 border-gray-500 text-white"
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                        min="0"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateSet(index, "completed", !set.completed)}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors ${
                      set.completed
                        ? "bg-green-600 text-white"
                        : theme === "dark"
                        ? "bg-gray-600 text-gray-200 hover:bg-gray-500"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    Complete
                  </button>
                  <button
                    onClick={() => updateSet(index, "failed", !set.failed)}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors ${
                      set.failed
                        ? "bg-red-600 text-white"
                        : theme === "dark"
                        ? "bg-gray-600 text-gray-200 hover:bg-gray-500"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <AlertCircle className="w-4 h-4" />
                    Failed
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Notes */}
          <div className="mb-6">
            <label className={`block text-sm font-medium mb-2 ${
              theme === "dark" ? "text-gray-200" : "text-gray-700"
            }`}>
              Exercise Notes (optional)
            </label>
            <textarea
              value={currentExercise.notes}
              onChange={(e) => {
                const newLogs = [...exerciseLogs];
                newLogs[currentExerciseIndex].notes = e.target.value;
                setExerciseLogs(newLogs);
              }}
              placeholder="How did this exercise feel?"
              rows={2}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3">
            {currentExerciseIndex > 0 && (
              <button
                onClick={handlePrevious}
                className={`px-6 py-3 border rounded-lg font-medium transition-colors ${
                  theme === "dark"
                    ? "border-gray-600 text-gray-200 hover:bg-gray-700"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                Previous
              </button>
            )}
            <button
              onClick={handleNext}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
            >
              {isLastExercise ? "Complete Workout" : "Next Exercise"}
            </button>
          </div>
        </div>
      </div>

      {/* Close Confirmation Modal */}
      {showCloseConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-60 p-4">
          <div className={`rounded-lg shadow-xl max-w-md w-full p-6 ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}>
            <div className="flex items-start gap-4 mb-6">
              <div className={`p-3 rounded-full ${
                theme === "dark" ? "bg-red-900/40" : "bg-red-100"
              }`}>
                <XCircle className={`w-6 h-6 ${
                  theme === "dark" ? "text-red-400" : "text-red-600"
                }`} />
              </div>
              <div>
                <h3 className={`text-xl font-bold mb-2 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>
                  Cancel Workout?
                </h3>
                <p className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
                  Your progress will be lost. Are you sure you want to cancel this workout session?
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCloseConfirm(false)}
                className={`flex-1 px-4 py-3 border rounded-lg font-medium transition-colors ${
                  theme === "dark"
                    ? "border-gray-600 text-gray-200 hover:bg-gray-700"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                Continue Workout
              </button>
              <button
                onClick={() => {
                  setShowCloseConfirm(false);
                  onCancel();
                }}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}