import React from 'react';
import { ChartData } from '../../types/chartData';

interface FlowChartProps {
  data: ChartData;
}

const FlowChart: React.FC<FlowChartProps> = ({ data }) => {
  const allCheckpoints = [...data.checkpoints, data.finalGoal];
  const checkpointsPerRow = 3;
  const rows = Math.ceil(allCheckpoints.length / checkpointsPerRow);
  const svgWidth = 1200;
  const svgHeight = rows * 200 + 100;
  const boxWidth = 300;
  const boxHeight = 80;
  const horizontalGap = 100;
  const verticalGap = 120;

  const getCheckpointPosition = (index: number) => {
    const row = Math.floor(index / checkpointsPerRow);
    const col = index % checkpointsPerRow;
    const x = row % 2 === 0 
      ? col * (boxWidth + horizontalGap) + boxWidth / 2 + 50
      : svgWidth - (col * (boxWidth + horizontalGap) + boxWidth / 2 + 50);
    const y = row * (boxHeight + verticalGap) + boxHeight / 2 + 50;
    return { x, y };
  };

  const Arrow = ({ start, end }: { start: number; end: number }) => {
    const startPos = getCheckpointPosition(start);
    const endPos = getCheckpointPosition(end);
    const startRow = Math.floor(start / checkpointsPerRow);
    const endRow = Math.floor(end / checkpointsPerRow);

    let path;
    if (startRow === endRow) {
      if (startRow % 2 === 0) {
        // Left-to-right in even rows
        path = `M${startPos.x + boxWidth / 2},${startPos.y} H${endPos.x - boxWidth / 2}`;
      } else {
        // Right-to-left in odd rows, go around the boxes
        const midY = startPos.y - boxHeight / 2 - 20;
        path = `M${startPos.x - boxWidth / 2},${startPos.y} 
                 H${startPos.x - boxWidth / 2 - 20} V${midY} 
                 H${endPos.x + boxWidth / 2 + 20} V${endPos.y} 
                 H${endPos.x + boxWidth / 2}`;
      }
    } else {
      // Vertical arrow for row change
      const isRightEdge = startRow % 2 === 0;
      const edgeX = isRightEdge ? svgWidth - 25 : 25;
      path = `M${startPos.x + (isRightEdge ? boxWidth / 2 : -boxWidth / 2)},${startPos.y} 
               H${edgeX} V${endPos.y} 
               H${endPos.x + (isRightEdge ? -boxWidth / 2 : boxWidth / 2)}`;
    }
    
    return (
      <path
        d={path}
        fill="none"
        stroke="#00FFFF"
        strokeWidth="2"
        markerEnd="url(#arrowhead)"
      />
    );
  };

  return (
    <div className="w-full bg-gray-900 p-6 rounded-lg shadow-lg overflow-hidden">
      <h2 className="text-3xl font-bold mb-6 text-center text-cyan-400">{data.title}</h2>
      
      <div className="overflow-x-auto">
        <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#00FFFF" />
            </marker>
          </defs>
          
          {allCheckpoints.map((checkpoint, index) => {
            const { x, y } = getCheckpointPosition(index);
            const isCurrentStage = checkpoint === data.currentStage;
            const isFinalGoal = index === allCheckpoints.length - 1;
            
            return (
              <g key={index}>
                <rect
                  x={x - boxWidth / 2}
                  y={y - boxHeight / 2}
                  width={boxWidth}
                  height={boxHeight}
                  rx="10"
                  ry="10"
                  fill={isCurrentStage ? '#4CAF50' : (isFinalGoal ? '#F44336' : '#1a365d')}
                  stroke="#00FFFF"
                />
                <text
                  x={x}
                  y={y - 10}
                  fill="white"
                  fontSize="16"
                  textAnchor="middle"
                >
                  {checkpoint}
                </text>
                <text
                  x={x}
                  y={y + 20}
                  fill="#00FFFF"
                  fontSize="14"
                  textAnchor="middle"
                >
                  Step {index + 1}
                </text>
                {index < allCheckpoints.length - 1 && (
                  <Arrow start={index} end={index + 1} />
                )}
              </g>
            );
          })}
        </svg>
      </div>
      
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4 text-cyan-400">Key Requirements:</h3>
        <ul className="list-disc list-inside text-white space-y-2">
          {data.keyRequirements.map((requirement, index) => (
            <li key={index} className="text-cyan-200">{requirement}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FlowChart;