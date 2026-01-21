import { Menu, X, Dumbbell, History, Settings } from "lucide-react";
import { useState } from "react";

interface HamburgerMenuProps {
  currentView: "training" | "history" | "settings";
  onNavigate: (view: "training" | "history" | "settings") => void;
  theme: "light" | "dark";
}

export function HamburgerMenu({ currentView, onNavigate, theme }: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: "training" as const, label: "Training", icon: Dumbbell },
    { id: "history" as const, label: "History", icon: History },
    { id: "settings" as const, label: "Settings", icon: Settings },
  ];

  const handleNavigate = (view: "training" | "history" | "settings") => {
    onNavigate(view);
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-6 left-6 z-50 p-3 rounded-lg shadow-lg transition-colors ${
          theme === "dark"
            ? "bg-gray-800 hover:bg-gray-700"
            : "bg-white hover:bg-gray-50"
        }`}
        aria-label="Menu"
      >
        {isOpen ? (
          <X className={`w-6 h-6 ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`} />
        ) : (
          <Menu className={`w-6 h-6 ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`} />
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className={`fixed inset-0 backdrop-blur-md z-40 ${
            theme === "dark" ? "bg-black/30" : "bg-white/30"
          }`}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-out Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-72 shadow-2xl z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
      >
        <div className="p-6">
          <h2 className={`text-2xl font-bold mb-8 mt-12 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            Workout Hub
          </h2>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                    currentView === item.id
                      ? "bg-blue-600 text-white"
                      : theme === "dark"
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}