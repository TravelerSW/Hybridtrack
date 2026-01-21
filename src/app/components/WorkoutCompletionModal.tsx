import { useState } from "react";
import { X, Star, Clock, Calendar } from "lucide-react";

interface WorkoutCompletionModalProps {
  workoutTitle: string;
  workoutType: "strength" | "running" | "cycling";
  onSave: (data: {
    notes: string;
    rating: number;
    duration: string;
  }) => void;
  onCancel: () => void;
  theme?: "light" | "dark";
}

export function WorkoutCompletionModal({
  workoutTitle,
  workoutType,
  onSave,
  onCancel,
  theme = "light",
}: WorkoutCompletionModalProps) {
  const [notes, setNotes] = useState("");
  const [rating, setRating] = useState(0);
  const [duration, setDuration] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);

  // Calculate rest suggestion based on workout type
  const getRestSuggestion = () => {
    switch (workoutType) {
      case "strength":
        return {
          days: 2,
          message: "Rest for 2 days before training the same muscle groups again.",
          tip: "Light cardio or stretching is fine during recovery.",
        };
      case "running":
        return {
          days: 1,
          message: "Rest for 1 day before your next running session.",
          tip: "Consider cross-training with cycling or strength work.",
        };
      case "cycling":
        return {
          days: 1,
          message: "Rest for 1 day before your next cycling session.",
          tip: "Running or strength training can complement your recovery.",
        };
    }
  };

  const restSuggestion = getRestSuggestion();
  const nextWorkoutDate = new Date();
  nextWorkoutDate.setDate(nextWorkoutDate.getDate() + restSuggestion.days);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ notes, rating, duration });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={`rounded-lg shadow-xl max-w-md w-full ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div
          className={`p-6 border-b ${
            theme === "dark" ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between">
            <h2
              className={`text-xl font-bold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Workout Completed! 🎉
            </h2>
            <button
              onClick={onCancel}
              className={
                theme === "dark"
                  ? "text-gray-400 hover:text-gray-200"
                  : "text-gray-400 hover:text-gray-600"
              }
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p
            className={`mt-1 text-sm ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {workoutTitle}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Rest Suggestion */}
          <div
            className={`border rounded-lg p-4 ${
              theme === "dark"
                ? "bg-blue-900/30 border-blue-800"
                : "bg-blue-50 border-blue-200"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`p-2 rounded-lg ${
                  theme === "dark" ? "bg-blue-800/50" : "bg-blue-100"
                }`}
              >
                <Clock
                  className={`w-5 h-5 ${
                    theme === "dark" ? "text-blue-400" : "text-blue-600"
                  }`}
                />
              </div>
              <div className="flex-1">
                <h3
                  className={`font-semibold mb-1 ${
                    theme === "dark" ? "text-blue-200" : "text-blue-900"
                  }`}
                >
                  Recovery Recommendation
                </h3>
                <p
                  className={`text-sm mb-2 ${
                    theme === "dark" ? "text-blue-300" : "text-blue-800"
                  }`}
                >
                  {restSuggestion.message}
                </p>
                <div
                  className={`flex items-center gap-2 text-sm ${
                    theme === "dark" ? "text-blue-300" : "text-blue-700"
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>
                    Next workout: {nextWorkoutDate.toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <p
                  className={`text-xs mt-2 italic ${
                    theme === "dark" ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  💡 {restSuggestion.tip}
                </p>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              How was your workout?
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      star <= (hoveredRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : theme === "dark"
                        ? "text-gray-600"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div>
            <label
              htmlFor="duration"
              className={`block text-sm font-medium mb-2 ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Actual Duration (optional)
            </label>
            <input
              type="text"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g., 45 min"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>

          {/* Notes */}
          <div>
            <label
              htmlFor="notes"
              className={`block text-sm font-medium mb-2 ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Notes (optional)
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="How did you feel? Any PRs? What could improve?"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className={`flex-1 px-4 py-2 border rounded-lg font-medium transition-colors ${
                theme === "dark"
                  ? "border-gray-600 text-gray-200 hover:bg-gray-700"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Skip
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}