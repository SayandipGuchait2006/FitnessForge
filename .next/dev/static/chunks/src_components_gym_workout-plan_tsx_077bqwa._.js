(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/gym/workout-plan.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WorkoutPlan",
    ()=>WorkoutPlan
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/target.js [app-client] (ecmascript) <export default as Target>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dumbbell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dumbbell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/dumbbell.js [app-client] (ecmascript) <export default as Dumbbell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/flame.js [app-client] (ecmascript) <export default as Flame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$gym$2f$scroll$2d$reveal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/gym/scroll-reveal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
const goalOptions = [
    {
        value: 'weight-loss',
        label: 'Weight Loss',
        icon: '🔥'
    },
    {
        value: 'muscle-gain',
        label: 'Muscle Gain',
        icon: '💪'
    },
    {
        value: 'endurance',
        label: 'Endurance',
        icon: '🏃'
    },
    {
        value: 'flexibility',
        label: 'Flexibility',
        icon: '🧘'
    },
    {
        value: 'general',
        label: 'General Fitness',
        icon: '⚡'
    }
];
const levelOptions = [
    {
        value: 'beginner',
        label: 'Beginner'
    },
    {
        value: 'intermediate',
        label: 'Intermediate'
    },
    {
        value: 'advanced',
        label: 'Advanced'
    }
];
const daysOptions = [
    {
        value: 3,
        label: '3 Days'
    },
    {
        value: 4,
        label: '4 Days'
    },
    {
        value: 5,
        label: '5 Days'
    },
    {
        value: 6,
        label: '6 Days'
    }
];
// Workout plan data based on goal + days
function generatePlan(goal, level, days) {
    const restExercise = {
        name: 'Active Recovery / Stretching',
        sets: 1,
        reps: '20 min',
        rest: '-'
    };
    const plans = {
        'weight-loss': {
            3: [
                {
                    day: 'Day 1',
                    focus: 'Full Body HIIT',
                    exercises: [
                        {
                            name: 'Burpees',
                            sets: 4,
                            reps: '15',
                            rest: '30s'
                        },
                        {
                            name: 'Mountain Climbers',
                            sets: 4,
                            reps: '20 each',
                            rest: '30s'
                        },
                        {
                            name: 'Jump Squats',
                            sets: 4,
                            reps: '15',
                            rest: '45s'
                        },
                        {
                            name: 'High Knees',
                            sets: 3,
                            reps: '30s',
                            rest: '30s'
                        },
                        {
                            name: 'Plank Hold',
                            sets: 3,
                            reps: '45s',
                            rest: '30s'
                        }
                    ]
                },
                {
                    day: 'Day 2',
                    focus: 'Cardio + Core',
                    exercises: [
                        {
                            name: 'Treadmill Intervals',
                            sets: 1,
                            reps: '20 min',
                            rest: '-'
                        },
                        {
                            name: 'Russian Twists',
                            sets: 3,
                            reps: '20 each',
                            rest: '30s'
                        },
                        {
                            name: 'Bicycle Crunches',
                            sets: 3,
                            reps: '15 each',
                            rest: '30s'
                        },
                        {
                            name: 'Leg Raises',
                            sets: 3,
                            reps: '12',
                            rest: '30s'
                        },
                        {
                            name: 'Dead Bug',
                            sets: 3,
                            reps: '10 each',
                            rest: '30s'
                        }
                    ]
                },
                {
                    day: 'Day 3',
                    focus: 'Metabolic Circuit',
                    exercises: [
                        {
                            name: 'Kettlebell Swings',
                            sets: 4,
                            reps: '15',
                            rest: '30s'
                        },
                        {
                            name: 'Box Jumps',
                            sets: 3,
                            reps: '12',
                            rest: '45s'
                        },
                        {
                            name: 'Battle Ropes',
                            sets: 4,
                            reps: '30s',
                            rest: '30s'
                        },
                        {
                            name: 'Sprint Intervals',
                            sets: 5,
                            reps: '30s on/30s off',
                            rest: '-'
                        },
                        {
                            name: 'Plank to Push-Up',
                            sets: 3,
                            reps: '10 each',
                            rest: '30s'
                        }
                    ]
                }
            ],
            4: [
                {
                    day: 'Day 1',
                    focus: 'Upper Body HIIT',
                    exercises: [
                        {
                            name: 'Push-Up Variations',
                            sets: 4,
                            reps: '12',
                            rest: '30s'
                        },
                        {
                            name: 'Dumbbell Thrusters',
                            sets: 4,
                            reps: '10',
                            rest: '30s'
                        },
                        {
                            name: 'Renegade Rows',
                            sets: 3,
                            reps: '10 each',
                            rest: '30s'
                        },
                        {
                            name: 'Tricep Dips',
                            sets: 3,
                            reps: '12',
                            rest: '30s'
                        },
                        {
                            name: 'Plank Shoulder Taps',
                            sets: 3,
                            reps: '10 each',
                            rest: '30s'
                        }
                    ]
                },
                {
                    day: 'Day 2',
                    focus: 'Lower Body HIIT',
                    exercises: [
                        {
                            name: 'Jump Squats',
                            sets: 4,
                            reps: '15',
                            rest: '30s'
                        },
                        {
                            name: 'Walking Lunges',
                            sets: 3,
                            reps: '12 each',
                            rest: '30s'
                        },
                        {
                            name: 'Skater Jumps',
                            sets: 4,
                            reps: '10 each',
                            rest: '30s'
                        },
                        {
                            name: 'Calf Raises',
                            sets: 3,
                            reps: '20',
                            rest: '30s'
                        },
                        {
                            name: 'Wall Sit',
                            sets: 3,
                            reps: '45s',
                            rest: '30s'
                        }
                    ]
                },
                {
                    day: 'Day 3',
                    focus: 'Cardio Burn',
                    exercises: [
                        {
                            name: 'Treadmill Intervals',
                            sets: 1,
                            reps: '25 min',
                            rest: '-'
                        },
                        {
                            name: 'Rowing Sprints',
                            sets: 5,
                            reps: '200m',
                            rest: '60s'
                        },
                        {
                            name: 'Cycling Intervals',
                            sets: 1,
                            reps: '15 min',
                            rest: '-'
                        },
                        {
                            name: 'Jump Rope',
                            sets: 4,
                            reps: '60s',
                            rest: '30s'
                        }
                    ]
                },
                {
                    day: 'Day 4',
                    focus: 'Full Body Circuit',
                    exercises: [
                        {
                            name: 'Burpees',
                            sets: 4,
                            reps: '12',
                            rest: '30s'
                        },
                        {
                            name: 'Kettlebell Swings',
                            sets: 4,
                            reps: '15',
                            rest: '30s'
                        },
                        {
                            name: 'Mountain Climbers',
                            sets: 3,
                            reps: '20 each',
                            rest: '30s'
                        },
                        {
                            name: 'Box Jumps',
                            sets: 3,
                            reps: '10',
                            rest: '45s'
                        },
                        {
                            name: 'Plank Hold',
                            sets: 3,
                            reps: '60s',
                            rest: '30s'
                        }
                    ]
                }
            ],
            5: [
                {
                    day: 'Day 1',
                    focus: 'Upper Body HIIT',
                    exercises: [
                        {
                            name: 'Push-Up Variations',
                            sets: 4,
                            reps: '12',
                            rest: '30s'
                        },
                        {
                            name: 'Dumbbell Thrusters',
                            sets: 4,
                            reps: '10',
                            rest: '30s'
                        },
                        {
                            name: 'Renegade Rows',
                            sets: 3,
                            reps: '10 each',
                            rest: '30s'
                        },
                        {
                            name: 'Tricep Dips',
                            sets: 3,
                            reps: '12',
                            rest: '30s'
                        }
                    ]
                },
                {
                    day: 'Day 2',
                    focus: 'Lower Body HIIT',
                    exercises: [
                        {
                            name: 'Jump Squats',
                            sets: 4,
                            reps: '15',
                            rest: '30s'
                        },
                        {
                            name: 'Walking Lunges',
                            sets: 3,
                            reps: '12 each',
                            rest: '30s'
                        },
                        {
                            name: 'Skater Jumps',
                            sets: 4,
                            reps: '10 each',
                            rest: '30s'
                        },
                        {
                            name: 'Calf Raises',
                            sets: 3,
                            reps: '20',
                            rest: '30s'
                        }
                    ]
                },
                {
                    day: 'Day 3',
                    focus: 'Cardio + Core',
                    exercises: [
                        {
                            name: 'Treadmill Intervals',
                            sets: 1,
                            reps: '20 min',
                            rest: '-'
                        },
                        {
                            name: 'Russian Twists',
                            sets: 3,
                            reps: '20 each',
                            rest: '30s'
                        },
                        {
                            name: 'Leg Raises',
                            sets: 3,
                            reps: '12',
                            rest: '30s'
                        },
                        {
                            name: 'Bicycle Crunches',
                            sets: 3,
                            reps: '15 each',
                            rest: '30s'
                        }
                    ]
                },
                {
                    day: 'Day 4',
                    focus: 'Full Body Circuit',
                    exercises: [
                        {
                            name: 'Burpees',
                            sets: 4,
                            reps: '12',
                            rest: '30s'
                        },
                        {
                            name: 'Kettlebell Swings',
                            sets: 4,
                            reps: '15',
                            rest: '30s'
                        },
                        {
                            name: 'Battle Ropes',
                            sets: 4,
                            reps: '30s',
                            rest: '30s'
                        },
                        {
                            name: 'Mountain Climbers',
                            sets: 3,
                            reps: '20 each',
                            rest: '30s'
                        }
                    ]
                },
                {
                    day: 'Day 5',
                    focus: 'Metabolic Finisher',
                    exercises: [
                        {
                            name: 'Sprint Intervals',
                            sets: 6,
                            reps: '30s on/30s off',
                            rest: '-'
                        },
                        {
                            name: 'Box Jumps',
                            sets: 3,
                            reps: '10',
                            rest: '45s'
                        },
                        {
                            name: 'Plank to Push-Up',
                            sets: 3,
                            reps: '10 each',
                            rest: '30s'
                        },
                        {
                            name: 'Rowing Sprints',
                            sets: 4,
                            reps: '200m',
                            rest: '60s'
                        }
                    ]
                }
            ],
            6: [
                {
                    day: 'Day 1',
                    focus: 'Upper Body HIIT',
                    exercises: [
                        {
                            name: 'Push-Up Variations',
                            sets: 4,
                            reps: '12',
                            rest: '30s'
                        },
                        {
                            name: 'Dumbbell Thrusters',
                            sets: 4,
                            reps: '10',
                            rest: '30s'
                        },
                        {
                            name: 'Renegade Rows',
                            sets: 3,
                            reps: '10 each',
                            rest: '30s'
                        },
                        {
                            name: 'Tricep Dips',
                            sets: 3,
                            reps: '12',
                            rest: '30s'
                        }
                    ]
                },
                {
                    day: 'Day 2',
                    focus: 'Lower Body HIIT',
                    exercises: [
                        {
                            name: 'Jump Squats',
                            sets: 4,
                            reps: '15',
                            rest: '30s'
                        },
                        {
                            name: 'Walking Lunges',
                            sets: 3,
                            reps: '12 each',
                            rest: '30s'
                        },
                        {
                            name: 'Skater Jumps',
                            sets: 4,
                            reps: '10 each',
                            rest: '30s'
                        },
                        {
                            name: 'Calf Raises',
                            sets: 3,
                            reps: '20',
                            rest: '30s'
                        }
                    ]
                },
                {
                    day: 'Day 3',
                    focus: 'Cardio Endurance',
                    exercises: [
                        {
                            name: 'Treadmill Intervals',
                            sets: 1,
                            reps: '25 min',
                            rest: '-'
                        },
                        {
                            name: 'Rowing Sprints',
                            sets: 5,
                            reps: '200m',
                            rest: '60s'
                        },
                        {
                            name: 'Jump Rope',
                            sets: 4,
                            reps: '60s',
                            rest: '30s'
                        }
                    ]
                },
                {
                    day: 'Day 4',
                    focus: 'Core + Abs',
                    exercises: [
                        {
                            name: 'Russian Twists',
                            sets: 3,
                            reps: '20 each',
                            rest: '30s'
                        },
                        {
                            name: 'Leg Raises',
                            sets: 3,
                            reps: '12',
                            rest: '30s'
                        },
                        {
                            name: 'Plank Hold',
                            sets: 3,
                            reps: '60s',
                            rest: '30s'
                        },
                        {
                            name: 'Dead Bug',
                            sets: 3,
                            reps: '10 each',
                            rest: '30s'
                        }
                    ]
                },
                {
                    day: 'Day 5',
                    focus: 'Full Body Circuit',
                    exercises: [
                        {
                            name: 'Burpees',
                            sets: 4,
                            reps: '12',
                            rest: '30s'
                        },
                        {
                            name: 'Kettlebell Swings',
                            sets: 4,
                            reps: '15',
                            rest: '30s'
                        },
                        {
                            name: 'Battle Ropes',
                            sets: 4,
                            reps: '30s',
                            rest: '30s'
                        },
                        {
                            name: 'Mountain Climbers',
                            sets: 3,
                            reps: '20 each',
                            rest: '30s'
                        }
                    ]
                },
                {
                    day: 'Day 6',
                    focus: 'Metabolic Finisher',
                    exercises: [
                        {
                            name: 'Sprint Intervals',
                            sets: 6,
                            reps: '30s on/30s off',
                            rest: '-'
                        },
                        {
                            name: 'Box Jumps',
                            sets: 3,
                            reps: '10',
                            rest: '45s'
                        },
                        {
                            name: 'Cycling Intervals',
                            sets: 1,
                            reps: '15 min',
                            rest: '-'
                        },
                        {
                            name: 'Plank to Push-Up',
                            sets: 3,
                            reps: '10 each',
                            rest: '30s'
                        }
                    ]
                }
            ]
        },
        'muscle-gain': {
            3: [
                {
                    day: 'Day 1',
                    focus: 'Push (Chest, Shoulders, Triceps)',
                    exercises: [
                        {
                            name: 'Barbell Bench Press',
                            sets: 4,
                            reps: '8-10',
                            rest: '90s'
                        },
                        {
                            name: 'Overhead Press',
                            sets: 4,
                            reps: '8-10',
                            rest: '90s'
                        },
                        {
                            name: 'Incline Dumbbell Press',
                            sets: 3,
                            reps: '10-12',
                            rest: '75s'
                        },
                        {
                            name: 'Lateral Raises',
                            sets: 3,
                            reps: '12-15',
                            rest: '60s'
                        },
                        {
                            name: 'Tricep Dips',
                            sets: 3,
                            reps: '10-12',
                            rest: '60s'
                        }
                    ]
                },
                {
                    day: 'Day 2',
                    focus: 'Pull (Back, Biceps)',
                    exercises: [
                        {
                            name: 'Barbell Rows',
                            sets: 4,
                            reps: '8-10',
                            rest: '90s'
                        },
                        {
                            name: 'Weighted Pull-Ups',
                            sets: 4,
                            reps: '6-8',
                            rest: '90s'
                        },
                        {
                            name: 'Seated Cable Row',
                            sets: 3,
                            reps: '10-12',
                            rest: '75s'
                        },
                        {
                            name: 'Barbell Curls',
                            sets: 3,
                            reps: '10-12',
                            rest: '60s'
                        },
                        {
                            name: 'Hammer Curls',
                            sets: 3,
                            reps: '12-15',
                            rest: '60s'
                        }
                    ]
                },
                {
                    day: 'Day 3',
                    focus: 'Legs + Core',
                    exercises: [
                        {
                            name: 'Barbell Back Squat',
                            sets: 5,
                            reps: '5-8',
                            rest: '120s'
                        },
                        {
                            name: 'Romanian Deadlift',
                            sets: 4,
                            reps: '8-10',
                            rest: '90s'
                        },
                        {
                            name: 'Bulgarian Split Squat',
                            sets: 3,
                            reps: '10-12',
                            rest: '75s'
                        },
                        {
                            name: 'Leg Press',
                            sets: 3,
                            reps: '12-15',
                            rest: '75s'
                        },
                        {
                            name: 'Hanging Leg Raises',
                            sets: 3,
                            reps: '12',
                            rest: '60s'
                        }
                    ]
                }
            ],
            4: [
                {
                    day: 'Day 1',
                    focus: 'Chest + Triceps',
                    exercises: [
                        {
                            name: 'Barbell Bench Press',
                            sets: 4,
                            reps: '8-10',
                            rest: '90s'
                        },
                        {
                            name: 'Incline Dumbbell Press',
                            sets: 3,
                            reps: '10-12',
                            rest: '75s'
                        },
                        {
                            name: 'Cable Flyes',
                            sets: 3,
                            reps: '12-15',
                            rest: '60s'
                        },
                        {
                            name: 'Skull Crushers',
                            sets: 3,
                            reps: '10-12',
                            rest: '60s'
                        },
                        {
                            name: 'Tricep Pushdowns',
                            sets: 3,
                            reps: '12-15',
                            rest: '60s'
                        }
                    ]
                },
                {
                    day: 'Day 2',
                    focus: 'Back + Biceps',
                    exercises: [
                        {
                            name: 'Deadlift',
                            sets: 4,
                            reps: '5-8',
                            rest: '120s'
                        },
                        {
                            name: 'Barbell Rows',
                            sets: 4,
                            reps: '8-10',
                            rest: '90s'
                        },
                        {
                            name: 'Pull-Ups',
                            sets: 3,
                            reps: '8-10',
                            rest: '75s'
                        },
                        {
                            name: 'Barbell Curls',
                            sets: 3,
                            reps: '10-12',
                            rest: '60s'
                        },
                        {
                            name: 'Preacher Curls',
                            sets: 3,
                            reps: '12-15',
                            rest: '60s'
                        }
                    ]
                },
                {
                    day: 'Day 3',
                    focus: 'Shoulders + Abs',
                    exercises: [
                        {
                            name: 'Overhead Press',
                            sets: 4,
                            reps: '8-10',
                            rest: '90s'
                        },
                        {
                            name: 'Arnold Press',
                            sets: 3,
                            reps: '10-12',
                            rest: '75s'
                        },
                        {
                            name: 'Lateral Raises',
                            sets: 4,
                            reps: '12-15',
                            rest: '60s'
                        },
                        {
                            name: 'Face Pulls',
                            sets: 3,
                            reps: '15-20',
                            rest: '60s'
                        },
                        {
                            name: 'Cable Crunches',
                            sets: 3,
                            reps: '15',
                            rest: '60s'
                        }
                    ]
                },
                {
                    day: 'Day 4',
                    focus: 'Legs',
                    exercises: [
                        {
                            name: 'Barbell Back Squat',
                            sets: 5,
                            reps: '5-8',
                            rest: '120s'
                        },
                        {
                            name: 'Romanian Deadlift',
                            sets: 4,
                            reps: '8-10',
                            rest: '90s'
                        },
                        {
                            name: 'Leg Press',
                            sets: 3,
                            reps: '12-15',
                            rest: '75s'
                        },
                        {
                            name: 'Walking Lunges',
                            sets: 3,
                            reps: '12 each',
                            rest: '75s'
                        },
                        {
                            name: 'Calf Raises',
                            sets: 4,
                            reps: '15-20',
                            rest: '60s'
                        }
                    ]
                }
            ],
            5: [
                {
                    day: 'Day 1',
                    focus: 'Chest',
                    exercises: [
                        {
                            name: 'Barbell Bench Press',
                            sets: 4,
                            reps: '8-10',
                            rest: '90s'
                        },
                        {
                            name: 'Incline Dumbbell Press',
                            sets: 4,
                            reps: '10-12',
                            rest: '75s'
                        },
                        {
                            name: 'Cable Flyes',
                            sets: 3,
                            reps: '12-15',
                            rest: '60s'
                        },
                        {
                            name: 'Dips',
                            sets: 3,
                            reps: '10-12',
                            rest: '60s'
                        }
                    ]
                },
                {
                    day: 'Day 2',
                    focus: 'Back',
                    exercises: [
                        {
                            name: 'Deadlift',
                            sets: 4,
                            reps: '5-8',
                            rest: '120s'
                        },
                        {
                            name: 'Barbell Rows',
                            sets: 4,
                            reps: '8-10',
                            rest: '90s'
                        },
                        {
                            name: 'Pull-Ups',
                            sets: 3,
                            reps: '8-10',
                            rest: '75s'
                        },
                        {
                            name: 'Seated Cable Row',
                            sets: 3,
                            reps: '10-12',
                            rest: '75s'
                        }
                    ]
                },
                {
                    day: 'Day 3',
                    focus: 'Shoulders + Arms',
                    exercises: [
                        {
                            name: 'Overhead Press',
                            sets: 4,
                            reps: '8-10',
                            rest: '90s'
                        },
                        {
                            name: 'Lateral Raises',
                            sets: 4,
                            reps: '12-15',
                            rest: '60s'
                        },
                        {
                            name: 'Barbell Curls',
                            sets: 3,
                            reps: '10-12',
                            rest: '60s'
                        },
                        {
                            name: 'Skull Crushers',
                            sets: 3,
                            reps: '10-12',
                            rest: '60s'
                        }
                    ]
                },
                {
                    day: 'Day 4',
                    focus: 'Legs',
                    exercises: [
                        {
                            name: 'Barbell Back Squat',
                            sets: 5,
                            reps: '5-8',
                            rest: '120s'
                        },
                        {
                            name: 'Romanian Deadlift',
                            sets: 4,
                            reps: '8-10',
                            rest: '90s'
                        },
                        {
                            name: 'Bulgarian Split Squat',
                            sets: 3,
                            reps: '10-12',
                            rest: '75s'
                        },
                        {
                            name: 'Calf Raises',
                            sets: 4,
                            reps: '15-20',
                            rest: '60s'
                        }
                    ]
                },
                {
                    day: 'Day 5',
                    focus: 'Full Body Power',
                    exercises: [
                        {
                            name: 'Power Clean',
                            sets: 4,
                            reps: '5',
                            rest: '120s'
                        },
                        {
                            name: 'Front Squat',
                            sets: 3,
                            reps: '8',
                            rest: '90s'
                        },
                        {
                            name: 'Weighted Pull-Ups',
                            sets: 3,
                            reps: '6-8',
                            rest: '90s'
                        },
                        {
                            name: 'Farmer Walks',
                            sets: 3,
                            reps: '40m',
                            rest: '60s'
                        }
                    ]
                }
            ],
            6: [
                {
                    day: 'Day 1',
                    focus: 'Chest + Triceps',
                    exercises: [
                        {
                            name: 'Barbell Bench Press',
                            sets: 4,
                            reps: '8-10',
                            rest: '90s'
                        },
                        {
                            name: 'Incline Dumbbell Press',
                            sets: 3,
                            reps: '10-12',
                            rest: '75s'
                        },
                        {
                            name: 'Cable Flyes',
                            sets: 3,
                            reps: '12-15',
                            rest: '60s'
                        },
                        {
                            name: 'Skull Crushers',
                            sets: 3,
                            reps: '10-12',
                            rest: '60s'
                        }
                    ]
                },
                {
                    day: 'Day 2',
                    focus: 'Back + Biceps',
                    exercises: [
                        {
                            name: 'Barbell Rows',
                            sets: 4,
                            reps: '8-10',
                            rest: '90s'
                        },
                        {
                            name: 'Pull-Ups',
                            sets: 3,
                            reps: '8-10',
                            rest: '75s'
                        },
                        {
                            name: 'Seated Cable Row',
                            sets: 3,
                            reps: '10-12',
                            rest: '75s'
                        },
                        {
                            name: 'Barbell Curls',
                            sets: 3,
                            reps: '10-12',
                            rest: '60s'
                        }
                    ]
                },
                {
                    day: 'Day 3',
                    focus: 'Legs (Quad Focus)',
                    exercises: [
                        {
                            name: 'Barbell Back Squat',
                            sets: 5,
                            reps: '5-8',
                            rest: '120s'
                        },
                        {
                            name: 'Leg Press',
                            sets: 3,
                            reps: '12-15',
                            rest: '75s'
                        },
                        {
                            name: 'Walking Lunges',
                            sets: 3,
                            reps: '12 each',
                            rest: '75s'
                        },
                        {
                            name: 'Calf Raises',
                            sets: 4,
                            reps: '15-20',
                            rest: '60s'
                        }
                    ]
                },
                {
                    day: 'Day 4',
                    focus: 'Shoulders + Abs',
                    exercises: [
                        {
                            name: 'Overhead Press',
                            sets: 4,
                            reps: '8-10',
                            rest: '90s'
                        },
                        {
                            name: 'Arnold Press',
                            sets: 3,
                            reps: '10-12',
                            rest: '75s'
                        },
                        {
                            name: 'Lateral Raises',
                            sets: 4,
                            reps: '12-15',
                            rest: '60s'
                        },
                        {
                            name: 'Hanging Leg Raises',
                            sets: 3,
                            reps: '12',
                            rest: '60s'
                        }
                    ]
                },
                {
                    day: 'Day 5',
                    focus: 'Legs (Hamstring Focus)',
                    exercises: [
                        {
                            name: 'Romanian Deadlift',
                            sets: 4,
                            reps: '8-10',
                            rest: '90s'
                        },
                        {
                            name: 'Bulgarian Split Squat',
                            sets: 3,
                            reps: '10-12',
                            rest: '75s'
                        },
                        {
                            name: 'Leg Curls',
                            sets: 3,
                            reps: '12-15',
                            rest: '60s'
                        },
                        {
                            name: 'Hip Thrusts',
                            sets: 3,
                            reps: '10-12',
                            rest: '75s'
                        }
                    ]
                },
                {
                    day: 'Day 6',
                    focus: 'Arms + Power',
                    exercises: [
                        {
                            name: 'Close Grip Bench Press',
                            sets: 3,
                            reps: '10-12',
                            rest: '60s'
                        },
                        {
                            name: 'Preacher Curls',
                            sets: 3,
                            reps: '10-12',
                            rest: '60s'
                        },
                        {
                            name: 'Hammer Curls',
                            sets: 3,
                            reps: '12-15',
                            rest: '60s'
                        },
                        {
                            name: 'Tricep Pushdowns',
                            sets: 3,
                            reps: '12-15',
                            rest: '60s'
                        }
                    ]
                }
            ]
        },
        'endurance': {
            3: [
                {
                    day: 'Day 1',
                    focus: 'Running Intervals',
                    exercises: [
                        {
                            name: 'Warm-Up Jog',
                            sets: 1,
                            reps: '10 min',
                            rest: '-'
                        },
                        {
                            name: 'Sprint Intervals',
                            sets: 8,
                            reps: '400m',
                            rest: '90s'
                        },
                        {
                            name: 'Cool-Down Jog',
                            sets: 1,
                            reps: '5 min',
                            rest: '-'
                        },
                        {
                            name: 'Stretching',
                            sets: 1,
                            reps: '10 min',
                            rest: '-'
                        }
                    ]
                },
                {
                    day: 'Day 2',
                    focus: 'Cross Training',
                    exercises: [
                        {
                            name: 'Cycling',
                            sets: 1,
                            reps: '30 min',
                            rest: '-'
                        },
                        {
                            name: 'Rowing',
                            sets: 1,
                            reps: '15 min',
                            rest: '-'
                        },
                        {
                            name: 'Bodyweight Circuit',
                            sets: 3,
                            reps: '10 each',
                            rest: '45s'
                        }
                    ]
                },
                {
                    day: 'Day 3',
                    focus: 'Long Run + Core',
                    exercises: [
                        {
                            name: 'Long Run',
                            sets: 1,
                            reps: '40-60 min',
                            rest: '-'
                        },
                        {
                            name: 'Plank Hold',
                            sets: 3,
                            reps: '60s',
                            rest: '30s'
                        },
                        {
                            name: 'Russian Twists',
                            sets: 3,
                            reps: '20 each',
                            rest: '30s'
                        }
                    ]
                }
            ],
            4: [
                {
                    day: 'Day 1',
                    focus: 'Tempo Run',
                    exercises: [
                        {
                            name: 'Warm-Up',
                            sets: 1,
                            reps: '10 min',
                            rest: '-'
                        },
                        {
                            name: 'Tempo Run',
                            sets: 1,
                            reps: '25 min',
                            rest: '-'
                        },
                        {
                            name: 'Cool-Down',
                            sets: 1,
                            reps: '5 min',
                            rest: '-'
                        }
                    ]
                },
                {
                    day: 'Day 2',
                    focus: 'Strength for Runners',
                    exercises: [
                        {
                            name: 'Goblet Squats',
                            sets: 3,
                            reps: '12',
                            rest: '60s'
                        },
                        {
                            name: 'Walking Lunges',
                            sets: 3,
                            reps: '10 each',
                            rest: '60s'
                        },
                        {
                            name: 'Single Leg Deadlift',
                            sets: 3,
                            reps: '10 each',
                            rest: '60s'
                        },
                        {
                            name: 'Calf Raises',
                            sets: 3,
                            reps: '15',
                            rest: '45s'
                        }
                    ]
                },
                {
                    day: 'Day 3',
                    focus: 'Interval Training',
                    exercises: [
                        {
                            name: 'Sprint Intervals',
                            sets: 8,
                            reps: '400m',
                            rest: '90s'
                        },
                        {
                            name: 'Hill Repeats',
                            sets: 6,
                            reps: '200m',
                            rest: '90s'
                        },
                        {
                            name: 'Core Work',
                            sets: 3,
                            reps: '45s each',
                            rest: '30s'
                        }
                    ]
                },
                {
                    day: 'Day 4',
                    focus: 'Long Run + Recovery',
                    exercises: [
                        {
                            name: 'Long Run',
                            sets: 1,
                            reps: '45-75 min',
                            rest: '-'
                        },
                        {
                            name: 'Foam Rolling',
                            sets: 1,
                            reps: '15 min',
                            rest: '-'
                        },
                        {
                            name: 'Yoga Flow',
                            sets: 1,
                            reps: '15 min',
                            rest: '-'
                        }
                    ]
                }
            ],
            5: [
                {
                    day: 'Day 1',
                    focus: 'Easy Run',
                    exercises: [
                        {
                            name: 'Easy Pace Run',
                            sets: 1,
                            reps: '30-40 min',
                            rest: '-'
                        },
                        {
                            name: 'Dynamic Stretching',
                            sets: 1,
                            reps: '10 min',
                            rest: '-'
                        }
                    ]
                },
                {
                    day: 'Day 2',
                    focus: 'Speed Work',
                    exercises: [
                        {
                            name: 'Warm-Up',
                            sets: 1,
                            reps: '10 min',
                            rest: '-'
                        },
                        {
                            name: 'Track Repeats',
                            sets: 6,
                            reps: '800m',
                            rest: '2 min'
                        },
                        {
                            name: 'Cool-Down',
                            sets: 1,
                            reps: '10 min',
                            rest: '-'
                        }
                    ]
                },
                {
                    day: 'Day 3',
                    focus: 'Cross Training',
                    exercises: [
                        {
                            name: 'Swimming',
                            sets: 1,
                            reps: '30 min',
                            rest: '-'
                        },
                        {
                            name: 'Core Circuit',
                            sets: 3,
                            reps: '10 each',
                            rest: '30s'
                        }
                    ]
                },
                {
                    day: 'Day 4',
                    focus: 'Tempo Run',
                    exercises: [
                        {
                            name: 'Warm-Up',
                            sets: 1,
                            reps: '10 min',
                            rest: '-'
                        },
                        {
                            name: 'Tempo Run',
                            sets: 1,
                            reps: '30 min',
                            rest: '-'
                        },
                        {
                            name: 'Cool-Down',
                            sets: 1,
                            reps: '5 min',
                            rest: '-'
                        }
                    ]
                },
                {
                    day: 'Day 5',
                    focus: 'Long Run',
                    exercises: [
                        {
                            name: 'Long Run',
                            sets: 1,
                            reps: '60-90 min',
                            rest: '-'
                        },
                        {
                            name: 'Foam Rolling',
                            sets: 1,
                            reps: '15 min',
                            rest: '-'
                        }
                    ]
                }
            ],
            6: [
                {
                    day: 'Day 1',
                    focus: 'Easy Run',
                    exercises: [
                        {
                            name: 'Easy Pace Run',
                            sets: 1,
                            reps: '30-40 min',
                            rest: '-'
                        },
                        {
                            name: 'Dynamic Stretching',
                            sets: 1,
                            reps: '10 min',
                            rest: '-'
                        }
                    ]
                },
                {
                    day: 'Day 2',
                    focus: 'Speed Work',
                    exercises: [
                        {
                            name: 'Track Repeats',
                            sets: 6,
                            reps: '800m',
                            rest: '2 min'
                        },
                        {
                            name: 'Strides',
                            sets: 4,
                            reps: '100m',
                            rest: '60s'
                        }
                    ]
                },
                {
                    day: 'Day 3',
                    focus: 'Strength',
                    exercises: [
                        {
                            name: 'Goblet Squats',
                            sets: 3,
                            reps: '12',
                            rest: '60s'
                        },
                        {
                            name: 'Single Leg Deadlift',
                            sets: 3,
                            reps: '10 each',
                            rest: '60s'
                        },
                        {
                            name: 'Step-Ups',
                            sets: 3,
                            reps: '10 each',
                            rest: '45s'
                        }
                    ]
                },
                {
                    day: 'Day 4',
                    focus: 'Tempo Run',
                    exercises: [
                        {
                            name: 'Tempo Run',
                            sets: 1,
                            reps: '30 min',
                            rest: '-'
                        },
                        {
                            name: 'Core Circuit',
                            sets: 3,
                            reps: '10 each',
                            rest: '30s'
                        }
                    ]
                },
                {
                    day: 'Day 5',
                    focus: 'Cross Training',
                    exercises: [
                        {
                            name: 'Cycling',
                            sets: 1,
                            reps: '30 min',
                            rest: '-'
                        },
                        {
                            name: 'Swimming',
                            sets: 1,
                            reps: '20 min',
                            rest: '-'
                        },
                        {
                            name: 'Yoga Flow',
                            sets: 1,
                            reps: '20 min',
                            rest: '-'
                        }
                    ]
                },
                {
                    day: 'Day 6',
                    focus: 'Long Run',
                    exercises: [
                        {
                            name: 'Long Run',
                            sets: 1,
                            reps: '75-100 min',
                            rest: '-'
                        },
                        {
                            name: 'Foam Rolling',
                            sets: 1,
                            reps: '15 min',
                            rest: '-'
                        }
                    ]
                }
            ]
        },
        'flexibility': {
            3: [
                {
                    day: 'Day 1',
                    focus: 'Dynamic Flow',
                    exercises: [
                        {
                            name: 'Sun Salutations',
                            sets: 5,
                            reps: 'Full flow',
                            rest: '-'
                        },
                        {
                            name: 'Warrior Sequence',
                            sets: 3,
                            reps: 'Hold 30s each',
                            rest: '15s'
                        },
                        {
                            name: 'Hip Openers',
                            sets: 3,
                            reps: 'Hold 45s each',
                            rest: '15s'
                        },
                        {
                            name: 'Forward Folds',
                            sets: 3,
                            reps: 'Hold 30s each',
                            rest: '15s'
                        }
                    ]
                },
                {
                    day: 'Day 2',
                    focus: 'Deep Stretch + Mobility',
                    exercises: [
                        {
                            name: 'Foam Rolling',
                            sets: 1,
                            reps: '15 min',
                            rest: '-'
                        },
                        {
                            name: 'Pigeon Pose',
                            sets: 2,
                            reps: '60s each side',
                            rest: '15s'
                        },
                        {
                            name: 'Cat-Cow',
                            sets: 3,
                            reps: '10',
                            rest: '-'
                        },
                        {
                            name: 'Thread the Needle',
                            sets: 3,
                            reps: '30s each',
                            rest: '15s'
                        }
                    ]
                },
                {
                    day: 'Day 3',
                    focus: 'Yin Yoga',
                    exercises: [
                        {
                            name: 'Dragon Pose',
                            sets: 1,
                            reps: '3 min each',
                            rest: '-'
                        },
                        {
                            name: 'Sphinx Seal',
                            sets: 1,
                            reps: '3 min',
                            rest: '-'
                        },
                        {
                            name: 'Butterfly Fold',
                            sets: 1,
                            reps: '3 min',
                            rest: '-'
                        },
                        {
                            name: 'Savasana',
                            sets: 1,
                            reps: '5 min',
                            rest: '-'
                        }
                    ]
                }
            ],
            4: [
                {
                    day: 'Day 1',
                    focus: 'Power Yoga',
                    exercises: [
                        {
                            name: 'Sun Salutations A',
                            sets: 5,
                            reps: 'Full flow',
                            rest: '-'
                        },
                        {
                            name: 'Sun Salutations B',
                            sets: 3,
                            reps: 'Full flow',
                            rest: '-'
                        },
                        {
                            name: 'Standing Balance',
                            sets: 3,
                            reps: '30s each',
                            rest: '15s'
                        },
                        {
                            name: 'Core Work',
                            sets: 3,
                            reps: '10 each',
                            rest: '30s'
                        }
                    ]
                },
                {
                    day: 'Day 2',
                    focus: 'Deep Stretch',
                    exercises: [
                        {
                            name: 'Foam Rolling',
                            sets: 1,
                            reps: '15 min',
                            rest: '-'
                        },
                        {
                            name: 'Hip Openers',
                            sets: 3,
                            reps: '45s each',
                            rest: '15s'
                        },
                        {
                            name: 'Shoulder Openers',
                            sets: 3,
                            reps: '30s each',
                            rest: '15s'
                        },
                        {
                            name: 'Hamstring Stretches',
                            sets: 3,
                            reps: '30s each',
                            rest: '15s'
                        }
                    ]
                },
                {
                    day: 'Day 3',
                    focus: 'Mobility Work',
                    exercises: [
                        {
                            name: 'Joint Circles',
                            sets: 2,
                            reps: '10 each',
                            rest: '-'
                        },
                        {
                            name: 'Dynamic Lunges',
                            sets: 3,
                            reps: '8 each',
                            rest: '30s'
                        },
                        {
                            name: 'Band Pull-Aparts',
                            sets: 3,
                            reps: '15',
                            rest: '30s'
                        },
                        {
                            name: 'Wall Slides',
                            sets: 3,
                            reps: '10',
                            rest: '30s'
                        }
                    ]
                },
                {
                    day: 'Day 4',
                    focus: 'Restorative Yoga',
                    exercises: [
                        {
                            name: 'Legs Up the Wall',
                            sets: 1,
                            reps: '5 min',
                            rest: '-'
                        },
                        {
                            name: 'Supported Fish',
                            sets: 1,
                            reps: '3 min',
                            rest: '-'
                        },
                        {
                            name: 'Child Pose',
                            sets: 1,
                            reps: '2 min',
                            rest: '-'
                        },
                        {
                            name: 'Savasana',
                            sets: 1,
                            reps: '5 min',
                            rest: '-'
                        }
                    ]
                }
            ],
            5: [
                {
                    day: 'Day 1',
                    focus: 'Vinyasa Flow',
                    exercises: [
                        {
                            name: 'Sun Salutations',
                            sets: 5,
                            reps: 'Full flow',
                            rest: '-'
                        },
                        {
                            name: 'Warrior Flow',
                            sets: 3,
                            reps: '30s hold each',
                            rest: '15s'
                        },
                        {
                            name: 'Balance Work',
                            sets: 3,
                            reps: '30s each',
                            rest: '15s'
                        }
                    ]
                },
                {
                    day: 'Day 2',
                    focus: 'Deep Stretch',
                    exercises: [
                        {
                            name: 'Foam Rolling',
                            sets: 1,
                            reps: '15 min',
                            rest: '-'
                        },
                        {
                            name: 'Hip Openers',
                            sets: 3,
                            reps: '45s each',
                            rest: '15s'
                        },
                        {
                            name: 'Spinal Twists',
                            sets: 3,
                            reps: '30s each',
                            rest: '15s'
                        }
                    ]
                },
                {
                    day: 'Day 3',
                    focus: 'Active Mobility',
                    exercises: [
                        {
                            name: 'Joint Circles',
                            sets: 2,
                            reps: '10 each',
                            rest: '-'
                        },
                        {
                            name: 'Dynamic Stretching',
                            sets: 3,
                            reps: '8 each',
                            rest: '30s'
                        },
                        {
                            name: 'Band Work',
                            sets: 3,
                            reps: '15',
                            rest: '30s'
                        }
                    ]
                },
                {
                    day: 'Day 4',
                    focus: 'Yin Yoga',
                    exercises: [
                        {
                            name: 'Dragon Pose',
                            sets: 1,
                            reps: '3 min each',
                            rest: '-'
                        },
                        {
                            name: 'Pigeon Pose',
                            sets: 1,
                            reps: '3 min each',
                            rest: '-'
                        },
                        {
                            name: 'Butterfly Fold',
                            sets: 1,
                            reps: '3 min',
                            rest: '-'
                        }
                    ]
                },
                {
                    day: 'Day 5',
                    focus: 'Restorative + Breath',
                    exercises: [
                        {
                            name: 'Pranayama',
                            sets: 3,
                            reps: '10 breaths',
                            rest: '-'
                        },
                        {
                            name: 'Supported Poses',
                            sets: 1,
                            reps: '3 min each',
                            rest: '-'
                        },
                        {
                            name: 'Savasana',
                            sets: 1,
                            reps: '5 min',
                            rest: '-'
                        }
                    ]
                }
            ],
            6: [
                {
                    day: 'Day 1',
                    focus: 'Vinyasa Flow',
                    exercises: [
                        {
                            name: 'Sun Salutations',
                            sets: 5,
                            reps: 'Full flow',
                            rest: '-'
                        },
                        {
                            name: 'Warrior Flow',
                            sets: 3,
                            reps: '30s hold each',
                            rest: '15s'
                        },
                        {
                            name: 'Balance Work',
                            sets: 3,
                            reps: '30s each',
                            rest: '15s'
                        }
                    ]
                },
                {
                    day: 'Day 2',
                    focus: 'Strength + Flexibility',
                    exercises: [
                        {
                            name: 'Bodyweight Squats',
                            sets: 3,
                            reps: '12',
                            rest: '45s'
                        },
                        {
                            name: 'Push-Up Variations',
                            sets: 3,
                            reps: '8',
                            rest: '45s'
                        },
                        {
                            name: 'Lunges with Twist',
                            sets: 3,
                            reps: '8 each',
                            rest: '45s'
                        },
                        {
                            name: 'Plank Hold',
                            sets: 3,
                            reps: '30s',
                            rest: '30s'
                        }
                    ]
                },
                {
                    day: 'Day 3',
                    focus: 'Deep Stretch',
                    exercises: [
                        {
                            name: 'Foam Rolling',
                            sets: 1,
                            reps: '15 min',
                            rest: '-'
                        },
                        {
                            name: 'Hip Openers',
                            sets: 3,
                            reps: '45s each',
                            rest: '15s'
                        },
                        {
                            name: 'Spinal Twists',
                            sets: 3,
                            reps: '30s each',
                            rest: '15s'
                        }
                    ]
                },
                {
                    day: 'Day 4',
                    focus: 'Active Mobility',
                    exercises: [
                        {
                            name: 'Joint Circles',
                            sets: 2,
                            reps: '10 each',
                            rest: '-'
                        },
                        {
                            name: 'Dynamic Stretching',
                            sets: 3,
                            reps: '8 each',
                            rest: '30s'
                        },
                        {
                            name: 'Animal Flow',
                            sets: 3,
                            reps: '30s',
                            rest: '30s'
                        }
                    ]
                },
                {
                    day: 'Day 5',
                    focus: 'Yin Yoga',
                    exercises: [
                        {
                            name: 'Dragon Pose',
                            sets: 1,
                            reps: '3 min each',
                            rest: '-'
                        },
                        {
                            name: 'Pigeon Pose',
                            sets: 1,
                            reps: '3 min each',
                            rest: '-'
                        },
                        {
                            name: 'Sphinx Seal',
                            sets: 1,
                            reps: '3 min',
                            rest: '-'
                        }
                    ]
                },
                {
                    day: 'Day 6',
                    focus: 'Restorative + Meditation',
                    exercises: [
                        {
                            name: 'Guided Meditation',
                            sets: 1,
                            reps: '10 min',
                            rest: '-'
                        },
                        {
                            name: 'Supported Poses',
                            sets: 1,
                            reps: '3 min each',
                            rest: '-'
                        },
                        {
                            name: 'Savasana',
                            sets: 1,
                            reps: '5 min',
                            rest: '-'
                        }
                    ]
                }
            ]
        },
        'general': {
            3: [
                {
                    day: 'Day 1',
                    focus: 'Full Body Strength',
                    exercises: [
                        {
                            name: 'Goblet Squats',
                            sets: 3,
                            reps: '10-12',
                            rest: '75s'
                        },
                        {
                            name: 'Push-Ups',
                            sets: 3,
                            reps: '10-15',
                            rest: '60s'
                        },
                        {
                            name: 'Dumbbell Rows',
                            sets: 3,
                            reps: '10-12',
                            rest: '60s'
                        },
                        {
                            name: 'Plank Hold',
                            sets: 3,
                            reps: '45s',
                            rest: '30s'
                        },
                        {
                            name: 'Farmer Walks',
                            sets: 3,
                            reps: '30m',
                            rest: '45s'
                        }
                    ]
                },
                {
                    day: 'Day 2',
                    focus: 'Cardio + Core',
                    exercises: [
                        {
                            name: 'Rowing Machine',
                            sets: 1,
                            reps: '15 min',
                            rest: '-'
                        },
                        {
                            name: 'Mountain Climbers',
                            sets: 3,
                            reps: '15 each',
                            rest: '30s'
                        },
                        {
                            name: 'Bicycle Crunches',
                            sets: 3,
                            reps: '15 each',
                            rest: '30s'
                        },
                        {
                            name: 'Jump Rope',
                            sets: 3,
                            reps: '60s',
                            rest: '30s'
                        }
                    ]
                },
                {
                    day: 'Day 3',
                    focus: 'Functional Fitness',
                    exercises: [
                        {
                            name: 'Kettlebell Swings',
                            sets: 3,
                            reps: '15',
                            rest: '60s'
                        },
                        {
                            name: 'Step-Ups',
                            sets: 3,
                            reps: '10 each',
                            rest: '45s'
                        },
                        {
                            name: 'Superman Holds',
                            sets: 3,
                            reps: '30s',
                            rest: '30s'
                        },
                        {
                            name: 'Battle Ropes',
                            sets: 3,
                            reps: '30s',
                            rest: '45s'
                        }
                    ]
                }
            ],
            4: [
                {
                    day: 'Day 1',
                    focus: 'Upper Body Strength',
                    exercises: [
                        {
                            name: 'Dumbbell Bench Press',
                            sets: 3,
                            reps: '10-12',
                            rest: '75s'
                        },
                        {
                            name: 'Lat Pulldowns',
                            sets: 3,
                            reps: '10-12',
                            rest: '60s'
                        },
                        {
                            name: 'Shoulder Press',
                            sets: 3,
                            reps: '10-12',
                            rest: '60s'
                        },
                        {
                            name: 'Bicep Curls',
                            sets: 3,
                            reps: '12',
                            rest: '45s'
                        }
                    ]
                },
                {
                    day: 'Day 2',
                    focus: 'Lower Body Strength',
                    exercises: [
                        {
                            name: 'Goblet Squats',
                            sets: 3,
                            reps: '10-12',
                            rest: '75s'
                        },
                        {
                            name: 'Romanian Deadlift',
                            sets: 3,
                            reps: '10',
                            rest: '75s'
                        },
                        {
                            name: 'Walking Lunges',
                            sets: 3,
                            reps: '10 each',
                            rest: '60s'
                        },
                        {
                            name: 'Calf Raises',
                            sets: 3,
                            reps: '15',
                            rest: '45s'
                        }
                    ]
                },
                {
                    day: 'Day 3',
                    focus: 'Cardio + Core',
                    exercises: [
                        {
                            name: 'Treadmill Run',
                            sets: 1,
                            reps: '20 min',
                            rest: '-'
                        },
                        {
                            name: 'Russian Twists',
                            sets: 3,
                            reps: '15 each',
                            rest: '30s'
                        },
                        {
                            name: 'Leg Raises',
                            sets: 3,
                            reps: '12',
                            rest: '30s'
                        },
                        {
                            name: 'Plank Hold',
                            sets: 3,
                            reps: '45s',
                            rest: '30s'
                        }
                    ]
                },
                {
                    day: 'Day 4',
                    focus: 'Full Body Circuit',
                    exercises: [
                        {
                            name: 'Burpees',
                            sets: 3,
                            reps: '10',
                            rest: '45s'
                        },
                        {
                            name: 'Kettlebell Swings',
                            sets: 3,
                            reps: '15',
                            rest: '45s'
                        },
                        {
                            name: 'Push-Ups',
                            sets: 3,
                            reps: '12',
                            rest: '30s'
                        },
                        {
                            name: 'Squat Jumps',
                            sets: 3,
                            reps: '10',
                            rest: '45s'
                        }
                    ]
                }
            ],
            5: [
                {
                    day: 'Day 1',
                    focus: 'Upper Body Push',
                    exercises: [
                        {
                            name: 'Bench Press',
                            sets: 3,
                            reps: '10',
                            rest: '75s'
                        },
                        {
                            name: 'Overhead Press',
                            sets: 3,
                            reps: '10',
                            rest: '75s'
                        },
                        {
                            name: 'Tricep Dips',
                            sets: 3,
                            reps: '10',
                            rest: '60s'
                        },
                        {
                            name: 'Lateral Raises',
                            sets: 3,
                            reps: '12',
                            rest: '45s'
                        }
                    ]
                },
                {
                    day: 'Day 2',
                    focus: 'Upper Body Pull',
                    exercises: [
                        {
                            name: 'Barbell Rows',
                            sets: 3,
                            reps: '10',
                            rest: '75s'
                        },
                        {
                            name: 'Pull-Ups',
                            sets: 3,
                            reps: '8',
                            rest: '75s'
                        },
                        {
                            name: 'Face Pulls',
                            sets: 3,
                            reps: '15',
                            rest: '45s'
                        },
                        {
                            name: 'Barbell Curls',
                            sets: 3,
                            reps: '10',
                            rest: '45s'
                        }
                    ]
                },
                {
                    day: 'Day 3',
                    focus: 'Lower Body',
                    exercises: [
                        {
                            name: 'Squats',
                            sets: 4,
                            reps: '8-10',
                            rest: '90s'
                        },
                        {
                            name: 'Romanian Deadlift',
                            sets: 3,
                            reps: '10',
                            rest: '75s'
                        },
                        {
                            name: 'Walking Lunges',
                            sets: 3,
                            reps: '10 each',
                            rest: '60s'
                        },
                        {
                            name: 'Calf Raises',
                            sets: 3,
                            reps: '15',
                            rest: '45s'
                        }
                    ]
                },
                {
                    day: 'Day 4',
                    focus: 'Cardio + Core',
                    exercises: [
                        {
                            name: 'HIIT Circuit',
                            sets: 1,
                            reps: '20 min',
                            rest: '-'
                        },
                        {
                            name: 'Plank Variations',
                            sets: 3,
                            reps: '45s each',
                            rest: '30s'
                        },
                        {
                            name: 'Ab Wheel Rollouts',
                            sets: 3,
                            reps: '10',
                            rest: '45s'
                        }
                    ]
                },
                {
                    day: 'Day 5',
                    focus: 'Full Body Functional',
                    exercises: [
                        {
                            name: 'Kettlebell Swings',
                            sets: 3,
                            reps: '15',
                            rest: '60s'
                        },
                        {
                            name: 'Box Jumps',
                            sets: 3,
                            reps: '10',
                            rest: '60s'
                        },
                        {
                            name: 'Farmer Walks',
                            sets: 3,
                            reps: '40m',
                            rest: '45s'
                        },
                        {
                            name: 'Battle Ropes',
                            sets: 3,
                            reps: '30s',
                            rest: '45s'
                        }
                    ]
                }
            ],
            6: [
                {
                    day: 'Day 1',
                    focus: 'Chest + Triceps',
                    exercises: [
                        {
                            name: 'Bench Press',
                            sets: 3,
                            reps: '10',
                            rest: '75s'
                        },
                        {
                            name: 'Incline Press',
                            sets: 3,
                            reps: '10',
                            rest: '60s'
                        },
                        {
                            name: 'Tricep Dips',
                            sets: 3,
                            reps: '10',
                            rest: '60s'
                        }
                    ]
                },
                {
                    day: 'Day 2',
                    focus: 'Back + Biceps',
                    exercises: [
                        {
                            name: 'Barbell Rows',
                            sets: 3,
                            reps: '10',
                            rest: '75s'
                        },
                        {
                            name: 'Pull-Ups',
                            sets: 3,
                            reps: '8',
                            rest: '75s'
                        },
                        {
                            name: 'Barbell Curls',
                            sets: 3,
                            reps: '10',
                            rest: '45s'
                        }
                    ]
                },
                {
                    day: 'Day 3',
                    focus: 'Legs',
                    exercises: [
                        {
                            name: 'Squats',
                            sets: 4,
                            reps: '8-10',
                            rest: '90s'
                        },
                        {
                            name: 'Romanian Deadlift',
                            sets: 3,
                            reps: '10',
                            rest: '75s'
                        },
                        {
                            name: 'Lunges',
                            sets: 3,
                            reps: '10 each',
                            rest: '60s'
                        }
                    ]
                },
                {
                    day: 'Day 4',
                    focus: 'Shoulders + Core',
                    exercises: [
                        {
                            name: 'Overhead Press',
                            sets: 3,
                            reps: '10',
                            rest: '75s'
                        },
                        {
                            name: 'Lateral Raises',
                            sets: 3,
                            reps: '12',
                            rest: '45s'
                        },
                        {
                            name: 'Plank Hold',
                            sets: 3,
                            reps: '60s',
                            rest: '30s'
                        }
                    ]
                },
                {
                    day: 'Day 5',
                    focus: 'Cardio',
                    exercises: [
                        {
                            name: 'HIIT Circuit',
                            sets: 1,
                            reps: '25 min',
                            rest: '-'
                        },
                        {
                            name: 'Jump Rope',
                            sets: 3,
                            reps: '60s',
                            rest: '30s'
                        },
                        {
                            name: 'Rowing',
                            sets: 1,
                            reps: '10 min',
                            rest: '-'
                        }
                    ]
                },
                {
                    day: 'Day 6',
                    focus: 'Full Body Circuit',
                    exercises: [
                        {
                            name: 'Burpees',
                            sets: 3,
                            reps: '10',
                            rest: '45s'
                        },
                        {
                            name: 'Kettlebell Swings',
                            sets: 3,
                            reps: '15',
                            rest: '45s'
                        },
                        {
                            name: 'Farmer Walks',
                            sets: 3,
                            reps: '40m',
                            rest: '45s'
                        },
                        {
                            name: 'Mountain Climbers',
                            sets: 3,
                            reps: '15 each',
                            rest: '30s'
                        }
                    ]
                }
            ]
        }
    };
    const plan = plans[goal]?.[days] || plans['general'][3];
    // Adjust sets/reps based on experience level
    return plan.map((dayPlan)=>({
            ...dayPlan,
            exercises: dayPlan.exercises.map((ex)=>{
                if (level === 'beginner') {
                    return {
                        ...ex,
                        sets: Math.max(2, ex.sets - 1),
                        rest: ex.rest === '-' ? '-' : `${parseInt(ex.rest) + 15}s`
                    };
                }
                if (level === 'advanced') {
                    return {
                        ...ex,
                        sets: ex.sets + 1,
                        rest: ex.rest === '-' ? '-' : `${Math.max(30, parseInt(ex.rest) - 15)}s`
                    };
                }
                return ex;
            })
        }));
}
function DownloadModal({ open, onOpenChange, plan, goal, level, days }) {
    const goalLabel = goalOptions.find((g)=>g.value === goal)?.label || goal;
    const levelLabel = levelOptions.find((l)=>l.value === level)?.label || level;
    const textSummary = `AVENGER FITNESS — WORKOUT PLAN
================================
Goal: ${goalLabel}
Level: ${levelLabel}
Days: ${days} per week

${plan.map((day)=>`${day.day}: ${day.focus}
${day.exercises.map((ex)=>`  • ${ex.name}: ${ex.sets} sets × ${ex.reps} (rest: ${ex.rest})`).join('\n')}
`).join('\n')}
Generated at Avenger The Fitness Temple — avengerfitness.com
`;
    const handleDownload = ()=>{
        const blob = new Blob([
            textSummary
        ], {
            type: 'text/plain'
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `forge-workout-plan-${goal}-${days}days.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: open,
        onOpenChange: onOpenChange,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "bg-[#111111]/95 backdrop-blur-xl border-[#d4a017]/20 text-white max-w-lg",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                        className: "text-white flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                className: "h-5 w-5 text-[#d4a017]"
                            }, void 0, false, {
                                fileName: "[project]/src/components/gym/workout-plan.tsx",
                                lineNumber: 683,
                                columnNumber: 13
                            }, this),
                            "Download Workout Plan"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/gym/workout-plan.tsx",
                        lineNumber: 682,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/gym/workout-plan.tsx",
                    lineNumber: 681,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4 py-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-xl bg-black/30 border border-white/[0.06] p-4 max-h-72 overflow-y-auto",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                className: "text-xs text-gray-300 whitespace-pre-wrap font-mono leading-relaxed",
                                children: textSummary
                            }, void 0, false, {
                                fileName: "[project]/src/components/gym/workout-plan.tsx",
                                lineNumber: 690,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/gym/workout-plan.tsx",
                            lineNumber: 689,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: handleDownload,
                            className: "w-full bg-gradient-to-r from-[#d4a017] to-[#e8b923] text-black font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-[#d4a017]/25 transition-all duration-300",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                    className: "h-4 w-4 mr-2"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/gym/workout-plan.tsx",
                                    lineNumber: 699,
                                    columnNumber: 13
                                }, this),
                                "Download as .txt"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/gym/workout-plan.tsx",
                            lineNumber: 695,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/gym/workout-plan.tsx",
                    lineNumber: 688,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/gym/workout-plan.tsx",
            lineNumber: 680,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/gym/workout-plan.tsx",
        lineNumber: 679,
        columnNumber: 5
    }, this);
}
_c = DownloadModal;
function WorkoutPlan() {
    _s();
    const [goal, setGoal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('general');
    const [level, setLevel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('intermediate');
    const [days, setDays] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(4);
    const [generatedPlan, setGeneratedPlan] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [downloadOpen, setDownloadOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleGenerate = ()=>{
        const plan = generatePlan(goal, level, days);
        setGeneratedPlan(plan);
    };
    const handleReset = ()=>{
        setGeneratedPlan(null);
        setGoal('general');
        setLevel('intermediate');
        setDays(4);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "relative py-20 md:py-28 bg-[#0a0a0a] overflow-hidden",
        id: "workout-plan",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute top-8 right-8 text-[200px] font-black text-white/[0.02] pointer-events-none select-none leading-none",
                children: "16"
            }, void 0, false, {
                fileName: "[project]/src/components/gym/workout-plan.tsx",
                lineNumber: 730,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$gym$2f$scroll$2d$reveal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollReveal"], {
                        className: "text-center mb-10 md:mb-14",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-bold tracking-[0.3em] uppercase text-[#d4a017]/60",
                                children: "16 — Workout Plan"
                            }, void 0, false, {
                                fileName: "[project]/src/components/gym/workout-plan.tsx",
                                lineNumber: 735,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2",
                                style: {
                                    textShadow: '0 0 40px rgba(212, 160, 23, 0.1)'
                                },
                                children: [
                                    "YOUR PERSONALIZED ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[#e8b923]",
                                        children: "PLAN"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/gym/workout-plan.tsx",
                                        lineNumber: 737,
                                        columnNumber: 31
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/gym/workout-plan.tsx",
                                lineNumber: 736,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mx-auto mt-4 flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-px w-8 bg-[#d4a017]/30"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/gym/workout-plan.tsx",
                                        lineNumber: 740,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-1 w-8 rounded-full bg-gradient-to-r from-[#d4a017] to-[#e8b923]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/gym/workout-plan.tsx",
                                        lineNumber: 741,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-px w-8 bg-[#d4a017]/30"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/gym/workout-plan.tsx",
                                        lineNumber: 742,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "size-1.5 rotate-45 bg-[#d4a017]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/gym/workout-plan.tsx",
                                        lineNumber: 743,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-px w-8 bg-[#d4a017]/30"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/gym/workout-plan.tsx",
                                        lineNumber: 744,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-1 w-8 rounded-full bg-gradient-to-r from-[#e8b923] to-[#d4a017]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/gym/workout-plan.tsx",
                                        lineNumber: 745,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-px w-8 bg-[#d4a017]/30"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/gym/workout-plan.tsx",
                                        lineNumber: 746,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/gym/workout-plan.tsx",
                                lineNumber: 739,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-400 text-lg max-w-2xl mx-auto mt-6",
                                children: "Select your preferences and get a customized workout plan tailored to your goals and schedule."
                            }, void 0, false, {
                                fileName: "[project]/src/components/gym/workout-plan.tsx",
                                lineNumber: 748,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/gym/workout-plan.tsx",
                        lineNumber: 734,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                        mode: "wait",
                        children: !generatedPlan ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            exit: {
                                opacity: 0,
                                y: -20
                            },
                            transition: {
                                duration: 0.4
                            },
                            className: "max-w-3xl mx-auto",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6 md:p-8 space-y-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "flex items-center gap-2 text-sm font-semibold text-white mb-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__["Target"], {
                                                        className: "h-4 w-4 text-[#d4a017]"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/gym/workout-plan.tsx",
                                                        lineNumber: 767,
                                                        columnNumber: 21
                                                    }, this),
                                                    "Fitness Goal"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/gym/workout-plan.tsx",
                                                lineNumber: 766,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2",
                                                children: goalOptions.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setGoal(opt.value),
                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border', goal === opt.value ? 'bg-gradient-to-r from-[#d4a017] to-[#e8b923] text-black border-transparent shadow-lg shadow-[#d4a017]/20' : 'bg-white/[0.04] text-gray-400 border-white/[0.08] hover:border-[#d4a017]/40 hover:text-[#e8b923]'),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-base",
                                                                children: opt.icon
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/gym/workout-plan.tsx",
                                                                lineNumber: 782,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "hidden sm:inline",
                                                                children: opt.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/gym/workout-plan.tsx",
                                                                lineNumber: 783,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, opt.value, true, {
                                                        fileName: "[project]/src/components/gym/workout-plan.tsx",
                                                        lineNumber: 772,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/gym/workout-plan.tsx",
                                                lineNumber: 770,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/gym/workout-plan.tsx",
                                        lineNumber: 765,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "flex items-center gap-2 text-sm font-semibold text-white mb-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dumbbell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dumbbell$3e$__["Dumbbell"], {
                                                        className: "h-4 w-4 text-[#d4a017]"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/gym/workout-plan.tsx",
                                                        lineNumber: 792,
                                                        columnNumber: 21
                                                    }, this),
                                                    "Experience Level"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/gym/workout-plan.tsx",
                                                lineNumber: 791,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-3 gap-2",
                                                children: levelOptions.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setLevel(opt.value),
                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border text-center', level === opt.value ? 'bg-gradient-to-r from-[#d4a017] to-[#e8b923] text-black border-transparent shadow-lg shadow-[#d4a017]/20' : 'bg-white/[0.04] text-gray-400 border-white/[0.08] hover:border-[#d4a017]/40 hover:text-[#e8b923]'),
                                                        children: opt.label
                                                    }, opt.value, false, {
                                                        fileName: "[project]/src/components/gym/workout-plan.tsx",
                                                        lineNumber: 797,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/gym/workout-plan.tsx",
                                                lineNumber: 795,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/gym/workout-plan.tsx",
                                        lineNumber: 790,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "flex items-center gap-2 text-sm font-semibold text-white mb-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                        className: "h-4 w-4 text-[#d4a017]"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/gym/workout-plan.tsx",
                                                        lineNumber: 816,
                                                        columnNumber: 21
                                                    }, this),
                                                    "Available Days Per Week"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/gym/workout-plan.tsx",
                                                lineNumber: 815,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-4 gap-2",
                                                children: daysOptions.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setDays(opt.value),
                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border text-center', days === opt.value ? 'bg-gradient-to-r from-[#d4a017] to-[#e8b923] text-black border-transparent shadow-lg shadow-[#d4a017]/20' : 'bg-white/[0.04] text-gray-400 border-white/[0.08] hover:border-[#d4a017]/40 hover:text-[#e8b923]'),
                                                        children: opt.label
                                                    }, opt.value, false, {
                                                        fileName: "[project]/src/components/gym/workout-plan.tsx",
                                                        lineNumber: 821,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/gym/workout-plan.tsx",
                                                lineNumber: 819,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/gym/workout-plan.tsx",
                                        lineNumber: 814,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleGenerate,
                                        className: "w-full py-3.5 rounded-xl text-base font-bold bg-gradient-to-r from-[#d4a017] to-[#e8b923] text-black hover:shadow-lg hover:shadow-[#d4a017]/25 transition-all duration-300 flex items-center justify-center gap-2 group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"], {
                                                className: "h-5 w-5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/gym/workout-plan.tsx",
                                                lineNumber: 842,
                                                columnNumber: 19
                                            }, this),
                                            "Generate Plan",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                className: "h-5 w-5 group-hover:translate-x-1 transition-transform"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/gym/workout-plan.tsx",
                                                lineNumber: 844,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/gym/workout-plan.tsx",
                                        lineNumber: 838,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/gym/workout-plan.tsx",
                                lineNumber: 763,
                                columnNumber: 15
                            }, this)
                        }, "selector", false, {
                            fileName: "[project]/src/components/gym/workout-plan.tsx",
                            lineNumber: 755,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            exit: {
                                opacity: 0,
                                y: -20
                            },
                            transition: {
                                duration: 0.4
                            },
                            className: "space-y-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col sm:flex-row items-center justify-between gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex h-10 w-10 items-center justify-center rounded-xl bg-[#d4a017]/15",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"], {
                                                        className: "h-5 w-5 text-[#e8b923]"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/gym/workout-plan.tsx",
                                                        lineNumber: 861,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/gym/workout-plan.tsx",
                                                    lineNumber: 860,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-white font-bold",
                                                            children: [
                                                                goalOptions.find((g)=>g.value === goal)?.icon,
                                                                " ",
                                                                goalOptions.find((g)=>g.value === goal)?.label,
                                                                " Plan"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/gym/workout-plan.tsx",
                                                            lineNumber: 864,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-gray-500 text-sm",
                                                            children: [
                                                                levelOptions.find((l)=>l.value === level)?.label,
                                                                " • ",
                                                                days,
                                                                " days/week"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/gym/workout-plan.tsx",
                                                            lineNumber: 865,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/gym/workout-plan.tsx",
                                                    lineNumber: 863,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/gym/workout-plan.tsx",
                                            lineNumber: 859,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: handleReset,
                                                    className: "flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-white/[0.04] text-gray-400 border border-white/[0.08] hover:border-[#d4a017]/40 hover:text-[#e8b923] transition-all duration-200",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                                            className: "h-3.5 w-3.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/gym/workout-plan.tsx",
                                                            lineNumber: 873,
                                                            columnNumber: 21
                                                        }, this),
                                                        "Reset"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/gym/workout-plan.tsx",
                                                    lineNumber: 869,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setDownloadOpen(true),
                                                    className: "flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#d4a017] to-[#e8b923] text-black hover:shadow-lg hover:shadow-[#d4a017]/25 transition-all duration-200",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                            className: "h-3.5 w-3.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/gym/workout-plan.tsx",
                                                            lineNumber: 880,
                                                            columnNumber: 21
                                                        }, this),
                                                        "Download Plan"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/gym/workout-plan.tsx",
                                                    lineNumber: 876,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/gym/workout-plan.tsx",
                                            lineNumber: 868,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/gym/workout-plan.tsx",
                                    lineNumber: 858,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
                                    children: generatedPlan.map((dayPlan, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            initial: {
                                                opacity: 0,
                                                y: 20
                                            },
                                            animate: {
                                                opacity: 1,
                                                y: 0
                                            },
                                            transition: {
                                                delay: index * 0.08,
                                                duration: 0.4
                                            },
                                            className: "group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl overflow-hidden hover:border-[#d4a017]/30 hover:shadow-[0_0_30px_-5px_rgba(212,160,23,0.12)] transition-all duration-300",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "px-5 py-3.5 bg-gradient-to-r from-[#d4a017]/10 via-[#e8b923]/5 to-transparent border-b border-white/[0.06]",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                className: "text-sm font-bold text-white",
                                                                children: dayPlan.day
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/gym/workout-plan.tsx",
                                                                lineNumber: 899,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-[#d4a017]/15 text-[#e8b923] border border-[#d4a017]/20",
                                                                children: dayPlan.focus
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/gym/workout-plan.tsx",
                                                                lineNumber: 900,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/gym/workout-plan.tsx",
                                                        lineNumber: 898,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/gym/workout-plan.tsx",
                                                    lineNumber: 897,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-4 space-y-2",
                                                    children: dayPlan.exercises.map((exercise, exIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-start gap-2.5 py-2 px-3 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:border-[#d4a017]/15 transition-colors",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "flex items-center justify-center w-5 h-5 shrink-0 rounded-md bg-[#d4a017]/10 text-[#d4a017] text-[10px] font-bold mt-0.5",
                                                                    children: exIdx + 1
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/gym/workout-plan.tsx",
                                                                    lineNumber: 910,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex-1 min-w-0",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-xs font-medium text-gray-200 truncate",
                                                                            children: exercise.name
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/gym/workout-plan.tsx",
                                                                            lineNumber: 914,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-center gap-2 mt-0.5",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-[10px] text-[#e8b923] font-semibold",
                                                                                    children: [
                                                                                        exercise.sets,
                                                                                        " × ",
                                                                                        exercise.reps
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/components/gym/workout-plan.tsx",
                                                                                    lineNumber: 916,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                exercise.rest !== '-' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "text-[10px] text-gray-600",
                                                                                            children: "•"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/gym/workout-plan.tsx",
                                                                                            lineNumber: 919,
                                                                                            columnNumber: 35
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "text-[10px] text-gray-500",
                                                                                            children: [
                                                                                                "Rest: ",
                                                                                                exercise.rest
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/src/components/gym/workout-plan.tsx",
                                                                                            lineNumber: 920,
                                                                                            columnNumber: 35
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/gym/workout-plan.tsx",
                                                                            lineNumber: 915,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/gym/workout-plan.tsx",
                                                                    lineNumber: 913,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, exercise.name, true, {
                                                            fileName: "[project]/src/components/gym/workout-plan.tsx",
                                                            lineNumber: 909,
                                                            columnNumber: 25
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/gym/workout-plan.tsx",
                                                    lineNumber: 907,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute bottom-0 left-0 right-0 h-[2px] rounded-b-2xl bg-gradient-to-r from-transparent via-[#d4a017]/0 to-transparent group-hover:via-[#d4a017]/40 transition-all duration-500"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/gym/workout-plan.tsx",
                                                    lineNumber: 930,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, dayPlan.day, true, {
                                            fileName: "[project]/src/components/gym/workout-plan.tsx",
                                            lineNumber: 889,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/gym/workout-plan.tsx",
                                    lineNumber: 887,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, "plan", true, {
                            fileName: "[project]/src/components/gym/workout-plan.tsx",
                            lineNumber: 849,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/gym/workout-plan.tsx",
                        lineNumber: 753,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/gym/workout-plan.tsx",
                lineNumber: 732,
                columnNumber: 7
            }, this),
            generatedPlan && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DownloadModal, {
                open: downloadOpen,
                onOpenChange: setDownloadOpen,
                plan: generatedPlan,
                goal: goal,
                level: level,
                days: days
            }, void 0, false, {
                fileName: "[project]/src/components/gym/workout-plan.tsx",
                lineNumber: 941,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/gym/workout-plan.tsx",
        lineNumber: 728,
        columnNumber: 5
    }, this);
}
_s(WorkoutPlan, "Xsu2QrorzCYJkG40AJu+4pw/YQA=");
_c1 = WorkoutPlan;
var _c, _c1;
__turbopack_context__.k.register(_c, "DownloadModal");
__turbopack_context__.k.register(_c1, "WorkoutPlan");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/gym/workout-plan.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/gym/workout-plan.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_components_gym_workout-plan_tsx_077bqwa._.js.map