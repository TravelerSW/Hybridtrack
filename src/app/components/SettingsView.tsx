import { Moon, Sun, Globe } from "lucide-react";

interface SettingsViewProps {
  theme: "light" | "dark";
  language: string;
  onThemeChange: (theme: "light" | "dark") => void;
  onLanguageChange: (language: string) => void;
}

export function SettingsView({
  theme,
  language,
  onThemeChange,
  onLanguageChange,
}: SettingsViewProps) {
  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    { code: "pt", name: "Português" },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

      <div className="space-y-6">
        {/* Theme Setting */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            {theme === "light" ? (
              <Sun className="w-6 h-6 text-yellow-500" />
            ) : (
              <Moon className="w-6 h-6 text-blue-500" />
            )}
            <h2 className="text-xl font-semibold text-gray-900">Theme</h2>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => onThemeChange("light")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                theme === "light"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Sun className="w-5 h-5" />
              Light
            </button>
            <button
              onClick={() => onThemeChange("dark")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                theme === "dark"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Moon className="w-5 h-5" />
              Dark
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-3">
            {theme === "dark"
              ? "Dark theme coming soon! Currently in development."
              : "Choose your preferred color scheme."}
          </p>
        </div>

        {/* Language Setting */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-6 h-6 text-green-500" />
            <h2 className="text-xl font-semibold text-gray-900">Language</h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => onLanguageChange(lang.code)}
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  language === lang.code
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>

          <p className="text-sm text-gray-500 mt-3">
            {language !== "en"
              ? "Multi-language support coming soon! Currently in development."
              : "Select your preferred language."}
          </p>
        </div>

        {/* App Info */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            About
          </h2>
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              <span className="font-medium">Version:</span> 1.0.0
            </p>
            <p>
              <span className="font-medium">App Name:</span> Fitness Tracker
            </p>
            <p className="text-gray-500 mt-4">
              Track your workouts, monitor your progress, and achieve your fitness goals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
