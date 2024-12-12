import React, { useState } from 'react';
import { FaTrash, FaPlus } from 'react-icons/fa';

interface Choice {
  text: string;
  isCorrect: boolean;
}

interface MultipleChoiceQuestion {
  questiontype: string;
  title: string;
  points: number;
  question: string;
  choices: Choice[];
}

interface MultipleChoiceEditorProps {
  onSave: (question: MultipleChoiceQuestion) => void;
  onCancel: () => void;
  initialQuestion?: MultipleChoiceQuestion;
}

export default function MultipleChoiceEditor({ 
  onSave, 
  onCancel,
  initialQuestion 
}: MultipleChoiceEditorProps) {
  const [question, setQuestion] = useState<MultipleChoiceQuestion>(
    initialQuestion || {
      questiontype: 'MULTIPLECHOICE',
      title: '',
      points: 10,
      question: '',
      choices: [
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false }
      ]
    }
  );

  const handleChoiceChange = (index: number, text: string) => {
    const newChoices = [...question.choices];
    newChoices[index] = { ...newChoices[index], text };
    setQuestion({ ...question, choices: newChoices });
  };

  const handleCorrectAnswerChange = (index: number) => {
    const newChoices = question.choices.map((choice, i) => ({
      ...choice,
      isCorrect: i === index
    }));
    setQuestion({ ...question, choices: newChoices });
  };

  const addChoice = () => {
    setQuestion({
      ...question,
      choices: [...question.choices, { text: '', isCorrect: false }]
    });
  };

  const removeChoice = (index: number) => {
    if (question.choices.length > 2) {
      setQuestion({
        ...question,
        choices: question.choices.filter((_, i) => i !== index)
      });
    }
  };

  return (
    <div className="p-4 border rounded">
      <h4>Multiple Choice Question</h4>
      
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          value={question.title}
          onChange={(e) => setQuestion({ ...question, title: e.target.value })}
          placeholder="Question Title"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Points</label>
        <input
          type="number"
          className="form-control w-25"
          value={question.points}
          onChange={(e) => setQuestion({ ...question, points: Number(e.target.value) })}
          min="0"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Question Text</label>
        <textarea
          className="form-control"
          rows={3}
          value={question.question}
          onChange={(e) => setQuestion({ ...question, question: e.target.value })}
          placeholder="Enter your question here"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Choices</label>
        <div className="choices-container">
          {question.choices.map((choice, index) => (
            <div key={index} className="d-flex align-items-center mb-2">
              <input
                type="radio"
                name="correctAnswer"
                className="me-2"
                checked={choice.isCorrect}
                onChange={() => handleCorrectAnswerChange(index)}
              />
              <input
                type="text"
                className="form-control me-2"
                value={choice.text}
                onChange={(e) => handleChoiceChange(index, e.target.value)}
                placeholder={`Choice ${index + 1}`}
              />
              <button 
                className="btn btn-danger"
                onClick={() => removeChoice(index)}
                disabled={question.choices.length <= 2}
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
        <button 
          className="btn btn-secondary mt-2"
          onClick={addChoice}
        >
          <FaPlus className="me-2" />
          Add Choice
        </button>
      </div>

      <div className="mt-4">
        <button 
          className="btn btn-secondary me-2" 
          onClick={onCancel}
        >
          Cancel
        </button>
        <button 
          className="btn btn-primary"
          onClick={() => onSave(question)}
        >
          Save Question
        </button>
      </div>
    </div>
  );
}
