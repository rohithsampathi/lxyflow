import React, { useState } from 'react';

interface InputFormProps {
  data: {
    title: string;
    checkpoints: string[];
    currentStage: string;
    finalGoal: string;
    keyRequirements: string[];
  };
  onChange: (newData: InputFormProps['data']) => void;
}

const InputForm: React.FC<InputFormProps> = ({ data, onChange }) => {
  const [checkpointsInput, setCheckpointsInput] = useState(data.checkpoints.join('\n'));
  const [requirementsInput, setRequirementsInput] = useState(data.keyRequirements.join('\n'));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'checkpoints') {
      setCheckpointsInput(value);
      onChange({ ...data, checkpoints: value.split('\n').filter(item => item.trim() !== '') });
    } else if (name === 'keyRequirements') {
      setRequirementsInput(value);
      onChange({ ...data, keyRequirements: value.split('\n').filter(item => item.trim() !== '') });
    } else {
      onChange({ ...data, [name]: value });
    }
  };

  return (
    <div className="w-full lg:w-1/3 space-y-6">
      <input
        className="cyber-input"
        name="title"
        value={data.title}
        onChange={handleChange}
        placeholder="Chart Title"
      />
      <textarea
        className="cyber-input"
        name="checkpoints"
        value={checkpointsInput}
        onChange={handleChange}
        placeholder="Checkpoints (one per line)"
        rows={5}
      />
      <input
        className="cyber-input"
        name="currentStage"
        value={data.currentStage}
        onChange={handleChange}
        placeholder="Current Stage"
      />
      <input
        className="cyber-input"
        name="finalGoal"
        value={data.finalGoal}
        onChange={handleChange}
        placeholder="Final Goal"
      />
      <textarea
        className="cyber-input"
        name="keyRequirements"
        value={requirementsInput}
        onChange={handleChange}
        placeholder="Key Requirements (one per line)"
        rows={5}
      />
    </div>
  );
};

export default InputForm;