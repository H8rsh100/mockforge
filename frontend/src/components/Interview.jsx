import { useState } from 'react'

export default function Interview({ questions, config, onFinish }) {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState(Array(questions.length).fill(''))

  const handleNext = () => {
    if (current < questions.length - 1) setCurrent(current + 1)
    else onFinish(answers)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-2xl">
        <div className="flex justify-between items-center mb-8">
          <span className="text-xs text-gray-500 uppercase tracking-widest">{config.role} — {config.difficulty}</span>
          <span className="text-xs text-gray-500">{current + 1} / {questions.length}</span>
        </div>

        <div className="w-full bg-gray-800 rounded-full h-1 mb-10">
          <div className="bg-violet-500 h-1 rounded-full transition-all"
            style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
        </div>

        <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Question {current + 1}</p>
        <h2 className="text-xl font-semibold mb-6 leading-relaxed">{questions[current]}</h2>

        <textarea
          className="w-full bg-gray-900 border border-gray-700 rounded p-4 text-sm text-gray-200 resize-none focus:outline-none focus:border-violet-500 transition-all"
          rows={6}
          placeholder="Type your answer here..."
          value={answers[current]}
          onChange={e => {
            const updated = [...answers]
            updated[current] = e.target.value
            setAnswers(updated)
          }}
        />

        <button onClick={handleNext} disabled={!answers[current].trim()}
          className="mt-4 w-full py-3 bg-violet-600 hover:bg-violet-700 rounded text-white font-semibold transition-all disabled:opacity-50">
          {current < questions.length - 1 ? 'Next Question →' : 'Finish Interview →'}
        </button>
      </div>
    </div>
  )
}