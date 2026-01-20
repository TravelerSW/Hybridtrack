import { Workout } from "@/app/components/WorkoutCard";

export const strengthWorkouts: Workout[] = [
  {
    id: "strength-1",
    title: "Full Body Compound",
    duration: "45-60 min",
    difficulty: "Intermediate",
    description: "Build overall strength with the big 4 compound lifts",
    exercises: [
      { name: "Barbell Squats", sets: 4, reps: "6-8", rest: "2-3 min" },
      { name: "Bench Press", sets: 4, reps: "6-8", rest: "2-3 min" },
      { name: "Deadlifts", sets: 3, reps: "5-6", rest: "3 min" },
      { name: "Barbell Rows", sets: 4, reps: "8-10", rest: "2 min" },
    ],
  },
  {
    id: "strength-2",
    title: "Upper Body Power",
    duration: "40-50 min",
    difficulty: "Advanced",
    description: "Heavy pressing and pulling movements",
    exercises: [
      { name: "Overhead Press", sets: 4, reps: "5-6", rest: "2-3 min" },
      { name: "Weighted Pull-ups", sets: 4, reps: "5-8", rest: "2-3 min" },
      { name: "Incline Barbell Press", sets: 3, reps: "6-8", rest: "2 min" },
      { name: "Weighted Dips", sets: 3, reps: "6-10", rest: "2 min" },
    ],
  },
  {
    id: "strength-3",
    title: "Lower Body Focus",
    duration: "45-55 min",
    difficulty: "Intermediate",
    description: "Leg-focused compound movements",
    exercises: [
      { name: "Front Squats", sets: 4, reps: "6-8", rest: "2-3 min" },
      { name: "Romanian Deadlifts", sets: 4, reps: "8-10", rest: "2 min" },
      { name: "Bulgarian Split Squats", sets: 3, reps: "8-10", rest: "90 sec" },
      { name: "Hip Thrusts", sets: 3, reps: "10-12", rest: "90 sec" },
    ],
  },
  {
    id: "strength-4",
    title: "Beginner Essentials",
    duration: "30-40 min",
    difficulty: "Beginner",
    description: "Master the fundamental compound movements",
    exercises: [
      { name: "Goblet Squats", sets: 3, reps: "10-12", rest: "90 sec" },
      { name: "Dumbbell Bench Press", sets: 3, reps: "10-12", rest: "90 sec" },
      { name: "Inverted Rows", sets: 3, reps: "8-12", rest: "90 sec" },
      { name: "Dumbbell Romanian Deadlifts", sets: 3, reps: "10-12", rest: "90 sec" },
    ],
  },
  {
    id: "strength-5",
    title: "Push Emphasis",
    duration: "40-50 min",
    difficulty: "Intermediate",
    description: "Heavy pressing compound movements",
    exercises: [
      { name: "Barbell Bench Press", sets: 5, reps: "5-6", rest: "3 min" },
      { name: "Overhead Press", sets: 4, reps: "6-8", rest: "2-3 min" },
      { name: "Close-Grip Bench Press", sets: 3, reps: "8-10", rest: "2 min" },
      { name: "Dips", sets: 3, reps: "8-12", rest: "90 sec" },
    ],
  },
  {
    id: "strength-6",
    title: "Pull Emphasis",
    duration: "40-50 min",
    difficulty: "Intermediate",
    description: "Heavy pulling compound movements",
    exercises: [
      { name: "Conventional Deadlifts", sets: 5, reps: "3-5", rest: "3-4 min" },
      { name: "Weighted Pull-ups", sets: 4, reps: "5-8", rest: "2-3 min" },
      { name: "Barbell Rows", sets: 4, reps: "6-8", rest: "2 min" },
      { name: "T-Bar Rows", sets: 3, reps: "8-10", rest: "90 sec" },
    ],
  },
];

export const runningWorkouts: Workout[] = [
  {
    id: "running-1",
    title: "5K Training Run",
    duration: "30-40 min",
    difficulty: "Intermediate",
    description: "Build endurance with steady-paced running",
    exercises: [
      { name: "Dynamic Warm-up", duration: "5 min" },
      { name: "Easy Run", duration: "5 min" },
      { name: "Steady Run (70-75% effort)", duration: "20-25 min" },
      { name: "Cool-down Jog", duration: "5 min" },
      { name: "Static Stretching", duration: "5 min" },
    ],
  },
  {
    id: "running-2",
    title: "Sprint Intervals",
    duration: "25-30 min",
    difficulty: "Advanced",
    description: "High-intensity sprint training for speed",
    exercises: [
      { name: "Warm-up Jog", duration: "10 min" },
      { name: "Sprint", sets: 8, duration: "30 sec", rest: "90 sec walk" },
      { name: "Cool-down Walk", duration: "5 min" },
      { name: "Stretching", duration: "5 min" },
    ],
  },
  {
    id: "running-3",
    title: "Easy Recovery Run",
    duration: "20-30 min",
    difficulty: "Beginner",
    description: "Light run for active recovery",
    exercises: [
      { name: "Warm-up Walk", duration: "5 min" },
      { name: "Easy Run (60-65% effort)", duration: "15-20 min" },
      { name: "Cool-down Walk", duration: "5 min" },
    ],
  },
  {
    id: "running-4",
    title: "Tempo Run",
    duration: "35-45 min",
    difficulty: "Advanced",
    description: "Sustained effort at race pace",
    exercises: [
      { name: "Warm-up Jog", duration: "10 min" },
      { name: "Tempo Run (80-85% effort)", duration: "20-25 min" },
      { name: "Cool-down Jog", duration: "5 min" },
      { name: "Stretching", duration: "5 min" },
    ],
  },
  {
    id: "running-5",
    title: "Fartlek Run",
    duration: "30-40 min",
    difficulty: "Intermediate",
    description: "Unstructured speed play workout",
    exercises: [
      { name: "Warm-up Jog", duration: "10 min" },
      { name: "Fartlek (alternate easy/hard efforts)", duration: "20-25 min" },
      { name: "Cool-down Jog", duration: "5 min" },
    ],
  },
  {
    id: "running-6",
    title: "Long Slow Distance",
    duration: "60-90 min",
    difficulty: "Intermediate",
    description: "Build aerobic base with long steady run",
    exercises: [
      { name: "Warm-up Jog", duration: "10 min" },
      { name: "Steady Easy Run (65-70% effort)", duration: "45-75 min" },
      { name: "Cool-down Walk", duration: "5 min" },
    ],
  },
];

export const cyclingWorkouts: Workout[] = [
  {
    id: "cycling-1",
    title: "Long Distance Ride",
    duration: "60-90 min",
    difficulty: "Intermediate",
    description: "Endurance cycling at moderate pace",
    exercises: [
      { name: "Easy Spin Warm-up", duration: "10 min" },
      { name: "Steady Ride (65-75% effort)", duration: "45-70 min" },
      { name: "Cool-down Easy Pace", duration: "5-10 min" },
    ],
  },
  {
    id: "cycling-2",
    title: "Hill Intervals",
    duration: "40-50 min",
    difficulty: "Advanced",
    description: "Build power with hill climbing",
    exercises: [
      { name: "Flat Road Warm-up", duration: "10 min" },
      { name: "Hill Climb (80-90% effort)", sets: 6, duration: "3 min", rest: "3 min easy ride" },
      { name: "Cool-down Flat Ride", duration: "10 min" },
    ],
  },
  {
    id: "cycling-3",
    title: "Tempo Ride",
    duration: "45-60 min",
    difficulty: "Intermediate",
    description: "Sustained moderate-hard cycling effort",
    exercises: [
      { name: "Warm-up Spin", duration: "10 min" },
      { name: "Tempo Pace (75-80% effort)", duration: "30-40 min" },
      { name: "Cool-down Easy Spin", duration: "5-10 min" },
    ],
  },
  {
    id: "cycling-4",
    title: "Sprint Intervals",
    duration: "30-40 min",
    difficulty: "Advanced",
    description: "High-intensity sprint training on bike",
    exercises: [
      { name: "Easy Warm-up", duration: "10 min" },
      { name: "All-out Sprint", sets: 8, duration: "30 sec", rest: "2 min easy" },
      { name: "Cool-down", duration: "10 min" },
    ],
  },
  {
    id: "cycling-5",
    title: "Recovery Ride",
    duration: "30-45 min",
    difficulty: "Beginner",
    description: "Easy spin for active recovery",
    exercises: [
      { name: "Easy Spin (50-60% effort)", duration: "30-45 min" },
    ],
  },
  {
    id: "cycling-6",
    title: "Sweet Spot Training",
    duration: "50-60 min",
    difficulty: "Advanced",
    description: "High-intensity endurance building",
    exercises: [
      { name: "Warm-up", duration: "15 min" },
      { name: "Sweet Spot (85-90% FTP)", sets: 3, duration: "10 min", rest: "5 min easy" },
      { name: "Cool-down", duration: "10 min" },
    ],
  },
];