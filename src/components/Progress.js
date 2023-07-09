function Progress({ questionIndex, quizLength, points, maxPoints, answer }) {
  return (
    <header className="progress">
      <progress
        max={quizLength}
        value={questionIndex + Number(answer !== null)}
      />
      <p>
        Question <strong>{questionIndex + 1}</strong> / {quizLength}
      </p>
      <p>
        <strong>{points}</strong> / {maxPoints} points
      </p>
    </header>
  );
}

export default Progress;
