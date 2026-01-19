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
}

export function WorkoutCompletionModal({
  workoutTitle,
  workoutType,
  onSave,
  onCancel,
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
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              Workout Completed! 🎉
            </h2>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-gray-600 mt-1 text-sm">{workoutTitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Rest Suggestion */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-blue-900 mb-1">
                  Recovery Recommendation
                </h3>
                <p className="text-sm text-blue-800 mb-2">
                  {restSuggestion.message}
                </p>
                <div className="flex items-center gap-2 text-sm text-blue-700">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Next workout: {nextWorkoutDate.toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <p className="text-xs text-blue-600 mt-2 italic">
                  💡 {restSuggestion.tip}
                </p>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
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
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Actual Duration (optional)
            </label>
            <input
              type="text"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g., 45 min"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Notes */}
          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Notes (optional)
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="How did you feel? Any PRs? What could improve?"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
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