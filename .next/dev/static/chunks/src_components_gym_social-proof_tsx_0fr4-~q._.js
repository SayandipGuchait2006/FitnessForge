(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/gym/social-proof.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SocialProof",
    ()=>SocialProof
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const proofData = [
    {
        name: 'Arjun S.',
        action: 'just joined Avenger',
        city: 'Bangalore',
        initial: 'A'
    },
    {
        name: 'Priya M.',
        action: 'booked HIIT class',
        city: 'Koramangala',
        initial: 'P'
    },
    {
        name: 'Vikram R.',
        action: 'started a free trial',
        city: 'Indiranagar',
        initial: 'V'
    },
    {
        name: 'Sneha K.',
        action: 'joined PowerLift',
        city: 'HSR Layout',
        initial: 'S'
    },
    {
        name: 'Rahul D.',
        action: 'booked Boxing class',
        city: 'Whitefield',
        initial: 'R'
    },
    {
        name: 'Ananya P.',
        action: 'just joined Avenger',
        city: 'Jayanagar',
        initial: 'A'
    },
    {
        name: 'Karan T.',
        action: 'started a free trial',
        city: 'MG Road',
        initial: 'K'
    },
    {
        name: 'Meera J.',
        action: 'booked Yoga class',
        city: 'JP Nagar',
        initial: 'M'
    },
    {
        name: 'Aditya N.',
        action: 'joined CrossFit',
        city: 'Electronic City',
        initial: 'A'
    },
    {
        name: 'Divya L.',
        action: 'booked Spin class',
        city: 'Marathahalli',
        initial: 'D'
    },
    {
        name: 'Rohan G.',
        action: 'just joined Avenger',
        city: 'BTM Layout',
        initial: 'R'
    },
    {
        name: 'Ishita V.',
        action: 'started a free trial',
        city: 'Banashankari',
        initial: 'I'
    }
];
const avatarColors = [
    'from-red-500 to-orange-500',
    'from-green-500 to-emerald-500',
    'from-purple-500 to-pink-500',
    'from-blue-500 to-cyan-500',
    'from-amber-500 to-yellow-500',
    'from-rose-500 to-pink-500'
];
function SocialProof() {
    _s();
    const [visible, setVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentIndex, setCurrentIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [dismissed, setDismissed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const indexRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SocialProof.useEffect": ()=>{
            if (dismissed) return;
            let showTimeout;
            let hideTimeout;
            let cycleTimeout;
            const showNotification = {
                "SocialProof.useEffect.showNotification": ()=>{
                    setVisible(true);
                    hideTimeout = setTimeout({
                        "SocialProof.useEffect.showNotification": ()=>{
                            setVisible(false);
                        }
                    }["SocialProof.useEffect.showNotification"], 4000);
                }
            }["SocialProof.useEffect.showNotification"];
            const scheduleNext = {
                "SocialProof.useEffect.scheduleNext": ()=>{
                    const delay = 15000 + Math.random() * 10000;
                    cycleTimeout = setTimeout({
                        "SocialProof.useEffect.scheduleNext": ()=>{
                            indexRef.current = (indexRef.current + 1) % proofData.length;
                            setCurrentIndex(indexRef.current);
                            showNotification();
                            setTimeout({
                                "SocialProof.useEffect.scheduleNext": ()=>{
                                    scheduleNext();
                                }
                            }["SocialProof.useEffect.scheduleNext"], 4500);
                        }
                    }["SocialProof.useEffect.scheduleNext"], delay);
                }
            }["SocialProof.useEffect.scheduleNext"];
            // Show first notification after 5 seconds
            showTimeout = setTimeout({
                "SocialProof.useEffect": ()=>{
                    showNotification();
                    setTimeout({
                        "SocialProof.useEffect": ()=>{
                            scheduleNext();
                        }
                    }["SocialProof.useEffect"], 4500);
                }
            }["SocialProof.useEffect"], 5000);
            return ({
                "SocialProof.useEffect": ()=>{
                    clearTimeout(showTimeout);
                    clearTimeout(hideTimeout);
                    clearTimeout(cycleTimeout);
                }
            })["SocialProof.useEffect"];
        }
    }["SocialProof.useEffect"], [
        dismissed
    ]);
    const handleDismiss = ()=>{
        setDismissed(true);
        setVisible(false);
    };
    const proof = proofData[currentIndex];
    const colorClass = avatarColors[currentIndex % avatarColors.length];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: visible && !dismissed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                x: -300,
                opacity: 0
            },
            animate: {
                x: 0,
                opacity: 1
            },
            exit: {
                x: -300,
                opacity: 0
            },
            transition: {
                type: 'spring',
                damping: 25,
                stiffness: 200
            },
            className: "fixed bottom-40 left-6 z-[25] max-w-[280px]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start gap-3 rounded-2xl border border-white/[0.08] bg-[#111111]/95 backdrop-blur-xl p-3.5 shadow-2xl shadow-black/50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${colorClass} text-white text-sm font-bold shadow-lg`,
                        children: proof.initial
                    }, void 0, false, {
                        fileName: "[project]/src/components/gym/social-proof.tsx",
                        lineNumber: 105,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-white leading-snug",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold",
                                        children: proof.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/gym/social-proof.tsx",
                                        lineNumber: 112,
                                        columnNumber: 17
                                    }, this),
                                    ' ',
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-neutral-400",
                                        children: proof.action
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/gym/social-proof.tsx",
                                        lineNumber: 113,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/gym/social-proof.tsx",
                                lineNumber: 111,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1 mt-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                        className: "h-3 w-3 text-[#d4a017]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/gym/social-proof.tsx",
                                        lineNumber: 116,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-neutral-500",
                                        children: proof.city
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/gym/social-proof.tsx",
                                        lineNumber: 117,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/gym/social-proof.tsx",
                                lineNumber: 115,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] text-neutral-600 mt-1",
                                children: "Just now"
                            }, void 0, false, {
                                fileName: "[project]/src/components/gym/social-proof.tsx",
                                lineNumber: 119,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/gym/social-proof.tsx",
                        lineNumber: 110,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleDismiss,
                        className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-neutral-500 transition-colors hover:bg-white/[0.06] hover:text-white",
                        "aria-label": "Dismiss notification",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            className: "h-3 w-3"
                        }, void 0, false, {
                            fileName: "[project]/src/components/gym/social-proof.tsx",
                            lineNumber: 128,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/gym/social-proof.tsx",
                        lineNumber: 123,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/gym/social-proof.tsx",
                lineNumber: 103,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/gym/social-proof.tsx",
            lineNumber: 96,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/gym/social-proof.tsx",
        lineNumber: 94,
        columnNumber: 5
    }, this);
}
_s(SocialProof, "KS44rp1EsMsOPLqasAecYQoQaP8=");
_c = SocialProof;
var _c;
__turbopack_context__.k.register(_c, "SocialProof");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/gym/social-proof.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/gym/social-proof.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_components_gym_social-proof_tsx_0fr4-~q._.js.map