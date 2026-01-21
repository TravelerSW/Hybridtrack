import { useState } from "react";
import { X, Plus, Trash2, Dumbbell, CircleDot, Bike } from "lucide-react";
import { Workout, Exercise } from "@/app/components/WorkoutCard";

interface CreateWorkoutModalProps {
  onSave: (workout: Workout, type: "strength" | "running" | "cycling") => void;
  onCancel: () => void;
  theme?: "light" | "dark";
}

export function CreateWorkoutModal({
  onSave,
  onCancel,
  theme = "light",
}: CreateWorkoutModalProps) {
  const [workoutType, setWorkoutType] = useState<"strength" | "running" | "cycling">("strength");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [difficulty, setDifficulty] = useState<"Beginner" | "Intermediate" | "Advanced">("Beginner");
  const [exercises, setExercises] = useState<Exercise[]>([
    { name: "", sets: 3, reps: "8-12", rest: "60s" },
  ]);

  const addExercise = () => {
    if (workoutType === "strength") {
      setExercises([...exercises, { name: "", sets: 3, reps: "8-12", rest: "60s" }]);
    } else {
      setExercises([...exercises, { name: "", duration: "5 min", rest: "1 min" }]);
    }
  };

  const removeExercise = (index: number) => {
    if (exercises.length > 1) {
      setExercises(exercises.filter((_, i) => i !== index));
    }
  };

  const updateExercise = (index: number, field: keyof Exercise, value: string | number) => {
    const newExercises = [...exercises];
    newExercises[index] = { ...newExercises[index], [field]: value };
    setExercises(newExercises);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !duration.trim() || exercises.some(ex => !ex.name.trim())) {
      alert("Please fill in all required fields");
      return;
    }

    const newWorkout: Workout = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      description: description.trim() || "Custom workout",
      duration,
      difficulty,
      exercises: exercises.map(ex => ({
        ...ex,
        name: ex.name.trim(),
      })),
    };

    onSave(newWorkout, workoutType);
  };

  const handleWorkoutTypeChange = (type: "strength" | "running" | "cycling") => {
    setWorkoutType(type);
    // Reset exercises with appropriate defaults for the workout type
    if (type === "strength") {
      setExercises([{ name: "", sets: 3, reps: "8-12", rest: "60s" }]);
    } else {
      setExercises([{ name: "", duration: "5 min", rest: "1 min" }]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className={`rounded-lg shadow-xl max-w-3xl w-full my-8 ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      }`}>
        {/* Header */}
        <div className={`p-6 border-b ${
          theme === "dark" ? "border-gray-700" : "border-gray-200"
        }`}>
          <div className="flex items-center justify-between">
            <h2 className={`text-2xl font-bold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}>
              Create Custom Workout
            </h2>
            <button
              onClick={onCancel}
              className={theme === "dark" 
                ? "text-gray-400 hover:text-gray-200" 
                : "text-gray-400 hover:text-gray-600"
              }
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Workout Type */}
          <div>
            <label className={`block text-sm font-medium mb-3 ${
              theme === "dark" ? "text-gray-200" : "text-gray-700"
            }`}>
              Workout Type *
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleWorkoutTypeChange("strength")}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                  workoutType === "strength"
                    ? "bg-blue-600 text-white"
                    : theme === "dark"
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Dumbbell className="w-5 h-5" />
                Strength
              </button>
              <button
                type="button"
                onClick={() => handleWorkoutTypeChange("running")}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                  workoutType === "running"
                    ? "bg-blue-600 text-white"
                    : theme === "dark"
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <CircleDot className="w-5 h-5" />
                Running
              </button>
              <button
                type="button"
                onClick={() => handleWorkoutTypeChange("cycling")}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                  workoutType === "cycling"
                    ? "bg-blue-600 text-white"
                    : theme === "dark"
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Bike className="w-5 h-5" />
                Cycling
              </button>
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}>
                Workout Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., My Custom Upper Body"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                required
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}>
                Estimated Duration *
              </label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g., 45 min"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              theme === "dark" ? "text-gray-200" : "text-gray-700"
            }`}>
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of your workout"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>

          {/* Difficulty */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              theme === "dark" ? "text-gray-200" : "text-gray-700"
            }`}>
              Difficulty Level *
            </label>
            <div className="flex gap-3">
              {(["Beginner", "Intermediate", "Advanced"] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setDifficulty(level)}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                    difficulty === level
                      ? level === "Beginner"
                        ? "bg-green-600 text-white"
                        : level === "Intermediate"
                        ? "bg-yellow-600 text-white"
                        : "bg-red-600 text-white"
                      : theme === "dark"
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Exercises */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className={`block text-sm font-medium ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}>
                Exercises *
              </label>
              <button
                type="button"
                onClick={addExercise}
                className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Exercise
              </button>
            </div>

            <div className="space-y-4">
              {exercises.map((exercise, index) => (
                <div
                  key={index}
                  className={`border rounded-lg p-4 ${
                    theme === "dark" ? "border-gray-700 bg-gray-700/50" : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span className={`font-semibold mt-2 ${
                      theme === "dark" ? "text-gray-200" : "text-gray-700"
                    }`}>
                      {index + 1}.
                    </span>
                    <div className="flex-1 space-y-3">
                      <input
                        type="text"
                        value={exercise.name}
                        onChange={(e) => updateExercise(index, "name", e.target.value)}
                        placeholder="Exercise name"
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          theme === "dark"
                            ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                        required
                      />
                      <div className="grid grid-cols-3 gap-3">
                        {workoutType === "strength" ? (
                          <>
                            <div>
                              <label className={`block text-xs mb-1 ${
                                theme === "dark" ? "text-gray-400" : "text-gray-600"
                              }`}>
                                Sets
                              </label>
                              <input
                                type="number"
                                value={exercise.sets || ""}
                                onChange={(e) => updateExercise(index, "sets", parseInt(e.target.value) || 3)}
                                className={`w-full px-2 py-1 border rounded text-sm ${
                                  theme === "dark"
                                    ? "bg-gray-600 border-gray-500 text-white"
                                    : "bg-white border-gray-300 text-gray-900"
                                }`}
                                min="1"
                              />
                            </div>
                            <div>
                              <label className={`block text-xs mb-1 ${
                                theme === "dark" ? "text-gray-400" : "text-gray-600"
                              }`}>
                                Reps
                              </label>
                              <input
                                type="text"
                                value={exercise.reps || ""}
                                onChange={(e) => updateExercise(index, "reps", e.target.value)}
                                placeholder="8-12"
                                className={`w-full px-2 py-1 border rounded text-sm ${
                                  theme === "dark"
                                    ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                                    : "bg-white border-gray-300 text-gray-900"
                                }`}
                              />
                            </div>
                          </>
                        ) : (
                          <div>
                            <label className={`block text-xs mb-1 ${
                              theme === "dark" ? "text-gray-400" : "text-gray-600"
                            }`}>
                              Duration
                            </label>
                            <input
                              type="text"
                              value={exercise.duration || ""}
                              onChange={(e) => updateExercise(index, "duration", e.target.value)}
                              placeholder="5 min"
                              className={`w-full px-2 py-1 border rounded text-sm ${
                                theme === "dark"
                                  ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                                  : "bg-white border-gray-300 text-gray-900"
                              }`}
                            />
                          </div>
                        )}
                        <div>
                          <label className={`block text-xs mb-1 ${
                            theme === "dark" ? "text-gray-400" : "text-gray-600"
                          }`}>
                            Rest
                          </label>
                          <input
                            type="text"
                            value={exercise.rest || ""}
                            onChange={(e) => updateExercise(index, "rest", e.target.value)}
                            placeholder="60s"
                            className={`w-full px-2 py-1 border rounded text-sm ${
                              theme === "dark"
                                ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                                : "bg-white border-gray-300 text-gray-900"
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeExercise(index)}
                      disabled={exercises.length === 1}
                      className={`p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                        theme === "dark"
                          ? "text-gray-400 hover:text-red-400 hover:bg-red-900/20"
                          : "text-gray-400 hover:text-red-600 hover:bg-red-50"
                      }`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className={`flex-1 px-6 py-3 border rounded-lg font-medium transition-colors ${
                theme === "dark"
                  ? "border-gray-600 text-gray-200 hover:bg-gray-700"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
            >
              Create Workout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
