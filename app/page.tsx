'use client'
import { useState } from 'react'
import InputForm from './components/InputForm'
import FlowChart from './components/FlowChart'
import Login from './components/Login'
import html2canvas from 'html2canvas'
import { ChartData } from '../types/chartData'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [chartData, setChartData] = useState<ChartData>({
    title: '',
    checkpoints: [],
    currentStage: '',
    finalGoal: '',
    keyRequirements: []
  })

  const handleInputChange = (newData: ChartData) => {
    setChartData(newData)
  }

  const handleExport = async () => {
    const flowchartElement = document.getElementById('flowchart')
    if (flowchartElement) {
      const canvas = await html2canvas(flowchartElement, {
        backgroundColor: null,
        scale: 2,
        logging: false,
        width: flowchartElement.scrollWidth + 20,
        height: flowchartElement.scrollHeight + 20,
        x: -10,
        y: -10
      })
      // Add watermark
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.font = '20px Arial'
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
        ctx.fillText('Montaigne Strategy Labs', 20, canvas.height - 20)
      }
      const image = canvas.toDataURL('image/jpeg', 0.9)
      const link = document.createElement('a')
      link.href = image
      link.download = 'luxofy-flowchart.jpg'
      link.click()
    }
  }

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />
  }

  return (
    <main className="container mx-auto p-8 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center neon-glow">Montaigne Strategic Flowchart Generator</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <InputForm data={chartData} onChange={handleInputChange} />
        <div className="w-full lg:w-2/3">
          <div id="flowchart">
            <FlowChart data={chartData} />
          </div>
          <button
            onClick={handleExport}
            className="mt-4 bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Export as JPEG
          </button>
        </div>
      </div>
    </main>
  )
}