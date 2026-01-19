import { useState, useEffect } from "react";
import { Dumbbell, CircleDot, Bike } from "lucide-react";
import { WorkoutCard, Workout } from "@/app/components/WorkoutCard";
import { strengthWorkouts, runningWorkouts, cyclingWorkouts } from "@/app/data/workouts";
import { CompletedWorkout } from "@/app/components/CompletedWorkoutsPanel";
import { WorkoutCompletionModal } from "@/app/components/WorkoutCompletionModal";
import { WorkoutSessionTracker } from "@/app/components/WorkoutSessionTracker";
import { HamburgerMenu } from "@/app/components/HamburgerMenu";
import { HistoryView } from "@/app/components/HistoryView";
import { SettingsView } from "@/app/components/SettingsView";

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

export default function App() {
  const [currentView, setCurrentView] = useState<"training" | "history" | "settings">("training");
  const [activeTab, setActiveTab] = useState<"strength" | "running" | "cycling">("strength");
  const [completedWorkouts, setCompletedWorkouts] = useState<
    CompletedWorkout[]
  >([]);
  const [selectedWorkout, setSelectedWorkout] = useState<{
    workout: Workout;
    type: "strength" | "running" | "cycling";
  } | null>(null);
  const [workoutLogs, setWorkoutLogs] = useState<ExerciseLog[] | null>(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [language, setLanguage] = useState<string>("en");

  // Load data from localStorage on mount
  useEffect(() => {
    const savedWorkouts = localStorage.getItem("completedWorkouts");
    if (savedWorkouts) {
      setCompletedWorkouts(JSON.parse(savedWorkouts));
    }

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    }

    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem("completedWorkouts", JSON.stringify(completedWorkouts));
  }, [completedWorkouts]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const handleStartWorkout = (workout: Workout) => {
    setSelectedWorkout({ workout, type: activeTab });
  };

  const handleCompleteSession = (logs: ExerciseLog[]) => {
    setWorkoutLogs(logs);
    setShowCompletionModal(true);
  };

  const handleSaveWorkout = (data: {
    notes: string;
    rating: number;
    duration: string;
  }) => {
    if (!selectedWorkout) return;

    const newCompletedWorkout: CompletedWorkout = {
      workoutId: selectedWorkout.workout.id,
      workoutTitle: selectedWorkout.workout.title,
      workoutType: selectedWorkout.type,
      completedAt: new Date().toISOString(),
      notes: data.notes || undefined,
      performance: {
        rating: data.rating || undefined,
        duration: data.duration || undefined,
      },
      exerciseLogs: workoutLogs || undefined,
    };
    setCompletedWorkouts([...completedWorkouts, newCompletedWorkout]);
    setSelectedWorkout(null);
    setWorkoutLogs(null);
    setShowCompletionModal(false);
  };

  const handleCancelWorkout = () => {
    setSelectedWorkout(null);
    setWorkoutLogs(null);
    setShowCompletionModal(false);
  };

  const handleDeleteWorkout = (index: number) => {
    const newWorkouts = completedWorkouts.filter((_, i) => i !== index);
    setCompletedWorkouts(newWorkouts);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <HamburgerMenu currentView={currentView} onNavigate={setCurrentView} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Training View */}
        {currentView === "training" && (
          <>
            {/* Header */}
            <header className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Fitness Workout Hub
              </h1>
              <p className="text-gray-600">
                Choose your workout type and start training
              </p>
            </header>

            {/* Tabs */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex bg-white rounded-lg shadow-md p-1">
                <button
                  onClick={() => setActiveTab("strength")}
                  className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all ${
                    activeTab === "strength"
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Dumbbell className="w-5 h-5" />
                  Strength
                </button>
                <button
                  onClick={() => setActiveTab("running")}
                  className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all ${
                    activeTab === "running"
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <CircleDot className="w-5 h-5" />
                  Running
                </button>
                <button
                  onClick={() => setActiveTab("cycling")}
                  className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all ${
                    activeTab === "cycling"
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Bike className="w-5 h-5" />
                  Cycling
                </button>
              </div>
            </div>

            {/* Workout Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeTab === "strength" &&
                strengthWorkouts.map((workout) => (
                  <WorkoutCard
                    key={workout.id}
                    workout={workout}
                    onComplete={handleStartWorkout}
                  />
                ))}
              {activeTab === "running" &&
                runningWorkouts.map((workout) => (
                  <WorkoutCard
                    key={workout.id}
                    workout={workout}
                    onComplete={handleStartWorkout}
                  />
                ))}
              {activeTab === "cycling" &&
                cyclingWorkouts.map((workout) => (
                  <WorkoutCard
                    key={workout.id}
                    workout={workout}
                    onComplete={handleStartWorkout}
                  />
                ))}
            </div>
          </>
        )}

        {/* History View */}
        {currentView === "history" && (
          <HistoryView 
            completedWorkouts={completedWorkouts}
            onDeleteWorkout={handleDeleteWorkout}
          />
        )}

        {/* Settings View */}
        {currentView === "settings" && (
          <SettingsView
            theme={theme}
            language={language}
            onThemeChange={setTheme}
            onLanguageChange={setLanguage}
          />
        )}

        {/* Workout Session Tracker */}
        {selectedWorkout && !showCompletionModal && (
          <WorkoutSessionTracker
            workout={selectedWorkout.workout}
            onComplete={handleCompleteSession}
            onCancel={handleCancelWorkout}
          />
        )}

        {/* Workout Completion Modal */}
        {showCompletionModal && selectedWorkout && (
          <WorkoutCompletionModal
            workoutTitle={selectedWorkout.workout.title}
            workoutType={selectedWorkout.type}
            onSave={handleSaveWorkout}
            onCancel={handleCancelWorkout}
          />
        )}
      </div>
    </div>
  );
}