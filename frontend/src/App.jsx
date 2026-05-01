import { useState } from 'react'
import Setup from './components/Setup'
import Interview from './components/Interview'
import Results from './components/Results'

export default function App() {
  const [screen, setScreen] = useState('setup')
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([])
  const [config, setConfig] = useState({ role: '', difficulty: '' })

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-mono">
      {screen === 'setup' && (
        <Setup onStart={(questions, config) => {
          setQuestions(questions)
          setConfig(config)
          setScreen('interview')
        }} />
      )}
      {screen === 'interview' && (
        <Interview
          questions={questions}
          config={config}
          onFinish={(answers) => {
            setAnswers(answers)
            setScreen('results')
          }}
        />
      )}
      {screen === 'results' && (
        <Results
          questions={questions}
          answers={answers}
          config={config}
          onRestart={() => {
            setScreen('setup')
            setQuestions([])
            setAnswers([])
          }}
        />
      )}
    </div>
  )
}