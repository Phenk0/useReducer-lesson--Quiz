function Options({ question, dispatch, answer }) {
  const hasAnswer = answer !== null;
  const { options, correctOption } = question;

  function handleAnswerQuestion(index) {
    dispatch({ type: "newAnswer", payload: index });
  }

  return (
    <div className="options">
      {options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswer ? (correctOption === index ? "correct" : "wrong") : ""
          }`}
          key={option}
          disabled={hasAnswer}
          onClick={() => handleAnswerQuestion(index)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
