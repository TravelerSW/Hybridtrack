import { useState } from "react";
import { X, Check, AlertCircle, Plus, Minus } from "lucide-react";
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
}

export function WorkoutSessionTracker({
  workout,
  onComplete,
  onCancel,
}: WorkoutSessionTrackerProps) {
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full transition-colors">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{workout.title}</h2>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span>
              Exercise {currentExerciseIndex + 1} of {exerciseLogs.length}
            </span>
            <span>•</span>
            <span>
              {completedSets}/{totalSets} sets completed
            </span>
          </div>
          {/* Progress bar */}
          <div className="mt-3 h-2 bug-gray-200 dark:bg-array-700 rounded-full overflow-hidden">
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
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {currentExercise.name}
          </h3>

          {/* Set Controls */}
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={removeSet}
              disabled={currentExercise.sets.length <= 1}
              className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 dark:text-gray-300"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {currentExercise.sets.length} Sets
            </span>
            <button
              onClick={addSet}
              className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
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
                    ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                    : set.failed
                    ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                }`}
              >
                <div className="flex items-center gap-4 mb-3">
                  <span className="font-semibold text-gray-700 dark:text-gray-300 w-16">
                    Set {set.setNumber}
                  </span>
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                        Reps
                      </label>
                      <input
                        type="number"
                        value={set.reps}
                        onChange={(e) =>
                          updateSet(index, "reps", parseInt(e.target.value) || 0)
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                        Weight (lbs)
                      </label>
                      <input
                        type="number"
                        value={set.weight}
                        onChange={(e) =>
                          updateSet(index, "weight", parseInt(e.target.value) || 0)
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
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
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3">
            {currentExerciseIndex > 0 && (
              <button
                onClick={handlePrevious}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors"              >
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
    </div>
  );
}
