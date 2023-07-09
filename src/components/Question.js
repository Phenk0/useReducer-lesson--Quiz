import Options from "./Options";
import Progress from "./Progress";

function Question({
  question,
  questionIndex,
  quizLength,
  dispatch,
  points,
  maxPoints,
  answer,
}) {
  return (
    <div>
      <Progress
        quizLength={quizLength}
        questionIndex={questionIndex}
        points={points}
        maxPoints={maxPoints}
        answer={answer}
      />

      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />

      {/*<p>POINTS: {question.points}</p>*/}
    </div>
  );
}

export default Question;
