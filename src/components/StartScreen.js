function StartScreen({ quizLength, onStartQuiz }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{quizLength} questions to set your React mastery</h3>
      <button className="btn btn-ui" onClick={onStartQuiz}>
        Start Quiz
      </button>
    </div>
  );
}

export default StartScreen;
