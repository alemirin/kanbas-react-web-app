import React, { useState } from "react";

export default function QuizPreview() {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(event.target.value);
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Q1 - HTML</h1>
      <div
        style={{
          padding: "10px",
          backgroundColor: "#ffe4e1",
          border: "1px solid #f5c6cb",
          borderRadius: "4px",
          marginBottom: "20px",
        }}
      >
        <strong>
          ⚠ This is a preview of the published version of the quiz
        </strong>
      </div>
      <p>
        <strong>Started:</strong> Nov 29 at 8:19am
      </p>
      <h2>Quiz Instructions</h2>

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "5px",
          padding: "15px",
          marginBottom: "20px",
        }}
      >
        <h3>
          Question 1 <span style={{ float: "right" }}>1 pts</span>
        </h3>
        <p>
          An HTML <code>label</code> element can be associated with an HTML{" "}
          <code>input</code> element by setting their <code>id</code> attributes
          to the same value.
        </p>
        <p>
          The resulting effect is that when you click on the <code>label</code>{" "}
          text, the <code>input</code> element receives focus as if you had
          clicked on the <code>input</code> element itself.
        </p>
        <div>
          <label>
            <input
              type="radio"
              name="question1"
              value="True"
              checked={selectedAnswer === "True"}
              onChange={handleAnswerChange}
            />
            True
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="question1"
              value="False"
              checked={selectedAnswer === "False"}
              onChange={handleAnswerChange}
            />
            False
          </label>
        </div>
        <div style={{ marginTop: "15px" }}>
          <button className="btn btn-secondary">Next</button>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <p>
          <strong>Quiz saved at 8:19am</strong>
        </p>
        <button className="btn btn-danger">Submit Quiz</button>
      </div>

      <button className="btn btn-secondary">Keep Editing This Quiz</button>

      <br />

      <div>
        <br />
        <h3>Questions</h3>
        <ul>
          <li>
            <a href="#">Question 1</a>
          </li>
          <li>
            <a href="#">Question 2</a>
          </li>
          <li>
            <a href="#">Question 3</a>
          </li>
          <li>
            <a href="#">Question 4</a>
          </li>
          <li>
            <a href="#">Question 5</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
