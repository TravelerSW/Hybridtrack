import { useState, useEffect } from "react";
import { Dumbbell, CircleDot, Bike, Plus } from "lucide-react";
import { WorkoutCard, Workout } from "@/app/components/WorkoutCard";
import { strengthWorkouts, runningWorkouts, cyclingWorkouts } from "@/app/data/workouts";
import { CompletedWorkout } from "@/app/components/CompletedWorkoutsPanel";
import { WorkoutCompletionModal } from "@/app/components/WorkoutCompletionModal";
import { WorkoutSessionTracker } from "@/app/components/WorkoutSessionTracker";
import { HamburgerMenu } from "@/app/components/HamburgerMenu";
import { HistoryView } from "@/app/components/HistoryView";
import { SettingsView } from "@/app/components/SettingsView";
import { CreateWorkoutModal } from "@/app/components/CreateWorkoutModal";

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
  const [isWorkoutMinimized, setIsWorkoutMinimized] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [language, setLanguage] = useState<string>("en");
  const [showCreateWorkout, setShowCreateWorkout] = useState(false);
  const [customWorkouts, setCustomWorkouts] = useState<{
    strength: Workout[];
    running: Workout[];
    cycling: Workout[];
  }>({
    strength: [],
    running: [],
    cycling: [],
  });

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

    const savedCustomWorkouts = localStorage.getItem("customWorkouts");
    if (savedCustomWorkouts) {
      setCustomWorkouts(JSON.parse(savedCustomWorkouts));
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

  useEffect(() => {
    localStorage.setItem("customWorkouts", JSON.stringify(customWorkouts));
  }, [customWorkouts]);

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
    setIsWorkoutMinimized(false);
  };

  const handleMinimizeWorkout = () => {
    setIsWorkoutMinimized(true);
  };

  const handleRestoreWorkout = () => {
    setIsWorkoutMinimized(false);
  };

  const handleDeleteWorkout = (index: number) => {
    const newWorkouts = completedWorkouts.filter((_, i) => i !== index);
    setCompletedWorkouts(newWorkouts);
  };

  const handleAddCustomWorkout = (workout: Workout, type: "strength" | "running" | "cycling") => {
    setCustomWorkouts((prev) => ({
      ...prev,
      [type]: [...prev[type], workout],
    }));
    setShowCreateWorkout(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      theme === "dark"
        ? "bg-gradient-to-br from-gray-900 to-gray-800"
        : "bg-gradient-to-br from-blue-50 to-indigo-100"
    }`}>
      <HamburgerMenu currentView={currentView} onNavigate={setCurrentView} theme={theme} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Training View */}
        {currentView === "training" && (
          <>
            {/* Header */}
            <header className="text-center mb-8">
              <h1 className={`text-4xl font-bold mb-2 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
                Workout Hub
              </h1>
              <p className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
                Choose your workout type and start training
              </p>
            </header>

            {/* Tabs */}
            <div className="flex justify-center mb-8">
              <div className={`inline-flex rounded-lg shadow-md p-1 ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              }`}>
                <button
                  onClick={() => setActiveTab("strength")}
                  className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all ${
                    activeTab === "strength"
                      ? "bg-blue-600 text-white"
                      : theme === "dark"
                      ? "text-gray-300 hover:bg-gray-700"
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
                      : theme === "dark"
                      ? "text-gray-300 hover:bg-gray-700"
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
                      : theme === "dark"
                      ? "text-gray-300 hover:bg-gray-700"
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
                [...strengthWorkouts, ...customWorkouts.strength].map((workout) => (
                  <WorkoutCard
                    key={workout.id}
                    workout={workout}
                    onComplete={handleStartWorkout}
                    theme={theme}
                  />
                ))}
              {activeTab === "running" &&
                [...runningWorkouts, ...customWorkouts.running].map((workout) => (
                  <WorkoutCard
                    key={workout.id}
                    workout={workout}
                    onComplete={handleStartWorkout}
                    theme={theme}
                  />
                ))}
              {activeTab === "cycling" &&
                [...cyclingWorkouts, ...customWorkouts.cycling].map((workout) => (
                  <WorkoutCard
                    key={workout.id}
                    workout={workout}
                    onComplete={handleStartWorkout}
                    theme={theme}
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
            theme={theme}
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
            onMinimize={handleMinimizeWorkout}
            onRestore={handleRestoreWorkout}
            isMinimized={isWorkoutMinimized}
            theme={theme}
          />
        )}

        {/* Workout Completion Modal */}
        {showCompletionModal && selectedWorkout && (
          <WorkoutCompletionModal
            workoutTitle={selectedWorkout.workout.title}
            workoutType={selectedWorkout.type}
            onSave={handleSaveWorkout}
            onCancel={handleCancelWorkout}
            theme={theme}
          />
        )}

        {/* Create Workout Modal */}
        {showCreateWorkout && (
          <CreateWorkoutModal
            onSave={handleAddCustomWorkout}
            onCancel={() => setShowCreateWorkout(false)}
            theme={theme}
          />
        )}

        {/* Floating Add Button - Only show in Training view */}
        {currentView === "training" && !selectedWorkout && !showCreateWorkout && (
          <button
            onClick={() => setShowCreateWorkout(true)}
            className="fixed bottom-8 right-8 w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 z-40"
            title="Create custom workout"
          >
            <Plus className="w-8 h-8" />
          </button>
        )}
      </div>
    </div>
  );
}