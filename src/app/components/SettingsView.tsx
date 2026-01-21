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
      <h1 className={`text-3xl font-bold mb-8 ${
        theme === "dark" ? "text-white" : "text-gray-900"
      }`}>Settings</h1>

      <div className="space-y-6">
        {/* Theme Setting */}
        <div className={`rounded-lg shadow-md p-6 ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}>
          <div className="flex items-center gap-3 mb-4">
            {theme === "light" ? (
              <Sun className="w-6 h-6 text-yellow-500" />
            ) : (
              <Moon className="w-6 h-6 text-blue-400" />
            )}
            <h2 className={`text-xl font-semibold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}>Theme</h2>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => onThemeChange("light")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                theme === "light"
                  ? "bg-blue-600 text-white shadow-md"
                  : theme === "dark"
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
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

          <p className={`text-sm mt-3 ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}>
            Choose your preferred color scheme.
          </p>
        </div>

        {/* Language Setting */}
        <div className={`rounded-lg shadow-md p-6 ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}>
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-6 h-6 text-green-500" />
            <h2 className={`text-xl font-semibold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}>Language</h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => onLanguageChange(lang.code)}
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  language === lang.code
                    ? "bg-blue-600 text-white shadow-md"
                    : theme === "dark"
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>

          <p className={`text-sm mt-3 ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}>
            {language !== "en"
              ? "Multi-language support coming soon! Currently in development."
              : "Select your preferred language."}
          </p>
        </div>

        {/* App Info */}
        <div className={`rounded-lg shadow-md p-6 ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}>
          <h2 className={`text-xl font-semibold mb-4 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            About
          </h2>
          <div className={`space-y-2 text-sm ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}>
            <p>
              <span className="font-medium">Version:</span> 1.0.0
            </p>
            <p>
              <span className="font-medium">App Name:</span> Workout Hub
            </p>
            <p className={`mt-4 ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}>
              Track your workouts, monitor your progress, and achieve your fitness goals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}