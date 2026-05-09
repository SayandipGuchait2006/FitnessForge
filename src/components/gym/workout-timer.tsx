'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Timer, Play, Pause, RotateCcw, Flag, X } from 'lucide-react'

interface Lap {
  number: number
  time: number
}

function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  const centiseconds = Math.floor((ms % 1000) / 10)

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(centiseconds).padStart(2, '0')}`
}

export function WorkoutTimer() {
  const [isOpen, setIsOpen] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [laps, setLaps] = useState<Lap[]>([])
  const startTimeRef = useRef<number>(0)
  const animFrameRef = useRef<number>(0)
  const accumulatedRef = useRef<number>(0)
  const tickRef = useRef<() => void>(() => {})

  // Assign the tick function in an effect so we don't write to a ref during render
  useEffect(() => {
    tickRef.current = () => {
      const now = performance.now()
      setElapsedTime(accumulatedRef.current + (now - startTimeRef.current))
      animFrameRef.current = requestAnimationFrame(tickRef.current)
    }
  }, [])

  const start = useCallback(() => {
    startTimeRef.current = performance.now()
    animFrameRef.current = requestAnimationFrame(tickRef.current)
    setIsRunning(true)
  }, [])

  const pause = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current)
    }
    accumulatedRef.current += performance.now() - startTimeRef.current
    setElapsedTime(accumulatedRef.current)
    setIsRunning(false)
  }, [])

  const reset = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current)
    }
    accumulatedRef.current = 0
    startTimeRef.current = 0
    setElapsedTime(0)
    setLaps([])
    setIsRunning(false)
  }, [])

  const addLap = useCallback(() => {
    const currentElapsed = isRunning
      ? accumulatedRef.current + (performance.now() - startTimeRef.current)
      : accumulatedRef.current

    if (currentElapsed > 0) {
      setLaps((prev) => [{ number: prev.length + 1, time: currentElapsed }, ...prev.slice(0, 4)])
    }
  }, [isRunning])

  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
      }
    }
  }, [])

  return (
    <>
      {/* Expanded Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed bottom-36 right-20 z-30 flex w-[240px] flex-col rounded-2xl border border-white/[0.08] bg-[#111111]/95 backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden"
            style={{ height: '320px' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-2.5 bg-[#0a0a0a]/60">
              <div className="flex items-center gap-2">
                <Timer className="h-4 w-4 text-[#e8b923]" />
                <span className="text-xs font-bold tracking-wider text-[#e8b923]">TIMER</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-6 w-6 items-center justify-center rounded-md text-neutral-500 transition-colors hover:bg-white/[0.06] hover:text-white"
                aria-label="Close timer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Timer Display */}
            <div className="flex-1 flex flex-col items-center justify-center px-4 py-3">
              <div className="text-3xl font-mono font-bold text-white tracking-wider tabular-nums">
                {formatTime(elapsedTime)}
              </div>

              {/* Control Buttons */}
              <div className="flex items-center gap-2 mt-4">
                {!isRunning ? (
                  <button
                    onClick={start}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#d4a017] to-[#e8b923] text-black shadow-lg shadow-[#d4a017]/20 hover:shadow-xl hover:shadow-[#d4a017]/30 transition-all duration-200 hover:scale-105"
                    aria-label="Start timer"
                  >
                    <Play className="h-4 w-4 ml-0.5" />
                  </button>
                ) : (
                  <button
                    onClick={pause}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.1] text-white border border-white/[0.12] hover:bg-white/[0.15] transition-all duration-200 hover:scale-105"
                    aria-label="Pause timer"
                  >
                    <Pause className="h-4 w-4" />
                  </button>
                )}

                <button
                  onClick={reset}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] text-neutral-400 border border-white/[0.08] hover:bg-white/[0.1] hover:text-white transition-all duration-200 hover:scale-105"
                  aria-label="Reset timer"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>

                <button
                  onClick={addLap}
                  disabled={elapsedTime === 0}
                  className="flex h-10 items-center gap-1.5 rounded-full bg-white/[0.06] px-3 text-neutral-400 border border-white/[0.08] hover:bg-white/[0.1] hover:text-[#e8b923] transition-all duration-200 hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                  aria-label="Add lap"
                >
                  <Flag className="h-3.5 w-3.5" />
                  <span className="text-xs font-medium">Lap</span>
                </button>
              </div>

              {/* Laps List */}
              {laps.length > 0 && (
                <div className="mt-3 w-full max-h-24 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                  {laps.map((lap) => (
                    <div
                      key={lap.number}
                      className="flex items-center justify-between px-2 py-1 text-xs"
                    >
                      <span className="text-neutral-500">Lap {lap.number}</span>
                      <span className="font-mono text-neutral-300 tabular-nums">
                        {formatTime(lap.time)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-36 right-20 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-[#1a1a1a] border border-white/[0.08] text-[#e8b923] shadow-lg hover:shadow-xl hover:border-[#d4a017]/40 hover:scale-110 transition-all duration-300"
            aria-label="Open workout timer"
          >
            <Timer className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
