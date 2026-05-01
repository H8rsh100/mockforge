import { useState } from 'react'
import axios from 'axios'

const ROLES = ['Software Engineer', 'Frontend Developer', 'Backend Developer', 'Data Analyst', 'Product Manager', 'DevOps Engineer']
const DIFFICULTIES = ['Easy', 'Medium', 'Hard']

export default function Setup({ onStart }) {
  const [role, setRole] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleStart = async () => {
    if (!role || !difficulty) { setError('Pick a role and difficulty first.'); return }
    setLoading(true)
    setError('')
    try {
      const res = await axios.post('http://127.0.0.1:8000/generate-questions', { role, difficulty })
      onStart(res.data.questions, { role, difficulty })
    } catch (e) {
      setError('Failed to connect to backend. Make sure it is running.')
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-lg">
        <h1 className="text-4xl font-bold mb-2 text-white">MockForge</h1>
        <p className="text-gray-400 mb-10 text-sm">AI-powered mock interviews. No fluff. Just reps.</p>

        <div className="mb-6">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Select Role</p>
          <div className="grid grid-cols-2 gap-2">
            {ROLES.map(r => (
              <button key={r} onClick={() => setRole(r)}
                className={`px-4 py-2 rounded border text-sm transition-all ${role === r ? 'border-violet-500 bg-violet-500/10 text-violet-400' : 'border-gray-700 text-gray-400 hover:border-gray-500'}`}>
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Difficulty</p>
          <div className="flex gap-2">
            {DIFFICULTIES.map(d => (
              <button key={d} onClick={() => setDifficulty(d)}
                className={`px-6 py-2 rounded border text-sm transition-all ${difficulty === d ? 'border-violet-500 bg-violet-500/10 text-violet-400' : 'border-gray-700 text-gray-400 hover:border-gray-500'}`}>
                {d}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <button onClick={handleStart} disabled={loading}
          className="w-full py-3 bg-violet-600 hover:bg-violet-700 rounded text-white font-semibold transition-all disabled:opacity-50">
          {loading ? 'Generating questions...' : 'Start Interview →'}
        </button>
      </div>
    </div>
  )
}