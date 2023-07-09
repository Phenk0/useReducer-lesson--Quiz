function FinishScreen({ dispatch, points, maxPoints, highScore }) {
  const percentage = (points / maxPoints) * 100;

  let emoji;

  if (percentage === 100) {
    emoji = "🥇";
  } else if (percentage > 80) {
    emoji = "🎉";
  } else if (percentage > 50) {
    emoji = "😮‍💨";
  } else {
    emoji = "🥹";
  }
  function handleFinishQuiz() {
    dispatch({ type: "reset" });
  }
  return (
    <>
      <p className="result">
        <span>{emoji}</span> Finish with {points} / {maxPoints} points (
        {Math.ceil(percentage)} %)
      </p>
      <p className="highscore">Highscore: {highScore}</p>
      <button className="btn btn-ui" onClick={handleFinishQuiz}>
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
