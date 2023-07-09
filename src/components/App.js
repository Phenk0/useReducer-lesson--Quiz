import { useEffect, useReducer } from "react";

import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import FinishScreen from "./FinishScreen";
import NextButton from "./NextButton";
import Timer from "./Timer";
import Footer from "./Footer";

const SECS_PER_QUESTION = 30;
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemained: null,
};
function reducer(state, action) {
  const { questions, status, index, points, highScore, secondsRemained } =
    state;
  const { type, payload } = action;

  switch (type) {
    case "dataReceived":
      return { ...state, questions: payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemained: questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = questions.at(index);

      return {
        ...state,
        answer: payload,
        points:
          question.correctOption === payload
            ? points + question.points
            : points,
      };
    case "next":
      return index < questions.length - 1
        ? { ...state, index: index + 1, answer: null }
        : {
            ...state,
            status: "finished",
            highScore: highScore > points ? highScore : points,
          };
    case "tick":
      return {
        ...state,
        secondsRemained: secondsRemained - 1,
        status: secondsRemained === 0 ? "finished" : status,
      };
    case "reset":
      return { ...initialState, highScore: highScore };
    default:
      console.warn(`Unknown action: ${type}`);
      return state;
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    questions,
    status,
    index,
    points,
    answer,
    highScore,
    secondsRemained,
  } = state;

  function handleStartQuiz() {
    dispatch({ type: "start" });
  }

  function checkStatus(waitingStatus) {
    switch (waitingStatus) {
      case "loading":
        return status === "loading";
      case "error":
        return status === "error";
      case "ready":
        return status === "ready";
      case "active":
        return status === "active";
      case "finished":
        return status === "finished";
      default:
        console.warn(`Not registered status: ${waitingStatus}`);
        return false;
    }
  }

  const maxPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );
  useEffect(
    function () {
      if (status !== "loading") return;
      async function fetchData() {
        const response = await fetch("http://localhost:8000/questions");
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        const data = await response.json();
        dispatch({ type: "dataReceived", payload: data });
      }
      fetchData().catch((e) => {
        dispatch({ type: "dataFailed" });
      });
    },
    [status]
  );

  return (
    <div className="app">
      <Header />
      <Main>
        {checkStatus("loading") && <Loader />}
        {checkStatus("error") && <Error />}
        {checkStatus("ready") && (
          <StartScreen
            quizLength={questions.length}
            onStartQuiz={handleStartQuiz}
          />
        )}
        {checkStatus("active") && (
          <>
            <Question
              question={questions.at(index)}
              questionIndex={index}
              quizLength={questions.length}
              points={points}
              maxPoints={maxPoints}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemained={secondsRemained} />
              <NextButton
                answer={answer}
                dispatch={dispatch}
                isLast={index === questions.length - 1}
              />
            </Footer>
          </>
        )}
        {checkStatus("finished") && (
          <FinishScreen
            dispatch={dispatch}
            points={points}
            maxPoints={maxPoints}
            highScore={highScore}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
