'use client'
import { useState, useRef } from 'react'
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
  const flowchartRef = useRef<HTMLDivElement>(null)

  const handleInputChange = (newData: ChartData) => {
    setChartData(newData)
  }

  const handleExport = async () => {
    if (flowchartRef.current) {
      const flowchartElement = flowchartRef.current;
      
      // Force a repaint to ensure all content is rendered
      flowchartElement.style.transform = 'scale(1)';
      await new Promise(resolve => setTimeout(resolve, 100));
  
      const canvas = await html2canvas(flowchartElement, {
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#1a202c', // dark background color
        width: flowchartElement.scrollWidth + 40, // Add extra width
        height: flowchartElement.scrollHeight + 40, // Add extra height
      });
  
      // Add watermark
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.font = '20px Arial';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fillText('Montaigne Strategy Labs', 20, canvas.height - 20);
      }
  
      // Convert to image and trigger download
      const image = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.href = image;
      link.download = 'luxofy-flowchart.png';
      link.click();
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />
  }

  return (
    <main className="container mx-auto p-8 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center neon-glow">Montaigne Strategic Flowchart Generator</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <InputForm data={chartData} onChange={handleInputChange} />
        <div className="w-full lg:w-2/3">
          <div id="flowchart" ref={flowchartRef}>
            <FlowChart data={chartData} />
          </div>
          <button
            onClick={handleExport}
            className="mt-4 bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Export as PNG
          </button>
        </div>
      </div>
    </main>
  )
}