import React, { useState } from 'react';

interface TrueFalseQuestion {
  questiontype: string;
  title: string;
  points: number;
  question: string;
  correctAnswer: boolean;
}

interface TrueFalseEditorProps {
  onSave: (question: TrueFalseQuestion) => void;
  onCancel: () => void;
  initialQuestion?: TrueFalseQuestion;
}

export default function TrueFalseEditor({
  onSave,
  onCancel,
  initialQuestion
}: TrueFalseEditorProps) {
  const [question, setQuestion] = useState<TrueFalseQuestion>(
    initialQuestion || {
      questiontype: 'TRUEORFALSE',
      title: '',
      points: 10,
      question: '',
      correctAnswer: true
    }
  );

  return (
    <div className="p-4 border rounded">
      <h4>True/False Question</h4>
      
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
        <label className="form-label">Correct Answer</label>
        <div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="answerTrue"
              checked={question.correctAnswer === true}
              onChange={() => setQuestion({ ...question, correctAnswer: true })}
            />
            <label className="form-check-label" htmlFor="answerTrue">
              True
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="answerFalse"
              checked={question.correctAnswer === false}
              onChange={() => setQuestion({ ...question, correctAnswer: false })}
            />
            <label className="form-check-label" htmlFor="answerFalse">
              False
            </label>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <button className="btn btn-secondary me-2" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn btn-primary" onClick={() => onSave(question)}>
          Save Question
        </button>
      </div>
    </div>
  );
}
