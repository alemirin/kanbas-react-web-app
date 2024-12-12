import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

interface FillInTheBlankQuestion {
  questiontype: string;
  title: string;
  points: number;
  question: string;
  possibleAnswers: string[];
  caseInsensitive: boolean;
}

interface FillInTheBlankEditorProps {
  onSave: (question: FillInTheBlankQuestion) => void;
  onCancel: () => void;
  initialQuestion?: Partial<FillInTheBlankQuestion>;
}

export default function FillInTheBlankEditor({
  onSave,
  onCancel,
  initialQuestion
}: FillInTheBlankEditorProps) {

  const [question, setQuestion] = useState<FillInTheBlankQuestion>({
    questiontype: initialQuestion?.questiontype ?? 'FILLINTHEBLANK',
    title: initialQuestion?.title ?? '',
    points: initialQuestion?.points ?? 10,
    question: initialQuestion?.question ?? '',
    possibleAnswers: initialQuestion?.possibleAnswers ?? [''],
    caseInsensitive: initialQuestion?.caseInsensitive ?? true
  });

  const handlePossibleAnswerChange = (index: number, value: string) => {
    const updatedAnswers = [...question.possibleAnswers];
    updatedAnswers[index] = value;
    setQuestion({ ...question, possibleAnswers: updatedAnswers });
  };

  const addPossibleAnswer = () => {
    setQuestion({ ...question, possibleAnswers: [...question.possibleAnswers, ''] });
  };

  const removePossibleAnswer = (index: number) => {
    if (question.possibleAnswers.length > 1) {
      const updatedAnswers = question.possibleAnswers.filter((_, i) => i !== index);
      setQuestion({ ...question, possibleAnswers: updatedAnswers });
    }
  };

  const toggleCaseInsensitive = () => {
    setQuestion({ ...question, caseInsensitive: !question.caseInsensitive });
  };

  return (
    <div className="p-4 border rounded">
      <h4>Fill in the Blank Question</h4>
      
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
        <label className="form-label">Possible Correct Answers</label>
        <p className="small text-muted">
          Enter all acceptable correct answers.
        </p>
        {question.possibleAnswers.map((answer, index) => (
          <div key={index} className="d-flex align-items-center mb-2">
            <input
              type="text"
              className="form-control me-2"
              value={answer}
              onChange={(e) => handlePossibleAnswerChange(index, e.target.value)}
              placeholder={`Possible Answer ${index + 1}`}
            />
            <button 
              className="btn btn-danger"
              onClick={() => removePossibleAnswer(index)}
              disabled={question.possibleAnswers.length <= 1}
            >
              <FaTrash />
            </button>
          </div>
        ))}
        <button
          className="btn btn-secondary mt-2"
          onClick={addPossibleAnswer}
        >
          Add Another Possible Answer
        </button>
      </div>

      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="caseInsensitiveCheck"
          checked={question.caseInsensitive}
          onChange={toggleCaseInsensitive}
        />
        <label className="form-check-label" htmlFor="caseInsensitiveCheck">
          Case Insensitive Matching
        </label>
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
