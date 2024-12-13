import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import * as quizClient from "./client";
import * as questionClient from "./Questions/client";
import * as answersClient from "./Answers/client";
import * as usersClient from "../../Account/client";

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<any[]>([]);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Fetch user profile to get userId
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfile = await usersClient.profile();
        setUserId(userProfile._id); // Assuming the user profile has an `_id` field
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const quizzes = await quizClient.fetchQuizzesForCourse(cid as string);
        const foundQuiz = quizzes.find((q: any) => q._id === qid);
        setQuiz(foundQuiz);

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

      return () => clearInterval(timer);
    } else if (timeRemaining === 0) {
      handleSubmit(); // Submit quiz when timer expires
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

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const currentQuestion = questions[currentQuestionIndex];
      let isCorrect = false;

      if (currentQuestion.questiontype === "MULTIPLECHOICE") {
        // For multiple choice, check if the selected answer matches a correct choice
        isCorrect = currentQuestion.choices?.some(
          (choice: any) =>
            String(choice.text).toLowerCase() ===
              String(selectedAnswer).toLowerCase() && choice.isCorrect
        );
      } else if (currentQuestion.questiontype === "TRUEORFALSE") {
        // For true/false, compare the selected answer with the correctAnswer field
        isCorrect =
          String(currentQuestion.correctAnswer).toLowerCase() ===
          String(selectedAnswer).toLowerCase();
      } else if (currentQuestion.questiontype === "FILLINTHEBLANK") {
        // For fill in the blank, compare against possibleAnswers
        isCorrect = currentQuestion.possibleAnswers?.some(
          (answer: string) =>
            String(answer).toLowerCase() ===
            String(selectedAnswer).toLowerCase()
        );
      }

      // Save the answer
      setAnswers((prevAnswers) => [
        ...prevAnswers,
        {
          questionId: currentQuestion._id,
          question: currentQuestion.question,
          questiontype: currentQuestion.questiontype,
          providedAnswer: selectedAnswer,
          isCorrect,
        },
      ]);
    }

    // Move to the next question
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setSelectedAnswer(null);
  };

  const handleSubmit = async () => {
    let updatedAnswers = [...answers];
    // Save the last question's answer if it exists
    if (selectedAnswer !== null) {
      const currentQuestion = questions[currentQuestionIndex];
      let isCorrect = false;

      if (currentQuestion.questiontype === "MULTIPLECHOICE") {
        isCorrect = currentQuestion.choices?.some(
          (choice: any) =>
            String(choice.text).toLowerCase() ===
              String(selectedAnswer).toLowerCase() && choice.isCorrect
        );
      } else if (currentQuestion.questiontype === "TRUEORFALSE") {
        isCorrect =
          String(currentQuestion.correctAnswer).toLowerCase() ===
          String(selectedAnswer).toLowerCase();
      } else if (currentQuestion.questiontype === "FILLINTHEBLANK") {
        isCorrect = currentQuestion.possibleAnswers?.some(
          (answer: string) =>
            String(answer).toLowerCase() ===
            String(selectedAnswer).toLowerCase()
        );
      }

      updatedAnswers = [
        ...updatedAnswers,
        {
          questionId: currentQuestion._id,
          question: currentQuestion.question,
          questiontype: currentQuestion.questiontype,
          providedAnswer: selectedAnswer,
          isCorrect,
        },
      ];
    }

    const correctAnswers = updatedAnswers.filter(
      (answer) => answer.isCorrect
    ).length;
    const totalQuestions = questions.length;

    const payload = {
      quizId: qid,
      userId,
      answers: updatedAnswers,
    };

    try {
      await answersClient.createQuizAnswer(qid as string, payload);
      alert(
        `Quiz submitted! You scored ${correctAnswers} out of ${totalQuestions}.`
      );
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`);
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
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
              onClick={handleSubmit}
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
              <button
                onClick={() => setCurrentQuestionIndex(index)}
                style={{
                  fontWeight:
                    index === currentQuestionIndex ? "bold" : "normal",
                  textDecoration: "none",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "gray",
                }}
              >
                Question {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
