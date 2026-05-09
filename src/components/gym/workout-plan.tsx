'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Target, Dumbbell, Clock, ChevronRight, Download, X, Flame, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/gym/scroll-reveal'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

type FitnessGoal = 'weight-loss' | 'muscle-gain' | 'endurance' | 'flexibility' | 'general'
type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced'
type AvailableDays = 3 | 4 | 5 | 6

interface Exercise {
  name: string
  sets: number
  reps: string
  rest: string
}

interface DayPlan {
  day: string
  focus: string
  exercises: Exercise[]
}

const goalOptions: { value: FitnessGoal; label: string; icon: string }[] = [
  { value: 'weight-loss', label: 'Weight Loss', icon: '🔥' },
  { value: 'muscle-gain', label: 'Muscle Gain', icon: '💪' },
  { value: 'endurance', label: 'Endurance', icon: '🏃' },
  { value: 'flexibility', label: 'Flexibility', icon: '🧘' },
  { value: 'general', label: 'General Fitness', icon: '⚡' },
]

const levelOptions: { value: ExperienceLevel; label: string }[] = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
]

const daysOptions: { value: AvailableDays; label: string }[] = [
  { value: 3, label: '3 Days' },
  { value: 4, label: '4 Days' },
  { value: 5, label: '5 Days' },
  { value: 6, label: '6 Days' },
]

// Workout plan data based on goal + days
function generatePlan(goal: FitnessGoal, level: ExperienceLevel, days: AvailableDays): DayPlan[] {
  const restExercise = { name: 'Active Recovery / Stretching', sets: 1, reps: '20 min', rest: '-' }

  const plans: Record<FitnessGoal, Record<AvailableDays, DayPlan[]>> = {
    'weight-loss': {
      3: [
        { day: 'Day 1', focus: 'Full Body HIIT', exercises: [
          { name: 'Burpees', sets: 4, reps: '15', rest: '30s' },
          { name: 'Mountain Climbers', sets: 4, reps: '20 each', rest: '30s' },
          { name: 'Jump Squats', sets: 4, reps: '15', rest: '45s' },
          { name: 'High Knees', sets: 3, reps: '30s', rest: '30s' },
          { name: 'Plank Hold', sets: 3, reps: '45s', rest: '30s' },
        ]},
        { day: 'Day 2', focus: 'Cardio + Core', exercises: [
          { name: 'Treadmill Intervals', sets: 1, reps: '20 min', rest: '-' },
          { name: 'Russian Twists', sets: 3, reps: '20 each', rest: '30s' },
          { name: 'Bicycle Crunches', sets: 3, reps: '15 each', rest: '30s' },
          { name: 'Leg Raises', sets: 3, reps: '12', rest: '30s' },
          { name: 'Dead Bug', sets: 3, reps: '10 each', rest: '30s' },
        ]},
        { day: 'Day 3', focus: 'Metabolic Circuit', exercises: [
          { name: 'Kettlebell Swings', sets: 4, reps: '15', rest: '30s' },
          { name: 'Box Jumps', sets: 3, reps: '12', rest: '45s' },
          { name: 'Battle Ropes', sets: 4, reps: '30s', rest: '30s' },
          { name: 'Sprint Intervals', sets: 5, reps: '30s on/30s off', rest: '-' },
          { name: 'Plank to Push-Up', sets: 3, reps: '10 each', rest: '30s' },
        ]},
      ],
      4: [
        { day: 'Day 1', focus: 'Upper Body HIIT', exercises: [
          { name: 'Push-Up Variations', sets: 4, reps: '12', rest: '30s' },
          { name: 'Dumbbell Thrusters', sets: 4, reps: '10', rest: '30s' },
          { name: 'Renegade Rows', sets: 3, reps: '10 each', rest: '30s' },
          { name: 'Tricep Dips', sets: 3, reps: '12', rest: '30s' },
          { name: 'Plank Shoulder Taps', sets: 3, reps: '10 each', rest: '30s' },
        ]},
        { day: 'Day 2', focus: 'Lower Body HIIT', exercises: [
          { name: 'Jump Squats', sets: 4, reps: '15', rest: '30s' },
          { name: 'Walking Lunges', sets: 3, reps: '12 each', rest: '30s' },
          { name: 'Skater Jumps', sets: 4, reps: '10 each', rest: '30s' },
          { name: 'Calf Raises', sets: 3, reps: '20', rest: '30s' },
          { name: 'Wall Sit', sets: 3, reps: '45s', rest: '30s' },
        ]},
        { day: 'Day 3', focus: 'Cardio Burn', exercises: [
          { name: 'Treadmill Intervals', sets: 1, reps: '25 min', rest: '-' },
          { name: 'Rowing Sprints', sets: 5, reps: '200m', rest: '60s' },
          { name: 'Cycling Intervals', sets: 1, reps: '15 min', rest: '-' },
          { name: 'Jump Rope', sets: 4, reps: '60s', rest: '30s' },
        ]},
        { day: 'Day 4', focus: 'Full Body Circuit', exercises: [
          { name: 'Burpees', sets: 4, reps: '12', rest: '30s' },
          { name: 'Kettlebell Swings', sets: 4, reps: '15', rest: '30s' },
          { name: 'Mountain Climbers', sets: 3, reps: '20 each', rest: '30s' },
          { name: 'Box Jumps', sets: 3, reps: '10', rest: '45s' },
          { name: 'Plank Hold', sets: 3, reps: '60s', rest: '30s' },
        ]},
      ],
      5: [
        { day: 'Day 1', focus: 'Upper Body HIIT', exercises: [
          { name: 'Push-Up Variations', sets: 4, reps: '12', rest: '30s' },
          { name: 'Dumbbell Thrusters', sets: 4, reps: '10', rest: '30s' },
          { name: 'Renegade Rows', sets: 3, reps: '10 each', rest: '30s' },
          { name: 'Tricep Dips', sets: 3, reps: '12', rest: '30s' },
        ]},
        { day: 'Day 2', focus: 'Lower Body HIIT', exercises: [
          { name: 'Jump Squats', sets: 4, reps: '15', rest: '30s' },
          { name: 'Walking Lunges', sets: 3, reps: '12 each', rest: '30s' },
          { name: 'Skater Jumps', sets: 4, reps: '10 each', rest: '30s' },
          { name: 'Calf Raises', sets: 3, reps: '20', rest: '30s' },
        ]},
        { day: 'Day 3', focus: 'Cardio + Core', exercises: [
          { name: 'Treadmill Intervals', sets: 1, reps: '20 min', rest: '-' },
          { name: 'Russian Twists', sets: 3, reps: '20 each', rest: '30s' },
          { name: 'Leg Raises', sets: 3, reps: '12', rest: '30s' },
          { name: 'Bicycle Crunches', sets: 3, reps: '15 each', rest: '30s' },
        ]},
        { day: 'Day 4', focus: 'Full Body Circuit', exercises: [
          { name: 'Burpees', sets: 4, reps: '12', rest: '30s' },
          { name: 'Kettlebell Swings', sets: 4, reps: '15', rest: '30s' },
          { name: 'Battle Ropes', sets: 4, reps: '30s', rest: '30s' },
          { name: 'Mountain Climbers', sets: 3, reps: '20 each', rest: '30s' },
        ]},
        { day: 'Day 5', focus: 'Metabolic Finisher', exercises: [
          { name: 'Sprint Intervals', sets: 6, reps: '30s on/30s off', rest: '-' },
          { name: 'Box Jumps', sets: 3, reps: '10', rest: '45s' },
          { name: 'Plank to Push-Up', sets: 3, reps: '10 each', rest: '30s' },
          { name: 'Rowing Sprints', sets: 4, reps: '200m', rest: '60s' },
        ]},
      ],
      6: [
        { day: 'Day 1', focus: 'Upper Body HIIT', exercises: [
          { name: 'Push-Up Variations', sets: 4, reps: '12', rest: '30s' },
          { name: 'Dumbbell Thrusters', sets: 4, reps: '10', rest: '30s' },
          { name: 'Renegade Rows', sets: 3, reps: '10 each', rest: '30s' },
          { name: 'Tricep Dips', sets: 3, reps: '12', rest: '30s' },
        ]},
        { day: 'Day 2', focus: 'Lower Body HIIT', exercises: [
          { name: 'Jump Squats', sets: 4, reps: '15', rest: '30s' },
          { name: 'Walking Lunges', sets: 3, reps: '12 each', rest: '30s' },
          { name: 'Skater Jumps', sets: 4, reps: '10 each', rest: '30s' },
          { name: 'Calf Raises', sets: 3, reps: '20', rest: '30s' },
        ]},
        { day: 'Day 3', focus: 'Cardio Endurance', exercises: [
          { name: 'Treadmill Intervals', sets: 1, reps: '25 min', rest: '-' },
          { name: 'Rowing Sprints', sets: 5, reps: '200m', rest: '60s' },
          { name: 'Jump Rope', sets: 4, reps: '60s', rest: '30s' },
        ]},
        { day: 'Day 4', focus: 'Core + Abs', exercises: [
          { name: 'Russian Twists', sets: 3, reps: '20 each', rest: '30s' },
          { name: 'Leg Raises', sets: 3, reps: '12', rest: '30s' },
          { name: 'Plank Hold', sets: 3, reps: '60s', rest: '30s' },
          { name: 'Dead Bug', sets: 3, reps: '10 each', rest: '30s' },
        ]},
        { day: 'Day 5', focus: 'Full Body Circuit', exercises: [
          { name: 'Burpees', sets: 4, reps: '12', rest: '30s' },
          { name: 'Kettlebell Swings', sets: 4, reps: '15', rest: '30s' },
          { name: 'Battle Ropes', sets: 4, reps: '30s', rest: '30s' },
          { name: 'Mountain Climbers', sets: 3, reps: '20 each', rest: '30s' },
        ]},
        { day: 'Day 6', focus: 'Metabolic Finisher', exercises: [
          { name: 'Sprint Intervals', sets: 6, reps: '30s on/30s off', rest: '-' },
          { name: 'Box Jumps', sets: 3, reps: '10', rest: '45s' },
          { name: 'Cycling Intervals', sets: 1, reps: '15 min', rest: '-' },
          { name: 'Plank to Push-Up', sets: 3, reps: '10 each', rest: '30s' },
        ]},
      ],
    },
    'muscle-gain': {
      3: [
        { day: 'Day 1', focus: 'Push (Chest, Shoulders, Triceps)', exercises: [
          { name: 'Barbell Bench Press', sets: 4, reps: '8-10', rest: '90s' },
          { name: 'Overhead Press', sets: 4, reps: '8-10', rest: '90s' },
          { name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', rest: '75s' },
          { name: 'Lateral Raises', sets: 3, reps: '12-15', rest: '60s' },
          { name: 'Tricep Dips', sets: 3, reps: '10-12', rest: '60s' },
        ]},
        { day: 'Day 2', focus: 'Pull (Back, Biceps)', exercises: [
          { name: 'Barbell Rows', sets: 4, reps: '8-10', rest: '90s' },
          { name: 'Weighted Pull-Ups', sets: 4, reps: '6-8', rest: '90s' },
          { name: 'Seated Cable Row', sets: 3, reps: '10-12', rest: '75s' },
          { name: 'Barbell Curls', sets: 3, reps: '10-12', rest: '60s' },
          { name: 'Hammer Curls', sets: 3, reps: '12-15', rest: '60s' },
        ]},
        { day: 'Day 3', focus: 'Legs + Core', exercises: [
          { name: 'Barbell Back Squat', sets: 5, reps: '5-8', rest: '120s' },
          { name: 'Romanian Deadlift', sets: 4, reps: '8-10', rest: '90s' },
          { name: 'Bulgarian Split Squat', sets: 3, reps: '10-12', rest: '75s' },
          { name: 'Leg Press', sets: 3, reps: '12-15', rest: '75s' },
          { name: 'Hanging Leg Raises', sets: 3, reps: '12', rest: '60s' },
        ]},
      ],
      4: [
        { day: 'Day 1', focus: 'Chest + Triceps', exercises: [
          { name: 'Barbell Bench Press', sets: 4, reps: '8-10', rest: '90s' },
          { name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', rest: '75s' },
          { name: 'Cable Flyes', sets: 3, reps: '12-15', rest: '60s' },
          { name: 'Skull Crushers', sets: 3, reps: '10-12', rest: '60s' },
          { name: 'Tricep Pushdowns', sets: 3, reps: '12-15', rest: '60s' },
        ]},
        { day: 'Day 2', focus: 'Back + Biceps', exercises: [
          { name: 'Deadlift', sets: 4, reps: '5-8', rest: '120s' },
          { name: 'Barbell Rows', sets: 4, reps: '8-10', rest: '90s' },
          { name: 'Pull-Ups', sets: 3, reps: '8-10', rest: '75s' },
          { name: 'Barbell Curls', sets: 3, reps: '10-12', rest: '60s' },
          { name: 'Preacher Curls', sets: 3, reps: '12-15', rest: '60s' },
        ]},
        { day: 'Day 3', focus: 'Shoulders + Abs', exercises: [
          { name: 'Overhead Press', sets: 4, reps: '8-10', rest: '90s' },
          { name: 'Arnold Press', sets: 3, reps: '10-12', rest: '75s' },
          { name: 'Lateral Raises', sets: 4, reps: '12-15', rest: '60s' },
          { name: 'Face Pulls', sets: 3, reps: '15-20', rest: '60s' },
          { name: 'Cable Crunches', sets: 3, reps: '15', rest: '60s' },
        ]},
        { day: 'Day 4', focus: 'Legs', exercises: [
          { name: 'Barbell Back Squat', sets: 5, reps: '5-8', rest: '120s' },
          { name: 'Romanian Deadlift', sets: 4, reps: '8-10', rest: '90s' },
          { name: 'Leg Press', sets: 3, reps: '12-15', rest: '75s' },
          { name: 'Walking Lunges', sets: 3, reps: '12 each', rest: '75s' },
          { name: 'Calf Raises', sets: 4, reps: '15-20', rest: '60s' },
        ]},
      ],
      5: [
        { day: 'Day 1', focus: 'Chest', exercises: [
          { name: 'Barbell Bench Press', sets: 4, reps: '8-10', rest: '90s' },
          { name: 'Incline Dumbbell Press', sets: 4, reps: '10-12', rest: '75s' },
          { name: 'Cable Flyes', sets: 3, reps: '12-15', rest: '60s' },
          { name: 'Dips', sets: 3, reps: '10-12', rest: '60s' },
        ]},
        { day: 'Day 2', focus: 'Back', exercises: [
          { name: 'Deadlift', sets: 4, reps: '5-8', rest: '120s' },
          { name: 'Barbell Rows', sets: 4, reps: '8-10', rest: '90s' },
          { name: 'Pull-Ups', sets: 3, reps: '8-10', rest: '75s' },
          { name: 'Seated Cable Row', sets: 3, reps: '10-12', rest: '75s' },
        ]},
        { day: 'Day 3', focus: 'Shoulders + Arms', exercises: [
          { name: 'Overhead Press', sets: 4, reps: '8-10', rest: '90s' },
          { name: 'Lateral Raises', sets: 4, reps: '12-15', rest: '60s' },
          { name: 'Barbell Curls', sets: 3, reps: '10-12', rest: '60s' },
          { name: 'Skull Crushers', sets: 3, reps: '10-12', rest: '60s' },
        ]},
        { day: 'Day 4', focus: 'Legs', exercises: [
          { name: 'Barbell Back Squat', sets: 5, reps: '5-8', rest: '120s' },
          { name: 'Romanian Deadlift', sets: 4, reps: '8-10', rest: '90s' },
          { name: 'Bulgarian Split Squat', sets: 3, reps: '10-12', rest: '75s' },
          { name: 'Calf Raises', sets: 4, reps: '15-20', rest: '60s' },
        ]},
        { day: 'Day 5', focus: 'Full Body Power', exercises: [
          { name: 'Power Clean', sets: 4, reps: '5', rest: '120s' },
          { name: 'Front Squat', sets: 3, reps: '8', rest: '90s' },
          { name: 'Weighted Pull-Ups', sets: 3, reps: '6-8', rest: '90s' },
          { name: 'Farmer Walks', sets: 3, reps: '40m', rest: '60s' },
        ]},
      ],
      6: [
        { day: 'Day 1', focus: 'Chest + Triceps', exercises: [
          { name: 'Barbell Bench Press', sets: 4, reps: '8-10', rest: '90s' },
          { name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', rest: '75s' },
          { name: 'Cable Flyes', sets: 3, reps: '12-15', rest: '60s' },
          { name: 'Skull Crushers', sets: 3, reps: '10-12', rest: '60s' },
        ]},
        { day: 'Day 2', focus: 'Back + Biceps', exercises: [
          { name: 'Barbell Rows', sets: 4, reps: '8-10', rest: '90s' },
          { name: 'Pull-Ups', sets: 3, reps: '8-10', rest: '75s' },
          { name: 'Seated Cable Row', sets: 3, reps: '10-12', rest: '75s' },
          { name: 'Barbell Curls', sets: 3, reps: '10-12', rest: '60s' },
        ]},
        { day: 'Day 3', focus: 'Legs (Quad Focus)', exercises: [
          { name: 'Barbell Back Squat', sets: 5, reps: '5-8', rest: '120s' },
          { name: 'Leg Press', sets: 3, reps: '12-15', rest: '75s' },
          { name: 'Walking Lunges', sets: 3, reps: '12 each', rest: '75s' },
          { name: 'Calf Raises', sets: 4, reps: '15-20', rest: '60s' },
        ]},
        { day: 'Day 4', focus: 'Shoulders + Abs', exercises: [
          { name: 'Overhead Press', sets: 4, reps: '8-10', rest: '90s' },
          { name: 'Arnold Press', sets: 3, reps: '10-12', rest: '75s' },
          { name: 'Lateral Raises', sets: 4, reps: '12-15', rest: '60s' },
          { name: 'Hanging Leg Raises', sets: 3, reps: '12', rest: '60s' },
        ]},
        { day: 'Day 5', focus: 'Legs (Hamstring Focus)', exercises: [
          { name: 'Romanian Deadlift', sets: 4, reps: '8-10', rest: '90s' },
          { name: 'Bulgarian Split Squat', sets: 3, reps: '10-12', rest: '75s' },
          { name: 'Leg Curls', sets: 3, reps: '12-15', rest: '60s' },
          { name: 'Hip Thrusts', sets: 3, reps: '10-12', rest: '75s' },
        ]},
        { day: 'Day 6', focus: 'Arms + Power', exercises: [
          { name: 'Close Grip Bench Press', sets: 3, reps: '10-12', rest: '60s' },
          { name: 'Preacher Curls', sets: 3, reps: '10-12', rest: '60s' },
          { name: 'Hammer Curls', sets: 3, reps: '12-15', rest: '60s' },
          { name: 'Tricep Pushdowns', sets: 3, reps: '12-15', rest: '60s' },
        ]},
      ],
    },
    'endurance': {
      3: [
        { day: 'Day 1', focus: 'Running Intervals', exercises: [
          { name: 'Warm-Up Jog', sets: 1, reps: '10 min', rest: '-' },
          { name: 'Sprint Intervals', sets: 8, reps: '400m', rest: '90s' },
          { name: 'Cool-Down Jog', sets: 1, reps: '5 min', rest: '-' },
          { name: 'Stretching', sets: 1, reps: '10 min', rest: '-' },
        ]},
        { day: 'Day 2', focus: 'Cross Training', exercises: [
          { name: 'Cycling', sets: 1, reps: '30 min', rest: '-' },
          { name: 'Rowing', sets: 1, reps: '15 min', rest: '-' },
          { name: 'Bodyweight Circuit', sets: 3, reps: '10 each', rest: '45s' },
        ]},
        { day: 'Day 3', focus: 'Long Run + Core', exercises: [
          { name: 'Long Run', sets: 1, reps: '40-60 min', rest: '-' },
          { name: 'Plank Hold', sets: 3, reps: '60s', rest: '30s' },
          { name: 'Russian Twists', sets: 3, reps: '20 each', rest: '30s' },
        ]},
      ],
      4: [
        { day: 'Day 1', focus: 'Tempo Run', exercises: [
          { name: 'Warm-Up', sets: 1, reps: '10 min', rest: '-' },
          { name: 'Tempo Run', sets: 1, reps: '25 min', rest: '-' },
          { name: 'Cool-Down', sets: 1, reps: '5 min', rest: '-' },
        ]},
        { day: 'Day 2', focus: 'Strength for Runners', exercises: [
          { name: 'Goblet Squats', sets: 3, reps: '12', rest: '60s' },
          { name: 'Walking Lunges', sets: 3, reps: '10 each', rest: '60s' },
          { name: 'Single Leg Deadlift', sets: 3, reps: '10 each', rest: '60s' },
          { name: 'Calf Raises', sets: 3, reps: '15', rest: '45s' },
        ]},
        { day: 'Day 3', focus: 'Interval Training', exercises: [
          { name: 'Sprint Intervals', sets: 8, reps: '400m', rest: '90s' },
          { name: 'Hill Repeats', sets: 6, reps: '200m', rest: '90s' },
          { name: 'Core Work', sets: 3, reps: '45s each', rest: '30s' },
        ]},
        { day: 'Day 4', focus: 'Long Run + Recovery', exercises: [
          { name: 'Long Run', sets: 1, reps: '45-75 min', rest: '-' },
          { name: 'Foam Rolling', sets: 1, reps: '15 min', rest: '-' },
          { name: 'Yoga Flow', sets: 1, reps: '15 min', rest: '-' },
        ]},
      ],
      5: [
        { day: 'Day 1', focus: 'Easy Run', exercises: [
          { name: 'Easy Pace Run', sets: 1, reps: '30-40 min', rest: '-' },
          { name: 'Dynamic Stretching', sets: 1, reps: '10 min', rest: '-' },
        ]},
        { day: 'Day 2', focus: 'Speed Work', exercises: [
          { name: 'Warm-Up', sets: 1, reps: '10 min', rest: '-' },
          { name: 'Track Repeats', sets: 6, reps: '800m', rest: '2 min' },
          { name: 'Cool-Down', sets: 1, reps: '10 min', rest: '-' },
        ]},
        { day: 'Day 3', focus: 'Cross Training', exercises: [
          { name: 'Swimming', sets: 1, reps: '30 min', rest: '-' },
          { name: 'Core Circuit', sets: 3, reps: '10 each', rest: '30s' },
        ]},
        { day: 'Day 4', focus: 'Tempo Run', exercises: [
          { name: 'Warm-Up', sets: 1, reps: '10 min', rest: '-' },
          { name: 'Tempo Run', sets: 1, reps: '30 min', rest: '-' },
          { name: 'Cool-Down', sets: 1, reps: '5 min', rest: '-' },
        ]},
        { day: 'Day 5', focus: 'Long Run', exercises: [
          { name: 'Long Run', sets: 1, reps: '60-90 min', rest: '-' },
          { name: 'Foam Rolling', sets: 1, reps: '15 min', rest: '-' },
        ]},
      ],
      6: [
        { day: 'Day 1', focus: 'Easy Run', exercises: [
          { name: 'Easy Pace Run', sets: 1, reps: '30-40 min', rest: '-' },
          { name: 'Dynamic Stretching', sets: 1, reps: '10 min', rest: '-' },
        ]},
        { day: 'Day 2', focus: 'Speed Work', exercises: [
          { name: 'Track Repeats', sets: 6, reps: '800m', rest: '2 min' },
          { name: 'Strides', sets: 4, reps: '100m', rest: '60s' },
        ]},
        { day: 'Day 3', focus: 'Strength', exercises: [
          { name: 'Goblet Squats', sets: 3, reps: '12', rest: '60s' },
          { name: 'Single Leg Deadlift', sets: 3, reps: '10 each', rest: '60s' },
          { name: 'Step-Ups', sets: 3, reps: '10 each', rest: '45s' },
        ]},
        { day: 'Day 4', focus: 'Tempo Run', exercises: [
          { name: 'Tempo Run', sets: 1, reps: '30 min', rest: '-' },
          { name: 'Core Circuit', sets: 3, reps: '10 each', rest: '30s' },
        ]},
        { day: 'Day 5', focus: 'Cross Training', exercises: [
          { name: 'Cycling', sets: 1, reps: '30 min', rest: '-' },
          { name: 'Swimming', sets: 1, reps: '20 min', rest: '-' },
          { name: 'Yoga Flow', sets: 1, reps: '20 min', rest: '-' },
        ]},
        { day: 'Day 6', focus: 'Long Run', exercises: [
          { name: 'Long Run', sets: 1, reps: '75-100 min', rest: '-' },
          { name: 'Foam Rolling', sets: 1, reps: '15 min', rest: '-' },
        ]},
      ],
    },
    'flexibility': {
      3: [
        { day: 'Day 1', focus: 'Dynamic Flow', exercises: [
          { name: 'Sun Salutations', sets: 5, reps: 'Full flow', rest: '-' },
          { name: 'Warrior Sequence', sets: 3, reps: 'Hold 30s each', rest: '15s' },
          { name: 'Hip Openers', sets: 3, reps: 'Hold 45s each', rest: '15s' },
          { name: 'Forward Folds', sets: 3, reps: 'Hold 30s each', rest: '15s' },
        ]},
        { day: 'Day 2', focus: 'Deep Stretch + Mobility', exercises: [
          { name: 'Foam Rolling', sets: 1, reps: '15 min', rest: '-' },
          { name: 'Pigeon Pose', sets: 2, reps: '60s each side', rest: '15s' },
          { name: 'Cat-Cow', sets: 3, reps: '10', rest: '-' },
          { name: 'Thread the Needle', sets: 3, reps: '30s each', rest: '15s' },
        ]},
        { day: 'Day 3', focus: 'Yin Yoga', exercises: [
          { name: 'Dragon Pose', sets: 1, reps: '3 min each', rest: '-' },
          { name: 'Sphinx Seal', sets: 1, reps: '3 min', rest: '-' },
          { name: 'Butterfly Fold', sets: 1, reps: '3 min', rest: '-' },
          { name: 'Savasana', sets: 1, reps: '5 min', rest: '-' },
        ]},
      ],
      4: [
        { day: 'Day 1', focus: 'Power Yoga', exercises: [
          { name: 'Sun Salutations A', sets: 5, reps: 'Full flow', rest: '-' },
          { name: 'Sun Salutations B', sets: 3, reps: 'Full flow', rest: '-' },
          { name: 'Standing Balance', sets: 3, reps: '30s each', rest: '15s' },
          { name: 'Core Work', sets: 3, reps: '10 each', rest: '30s' },
        ]},
        { day: 'Day 2', focus: 'Deep Stretch', exercises: [
          { name: 'Foam Rolling', sets: 1, reps: '15 min', rest: '-' },
          { name: 'Hip Openers', sets: 3, reps: '45s each', rest: '15s' },
          { name: 'Shoulder Openers', sets: 3, reps: '30s each', rest: '15s' },
          { name: 'Hamstring Stretches', sets: 3, reps: '30s each', rest: '15s' },
        ]},
        { day: 'Day 3', focus: 'Mobility Work', exercises: [
          { name: 'Joint Circles', sets: 2, reps: '10 each', rest: '-' },
          { name: 'Dynamic Lunges', sets: 3, reps: '8 each', rest: '30s' },
          { name: 'Band Pull-Aparts', sets: 3, reps: '15', rest: '30s' },
          { name: 'Wall Slides', sets: 3, reps: '10', rest: '30s' },
        ]},
        { day: 'Day 4', focus: 'Restorative Yoga', exercises: [
          { name: 'Legs Up the Wall', sets: 1, reps: '5 min', rest: '-' },
          { name: 'Supported Fish', sets: 1, reps: '3 min', rest: '-' },
          { name: 'Child Pose', sets: 1, reps: '2 min', rest: '-' },
          { name: 'Savasana', sets: 1, reps: '5 min', rest: '-' },
        ]},
      ],
      5: [
        { day: 'Day 1', focus: 'Vinyasa Flow', exercises: [
          { name: 'Sun Salutations', sets: 5, reps: 'Full flow', rest: '-' },
          { name: 'Warrior Flow', sets: 3, reps: '30s hold each', rest: '15s' },
          { name: 'Balance Work', sets: 3, reps: '30s each', rest: '15s' },
        ]},
        { day: 'Day 2', focus: 'Deep Stretch', exercises: [
          { name: 'Foam Rolling', sets: 1, reps: '15 min', rest: '-' },
          { name: 'Hip Openers', sets: 3, reps: '45s each', rest: '15s' },
          { name: 'Spinal Twists', sets: 3, reps: '30s each', rest: '15s' },
        ]},
        { day: 'Day 3', focus: 'Active Mobility', exercises: [
          { name: 'Joint Circles', sets: 2, reps: '10 each', rest: '-' },
          { name: 'Dynamic Stretching', sets: 3, reps: '8 each', rest: '30s' },
          { name: 'Band Work', sets: 3, reps: '15', rest: '30s' },
        ]},
        { day: 'Day 4', focus: 'Yin Yoga', exercises: [
          { name: 'Dragon Pose', sets: 1, reps: '3 min each', rest: '-' },
          { name: 'Pigeon Pose', sets: 1, reps: '3 min each', rest: '-' },
          { name: 'Butterfly Fold', sets: 1, reps: '3 min', rest: '-' },
        ]},
        { day: 'Day 5', focus: 'Restorative + Breath', exercises: [
          { name: 'Pranayama', sets: 3, reps: '10 breaths', rest: '-' },
          { name: 'Supported Poses', sets: 1, reps: '3 min each', rest: '-' },
          { name: 'Savasana', sets: 1, reps: '5 min', rest: '-' },
        ]},
      ],
      6: [
        { day: 'Day 1', focus: 'Vinyasa Flow', exercises: [
          { name: 'Sun Salutations', sets: 5, reps: 'Full flow', rest: '-' },
          { name: 'Warrior Flow', sets: 3, reps: '30s hold each', rest: '15s' },
          { name: 'Balance Work', sets: 3, reps: '30s each', rest: '15s' },
        ]},
        { day: 'Day 2', focus: 'Strength + Flexibility', exercises: [
          { name: 'Bodyweight Squats', sets: 3, reps: '12', rest: '45s' },
          { name: 'Push-Up Variations', sets: 3, reps: '8', rest: '45s' },
          { name: 'Lunges with Twist', sets: 3, reps: '8 each', rest: '45s' },
          { name: 'Plank Hold', sets: 3, reps: '30s', rest: '30s' },
        ]},
        { day: 'Day 3', focus: 'Deep Stretch', exercises: [
          { name: 'Foam Rolling', sets: 1, reps: '15 min', rest: '-' },
          { name: 'Hip Openers', sets: 3, reps: '45s each', rest: '15s' },
          { name: 'Spinal Twists', sets: 3, reps: '30s each', rest: '15s' },
        ]},
        { day: 'Day 4', focus: 'Active Mobility', exercises: [
          { name: 'Joint Circles', sets: 2, reps: '10 each', rest: '-' },
          { name: 'Dynamic Stretching', sets: 3, reps: '8 each', rest: '30s' },
          { name: 'Animal Flow', sets: 3, reps: '30s', rest: '30s' },
        ]},
        { day: 'Day 5', focus: 'Yin Yoga', exercises: [
          { name: 'Dragon Pose', sets: 1, reps: '3 min each', rest: '-' },
          { name: 'Pigeon Pose', sets: 1, reps: '3 min each', rest: '-' },
          { name: 'Sphinx Seal', sets: 1, reps: '3 min', rest: '-' },
        ]},
        { day: 'Day 6', focus: 'Restorative + Meditation', exercises: [
          { name: 'Guided Meditation', sets: 1, reps: '10 min', rest: '-' },
          { name: 'Supported Poses', sets: 1, reps: '3 min each', rest: '-' },
          { name: 'Savasana', sets: 1, reps: '5 min', rest: '-' },
        ]},
      ],
    },
    'general': {
      3: [
        { day: 'Day 1', focus: 'Full Body Strength', exercises: [
          { name: 'Goblet Squats', sets: 3, reps: '10-12', rest: '75s' },
          { name: 'Push-Ups', sets: 3, reps: '10-15', rest: '60s' },
          { name: 'Dumbbell Rows', sets: 3, reps: '10-12', rest: '60s' },
          { name: 'Plank Hold', sets: 3, reps: '45s', rest: '30s' },
          { name: 'Farmer Walks', sets: 3, reps: '30m', rest: '45s' },
        ]},
        { day: 'Day 2', focus: 'Cardio + Core', exercises: [
          { name: 'Rowing Machine', sets: 1, reps: '15 min', rest: '-' },
          { name: 'Mountain Climbers', sets: 3, reps: '15 each', rest: '30s' },
          { name: 'Bicycle Crunches', sets: 3, reps: '15 each', rest: '30s' },
          { name: 'Jump Rope', sets: 3, reps: '60s', rest: '30s' },
        ]},
        { day: 'Day 3', focus: 'Functional Fitness', exercises: [
          { name: 'Kettlebell Swings', sets: 3, reps: '15', rest: '60s' },
          { name: 'Step-Ups', sets: 3, reps: '10 each', rest: '45s' },
          { name: 'Superman Holds', sets: 3, reps: '30s', rest: '30s' },
          { name: 'Battle Ropes', sets: 3, reps: '30s', rest: '45s' },
        ]},
      ],
      4: [
        { day: 'Day 1', focus: 'Upper Body Strength', exercises: [
          { name: 'Dumbbell Bench Press', sets: 3, reps: '10-12', rest: '75s' },
          { name: 'Lat Pulldowns', sets: 3, reps: '10-12', rest: '60s' },
          { name: 'Shoulder Press', sets: 3, reps: '10-12', rest: '60s' },
          { name: 'Bicep Curls', sets: 3, reps: '12', rest: '45s' },
        ]},
        { day: 'Day 2', focus: 'Lower Body Strength', exercises: [
          { name: 'Goblet Squats', sets: 3, reps: '10-12', rest: '75s' },
          { name: 'Romanian Deadlift', sets: 3, reps: '10', rest: '75s' },
          { name: 'Walking Lunges', sets: 3, reps: '10 each', rest: '60s' },
          { name: 'Calf Raises', sets: 3, reps: '15', rest: '45s' },
        ]},
        { day: 'Day 3', focus: 'Cardio + Core', exercises: [
          { name: 'Treadmill Run', sets: 1, reps: '20 min', rest: '-' },
          { name: 'Russian Twists', sets: 3, reps: '15 each', rest: '30s' },
          { name: 'Leg Raises', sets: 3, reps: '12', rest: '30s' },
          { name: 'Plank Hold', sets: 3, reps: '45s', rest: '30s' },
        ]},
        { day: 'Day 4', focus: 'Full Body Circuit', exercises: [
          { name: 'Burpees', sets: 3, reps: '10', rest: '45s' },
          { name: 'Kettlebell Swings', sets: 3, reps: '15', rest: '45s' },
          { name: 'Push-Ups', sets: 3, reps: '12', rest: '30s' },
          { name: 'Squat Jumps', sets: 3, reps: '10', rest: '45s' },
        ]},
      ],
      5: [
        { day: 'Day 1', focus: 'Upper Body Push', exercises: [
          { name: 'Bench Press', sets: 3, reps: '10', rest: '75s' },
          { name: 'Overhead Press', sets: 3, reps: '10', rest: '75s' },
          { name: 'Tricep Dips', sets: 3, reps: '10', rest: '60s' },
          { name: 'Lateral Raises', sets: 3, reps: '12', rest: '45s' },
        ]},
        { day: 'Day 2', focus: 'Upper Body Pull', exercises: [
          { name: 'Barbell Rows', sets: 3, reps: '10', rest: '75s' },
          { name: 'Pull-Ups', sets: 3, reps: '8', rest: '75s' },
          { name: 'Face Pulls', sets: 3, reps: '15', rest: '45s' },
          { name: 'Barbell Curls', sets: 3, reps: '10', rest: '45s' },
        ]},
        { day: 'Day 3', focus: 'Lower Body', exercises: [
          { name: 'Squats', sets: 4, reps: '8-10', rest: '90s' },
          { name: 'Romanian Deadlift', sets: 3, reps: '10', rest: '75s' },
          { name: 'Walking Lunges', sets: 3, reps: '10 each', rest: '60s' },
          { name: 'Calf Raises', sets: 3, reps: '15', rest: '45s' },
        ]},
        { day: 'Day 4', focus: 'Cardio + Core', exercises: [
          { name: 'HIIT Circuit', sets: 1, reps: '20 min', rest: '-' },
          { name: 'Plank Variations', sets: 3, reps: '45s each', rest: '30s' },
          { name: 'Ab Wheel Rollouts', sets: 3, reps: '10', rest: '45s' },
        ]},
        { day: 'Day 5', focus: 'Full Body Functional', exercises: [
          { name: 'Kettlebell Swings', sets: 3, reps: '15', rest: '60s' },
          { name: 'Box Jumps', sets: 3, reps: '10', rest: '60s' },
          { name: 'Farmer Walks', sets: 3, reps: '40m', rest: '45s' },
          { name: 'Battle Ropes', sets: 3, reps: '30s', rest: '45s' },
        ]},
      ],
      6: [
        { day: 'Day 1', focus: 'Chest + Triceps', exercises: [
          { name: 'Bench Press', sets: 3, reps: '10', rest: '75s' },
          { name: 'Incline Press', sets: 3, reps: '10', rest: '60s' },
          { name: 'Tricep Dips', sets: 3, reps: '10', rest: '60s' },
        ]},
        { day: 'Day 2', focus: 'Back + Biceps', exercises: [
          { name: 'Barbell Rows', sets: 3, reps: '10', rest: '75s' },
          { name: 'Pull-Ups', sets: 3, reps: '8', rest: '75s' },
          { name: 'Barbell Curls', sets: 3, reps: '10', rest: '45s' },
        ]},
        { day: 'Day 3', focus: 'Legs', exercises: [
          { name: 'Squats', sets: 4, reps: '8-10', rest: '90s' },
          { name: 'Romanian Deadlift', sets: 3, reps: '10', rest: '75s' },
          { name: 'Lunges', sets: 3, reps: '10 each', rest: '60s' },
        ]},
        { day: 'Day 4', focus: 'Shoulders + Core', exercises: [
          { name: 'Overhead Press', sets: 3, reps: '10', rest: '75s' },
          { name: 'Lateral Raises', sets: 3, reps: '12', rest: '45s' },
          { name: 'Plank Hold', sets: 3, reps: '60s', rest: '30s' },
        ]},
        { day: 'Day 5', focus: 'Cardio', exercises: [
          { name: 'HIIT Circuit', sets: 1, reps: '25 min', rest: '-' },
          { name: 'Jump Rope', sets: 3, reps: '60s', rest: '30s' },
          { name: 'Rowing', sets: 1, reps: '10 min', rest: '-' },
        ]},
        { day: 'Day 6', focus: 'Full Body Circuit', exercises: [
          { name: 'Burpees', sets: 3, reps: '10', rest: '45s' },
          { name: 'Kettlebell Swings', sets: 3, reps: '15', rest: '45s' },
          { name: 'Farmer Walks', sets: 3, reps: '40m', rest: '45s' },
          { name: 'Mountain Climbers', sets: 3, reps: '15 each', rest: '30s' },
        ]},
      ],
    },
  }

  const plan = plans[goal]?.[days] || plans['general'][3]

  // Adjust sets/reps based on experience level
  return plan.map(dayPlan => ({
    ...dayPlan,
    exercises: dayPlan.exercises.map(ex => {
      if (level === 'beginner') {
        return { ...ex, sets: Math.max(2, ex.sets - 1), rest: ex.rest === '-' ? '-' : `${parseInt(ex.rest) + 15}s` }
      }
      if (level === 'advanced') {
        return { ...ex, sets: ex.sets + 1, rest: ex.rest === '-' ? '-' : `${Math.max(30, parseInt(ex.rest) - 15)}s` }
      }
      return ex
    }),
  }))
}

function DownloadModal({ open, onOpenChange, plan, goal, level, days }: {
  open: boolean
  onOpenChange: (open: boolean) => void
  plan: DayPlan[]
  goal: FitnessGoal
  level: ExperienceLevel
  days: AvailableDays
}) {
  const goalLabel = goalOptions.find(g => g.value === goal)?.label || goal
  const levelLabel = levelOptions.find(l => l.value === level)?.label || level

  const textSummary = `AVENGER FITNESS — WORKOUT PLAN
================================
Goal: ${goalLabel}
Level: ${levelLabel}
Days: ${days} per week

${plan.map(day => `${day.day}: ${day.focus}
${day.exercises.map(ex => `  • ${ex.name}: ${ex.sets} sets × ${ex.reps} (rest: ${ex.rest})`).join('\n')}
`).join('\n')}
Generated at Avenger The Fitness Temple — avengerfitness.com
`


  const handleDownload = () => {
    const blob = new Blob([textSummary], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `forge-workout-plan-${goal}-${days}days.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#111111]/95 backdrop-blur-xl border-[#d4a017]/20 text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Download className="h-5 w-5 text-[#d4a017]" />
            Download Workout Plan
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="rounded-xl bg-black/30 border border-white/[0.06] p-4 max-h-72 overflow-y-auto">
            <pre className="text-xs text-gray-300 whitespace-pre-wrap font-mono leading-relaxed">
              {textSummary}
            </pre>
          </div>

          <Button
            onClick={handleDownload}
            className="w-full bg-gradient-to-r from-[#d4a017] to-[#e8b923] text-black font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-[#d4a017]/25 transition-all duration-300"
          >
            <Download className="h-4 w-4 mr-2" />
            Download as .txt
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function WorkoutPlan() {
  const [goal, setGoal] = useState<FitnessGoal>('general')
  const [level, setLevel] = useState<ExperienceLevel>('intermediate')
  const [days, setDays] = useState<AvailableDays>(4)
  const [generatedPlan, setGeneratedPlan] = useState<DayPlan[] | null>(null)
  const [downloadOpen, setDownloadOpen] = useState(false)

  const handleGenerate = () => {
    const plan = generatePlan(goal, level, days)
    setGeneratedPlan(plan)
  }

  const handleReset = () => {
    setGeneratedPlan(null)
    setGoal('general')
    setLevel('intermediate')
    setDays(4)
  }

  return (
    <section className="relative py-20 md:py-28 bg-[#0a0a0a] overflow-hidden" id="workout-plan">
      {/* Decorative section number */}
      <span className="absolute top-8 right-8 text-[200px] font-black text-white/[0.02] pointer-events-none select-none leading-none">16</span>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-10 md:mb-14">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#d4a017]/60">16 — Workout Plan</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2" style={{ textShadow: '0 0 40px rgba(212, 160, 23, 0.1)' }}>
            YOUR PERSONALIZED <span className="text-[#e8b923]">PLAN</span>
          </h2>
          <div className="mx-auto mt-4 flex items-center gap-2">
            <div className="h-px w-8 bg-[#d4a017]/30" />
            <div className="h-1 w-8 rounded-full bg-gradient-to-r from-[#d4a017] to-[#e8b923]" />
            <div className="h-px w-8 bg-[#d4a017]/30" />
            <div className="size-1.5 rotate-45 bg-[#d4a017]" />
            <div className="h-px w-8 bg-[#d4a017]/30" />
            <div className="h-1 w-8 rounded-full bg-gradient-to-r from-[#e8b923] to-[#d4a017]" />
            <div className="h-px w-8 bg-[#d4a017]/30" />
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-6">
            Select your preferences and get a customized workout plan tailored to your goals and schedule.
          </p>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          {!generatedPlan ? (
            <motion.div
              key="selector"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-3xl mx-auto"
            >
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6 md:p-8 space-y-8">
                {/* Fitness Goal */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                    <Target className="h-4 w-4 text-[#d4a017]" />
                    Fitness Goal
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                    {goalOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setGoal(opt.value)}
                        className={cn(
                          'flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border',
                          goal === opt.value
                            ? 'bg-gradient-to-r from-[#d4a017] to-[#e8b923] text-black border-transparent shadow-lg shadow-[#d4a017]/20'
                            : 'bg-white/[0.04] text-gray-400 border-white/[0.08] hover:border-[#d4a017]/40 hover:text-[#e8b923]'
                        )}
                      >
                        <span className="text-base">{opt.icon}</span>
                        <span className="hidden sm:inline">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Experience Level */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                    <Dumbbell className="h-4 w-4 text-[#d4a017]" />
                    Experience Level
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {levelOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setLevel(opt.value)}
                        className={cn(
                          'px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border text-center',
                          level === opt.value
                            ? 'bg-gradient-to-r from-[#d4a017] to-[#e8b923] text-black border-transparent shadow-lg shadow-[#d4a017]/20'
                            : 'bg-white/[0.04] text-gray-400 border-white/[0.08] hover:border-[#d4a017]/40 hover:text-[#e8b923]'
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Available Days */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                    <Clock className="h-4 w-4 text-[#d4a017]" />
                    Available Days Per Week
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {daysOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setDays(opt.value)}
                        className={cn(
                          'px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border text-center',
                          days === opt.value
                            ? 'bg-gradient-to-r from-[#d4a017] to-[#e8b923] text-black border-transparent shadow-lg shadow-[#d4a017]/20'
                            : 'bg-white/[0.04] text-gray-400 border-white/[0.08] hover:border-[#d4a017]/40 hover:text-[#e8b923]'
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <button
                  onClick={handleGenerate}
                  className="w-full py-3.5 rounded-xl text-base font-bold bg-gradient-to-r from-[#d4a017] to-[#e8b923] text-black hover:shadow-lg hover:shadow-[#d4a017]/25 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <Flame className="h-5 w-5" />
                  Generate Plan
                  <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="plan"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* Plan header with info + actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d4a017]/15">
                    <Flame className="h-5 w-5 text-[#e8b923]" />
                  </div>
                  <div>
                    <p className="text-white font-bold">{goalOptions.find(g => g.value === goal)?.icon} {goalOptions.find(g => g.value === goal)?.label} Plan</p>
                    <p className="text-gray-500 text-sm">{levelOptions.find(l => l.value === level)?.label} • {days} days/week</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-white/[0.04] text-gray-400 border border-white/[0.08] hover:border-[#d4a017]/40 hover:text-[#e8b923] transition-all duration-200"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Reset
                  </button>
                  <button
                    onClick={() => setDownloadOpen(true)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#d4a017] to-[#e8b923] text-black hover:shadow-lg hover:shadow-[#d4a017]/25 transition-all duration-200"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download Plan
                  </button>
                </div>
              </div>

              {/* Weekly Schedule Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {generatedPlan.map((dayPlan, index) => (
                  <motion.div
                    key={dayPlan.day}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.4 }}
                    className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl overflow-hidden hover:border-[#d4a017]/30 hover:shadow-[0_0_30px_-5px_rgba(212,160,23,0.12)] transition-all duration-300"
                  >
                    {/* Day header */}
                    <div className="px-5 py-3.5 bg-gradient-to-r from-[#d4a017]/10 via-[#e8b923]/5 to-transparent border-b border-white/[0.06]">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-white">{dayPlan.day}</h4>
                        <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-[#d4a017]/15 text-[#e8b923] border border-[#d4a017]/20">
                          {dayPlan.focus}
                        </span>
                      </div>
                    </div>

                    {/* Exercises */}
                    <div className="p-4 space-y-2">
                      {dayPlan.exercises.map((exercise, exIdx) => (
                        <div key={exercise.name} className="flex items-start gap-2.5 py-2 px-3 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:border-[#d4a017]/15 transition-colors">
                          <span className="flex items-center justify-center w-5 h-5 shrink-0 rounded-md bg-[#d4a017]/10 text-[#d4a017] text-[10px] font-bold mt-0.5">
                            {exIdx + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-gray-200 truncate">{exercise.name}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[10px] text-[#e8b923] font-semibold">{exercise.sets} × {exercise.reps}</span>
                              {exercise.rest !== '-' && (
                                <>
                                  <span className="text-[10px] text-gray-600">•</span>
                                  <span className="text-[10px] text-gray-500">Rest: {exercise.rest}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom accent */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-2xl bg-gradient-to-r from-transparent via-[#d4a017]/0 to-transparent group-hover:via-[#d4a017]/40 transition-all duration-500" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Download Modal */}
      {generatedPlan && (
        <DownloadModal
          open={downloadOpen}
          onOpenChange={setDownloadOpen}
          plan={generatedPlan}
          goal={goal}
          level={level}
          days={days}
        />
      )}
    </section>
  )
}
