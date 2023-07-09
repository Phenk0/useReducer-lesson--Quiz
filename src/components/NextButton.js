function NextButton({ answer, dispatch, isLast }) {
  if (answer === null) return;

  function handleNextQuestion() {
    dispatch({ type: "next" });
  }
  return (
    <button className="btn btn-ui" onClick={handleNextQuestion}>
      {!isLast ? "Next" : "Finish"}
    </button>
  );
}

export default NextButton;
