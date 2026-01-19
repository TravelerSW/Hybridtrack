import { Dumbbell, Timer, Repeat } from "lucide-react";

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
}

export function WorkoutCard({ workout, onComplete }: WorkoutCardProps) {
  const difficultyColors = {
    Beginner: "bg-green-100 text-green-800",
    Intermediate: "bg-yellow-100 text-yellow-800",
    Advanced: "bg-red-100 text-red-800",
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">{workout.title}</h3>
          <p className="text-gray-600 text-sm mb-3">{workout.description}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            difficultyColors[workout.difficulty]
          }`}
        >
          {workout.difficulty}
        </span>
      </div>

      <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
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
        <h4 className="font-medium text-sm text-gray-700">Exercises:</h4>
        {workout.exercises.map((exercise, index) => (
          <div
            key={index}
            className="flex items-start justify-between bg-gray-50 p-3 rounded-md"
          >
            <div className="flex items-start gap-3">
              <span className="text-gray-400 font-medium text-sm min-w-[20px]">
                {index + 1}.
              </span>
              <div>
                <p className="font-medium text-sm">{exercise.name}</p>
                {exercise.rest && (
                  <p className="text-xs text-gray-500 mt-1">
                    Rest: {exercise.rest}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
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