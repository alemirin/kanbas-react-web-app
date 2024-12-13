import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import * as quizClient from "./client";
import * as questionClient from "./Questions/client";

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const quizzes = await quizClient.fetchQuizzesForCourse(cid as string);
        const foundQuiz = quizzes.find((q: any) => q._id === qid);
        setQuiz(foundQuiz);

        // Fetch questions for the quiz
        const fetchedQuestions = await questionClient.fetchQuestionsForQuiz(
          qid as string
        );
        setQuestions(fetchedQuestions);

        if (foundQuiz.isTimed) {
          setTimeRemaining(foundQuiz.time * 60); // Convert minutes to seconds
        }
      } catch (error) {
        console.error("Error fetching quiz or questions:", error);
      }
    };

    fetchQuizData();
  }, [qid]);

  // Timer countdown logic
  useEffect(() => {
    if (timeRemaining !== null && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => (prev !== null ? prev - 1 : null));
      }, 1000);

      return () => clearInterval(timer); // Cleanup timer
    }
  }, [timeRemaining]);

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(event.target.value);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  // Handle "Next" button click
  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setSelectedAnswer(null); // Reset selected answer
  };

  if (!quiz || questions.length === 0) {
    return (
      <div>
        Can not retrieve quiz preview data. Please ensure the quiz is created
        and there are questions in the quiz.
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {quiz.isTimed && timeRemaining !== null && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            backgroundColor: "#f8d7da",
            color: "#721c24",
            padding: "10px",
            borderRadius: "5px",
            fontWeight: "bold",
          }}
        >
          Time Remaining: {formatTime(timeRemaining)}
        </div>
      )}
      <h1>{quiz.title}</h1>
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

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "5px",
          padding: "15px",
          marginBottom: "20px",
        }}
      >
        <h3>
          Question {currentQuestionIndex + 1}{" "}
          <span style={{ float: "right" }}>{currentQuestion.points} pts</span>
        </h3>
        <p>{currentQuestion.question}</p>

        {currentQuestion.questiontype === "MULTIPLECHOICE" &&
          currentQuestion.choices.map((choice: any, index: number) => (
            <div key={index}>
              <label>
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  value={choice.text}
                  checked={selectedAnswer === choice.text}
                  onChange={handleAnswerChange}
                />
                {choice.text}
              </label>
            </div>
          ))}

        {currentQuestion.questiontype === "TRUEORFALSE" && (
          <>
            <div>
              <label>
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
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
                  name={`question-${currentQuestionIndex}`}
                  value="False"
                  checked={selectedAnswer === "False"}
                  onChange={handleAnswerChange}
                />
                False
              </label>
            </div>
          </>
        )}

        {currentQuestion.questiontype === "FILLINTHEBLANK" && (
          <div>
            <label>
              <input
                type="text"
                placeholder="Enter your answer here"
                value={selectedAnswer || ""}
                onChange={(e) => setSelectedAnswer(e.target.value)}
              />
            </label>
          </div>
        )}

        <div style={{ marginTop: "15px" }}>
          {currentQuestionIndex < questions.length - 1 ? (
            <button
              className="btn btn-secondary"
              onClick={handleNextQuestion}
              disabled={!selectedAnswer}
            >
              Next
            </button>
          ) : (
            <button
              className="btn btn-danger"
              onClick={() => console.log("Submit quiz")}
              disabled={!selectedAnswer}
            >
              Submit Quiz
            </button>
          )}
        </div>
      </div>

      <div>
        <h3>Questions</h3>
        <ul>
          {questions.map((q, index) => (
            <li key={q._id}>
              <a
                href="#"
                onClick={() => setCurrentQuestionIndex(index)}
                style={{
                  fontWeight:
                    index === currentQuestionIndex ? "bold" : "normal",
                }}
              >
                Question {index + 1}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
