import { Dumbbell, Timer, Repeat } from "lucide-react"; // eslint-disable-line import/no-unresolved

export interface Exercise {
  name: string;
  sets?: number;
  reps?: string;
  duration?: string;
  rest?: string;
}

export interface Workout {
  id: string;
  title: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  exercises: Exercise[];
  description: string;
}

interface WorkoutCardProps {
  workout: Workout;
  onComplete?: (workout: Workout) => void;
  theme?: "light" | "dark";
}

export function WorkoutCard({ workout, onComplete, theme = "light" }: WorkoutCardProps) {
  const difficultyColors = {
    Beginner: theme === "dark" 
      ? "bg-green-900/40 text-green-300" 
      : "bg-green-100 text-green-800",
    Intermediate: theme === "dark"
      ? "bg-yellow-900/40 text-yellow-300"
      : "bg-yellow-100 text-yellow-800",
    Advanced: theme === "dark"
      ? "bg-red-900/40 text-red-300"
      : "bg-red-100 text-red-800",
  };

  return (
    <div className={`rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow ${
      theme === "dark" ? "bg-gray-800" : "bg-white"
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className={`text-xl font-semibold mb-2 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>{workout.title}</h3>
          <p className={`text-sm mb-3 ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}>{workout.description}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            difficultyColors[workout.difficulty]
          }`}
        >
          {workout.difficulty}
        </span>
      </div>

      <div className={`flex items-center gap-4 mb-4 text-sm ${
        theme === "dark" ? "text-gray-300" : "text-gray-600"
      }`}>
        <div className="flex items-center gap-1">
          <Timer className="w-4 h-4" />
          <span>{workout.duration}</span>
        </div>
        <div className="flex items-center gap-1">
          <Dumbbell className="w-4 h-4" />
          <span>{workout.exercises.length} exercises</span>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className={`font-medium text-sm ${
          theme === "dark" ? "text-gray-200" : "text-gray-700"
        }`}>Exercises:</h4>
        {workout.exercises.map((exercise, index) => (
          <div
            key={index}
            className={`flex items-start justify-between p-3 rounded-md ${
              theme === "dark" ? "bg-gray-700" : "bg-gray-50"
            }`}
          >
            <div className="flex items-start gap-3">
              <span className={`font-medium text-sm min-w-[20px] ${
                theme === "dark" ? "text-gray-400" : "text-gray-400"
              }`}>
                {index + 1}.
              </span>
              <div>
                <p className={`font-medium text-sm ${
                  theme === "dark" ? "text-gray-100" : "text-gray-900"
                }`}>{exercise.name}</p>
                {exercise.rest && (
                  <p className={`text-xs mt-1 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}>
                    Rest: {exercise.rest}
                  </p>
                )}
              </div>
            </div>
            <div className={`flex items-center gap-2 text-sm ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}>
              {exercise.sets && exercise.reps && (
                <div className="flex items-center gap-1">
                  <Repeat className="w-4 h-4" />
                  <span>
                    {exercise.sets} × {exercise.reps}
                  </span>
                </div>
              )}
              {exercise.duration && (
                <div className="flex items-center gap-1">
                  <Timer className="w-4 h-4" />
                  <span>{exercise.duration}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
        onClick={() => onComplete?.(workout)}
      >
        Start Workout
      </button>
    </div>
  );
}