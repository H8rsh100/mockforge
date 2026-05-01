import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Results({ questions, answers, config, onRestart }) {
  const [evaluations, setEvaluations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const evaluate = async () => {
      const results = await Promise.all(
        questions.map((q, i) =>
          axios.post('http://127.0.0.1:8000/evaluate-answer', {
            role: config.role,
            question: q,
            answer: answers[i]
          }).then(r => r.data)
        )
      )
      setEvaluations(results)
      setLoading(false)
    }
    evaluate()
  }, [])

  const avgScore = evaluations.length
    ? Math.round(evaluations.reduce((a, e) => a + e.score, 0) / evaluations.length)
    : 0

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-400 text-sm animate-pulse">Evaluating your answers...</p>
    </div>
  )

  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-16">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-1">Session Complete</h1>
        <p className="text-gray-400 text-sm mb-8">{config.role} — {config.difficulty}</p>

        <div className="border border-gray-800 rounded p-6 mb-8 text-center">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Overall Score</p>
          <p className={`text-6xl font-bold ${avgScore >= 7 ? 'text-green-400' : avgScore >= 4 ? 'text-yellow-400' : 'text-red-400'}`}>
            {avgScore}<span className="text-2xl text-gray-500">/10</span>
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {evaluations.map((ev, i) => (
            <div key={i} className="border border-gray-800 rounded p-5">
              <div className="flex justify-between items-start mb-3">
                <p className="text-sm text-gray-300 leading-relaxed pr-4">{questions[i]}</p>
                <span className={`text-lg font-bold shrink-0 ${ev.score >= 7 ? 'text-green-400' : ev.score >= 4 ? 'text-yellow-400' : 'text-red-400'}`}>
                  {ev.score}/10
                </span>
              </div>
              <p className="text-xs text-gray-400 mb-2">{ev.feedback}</p>
              <p className="text-xs text-green-400">✓ {ev.strong_points}</p>
              <p className="text-xs text-yellow-400 mt-1">↑ {ev.improvement}</p>
            </div>
          ))}
        </div>

        <button onClick={onRestart}
          className="w-full py-3 border border-violet-500 text-violet-400 hover:bg-violet-500/10 rounded font-semibold transition-all">
          Start New Session →
        </button>
      </div>
    </div>
  )
}