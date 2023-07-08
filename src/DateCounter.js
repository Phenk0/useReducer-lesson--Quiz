import { useReducer } from "react";

const initialState = {
  count: 0,
  step: 1,
};
const reducer = (state, action) => {
  const { count, step } = state;
  const { type, payload } = action;

  switch (type) {
    case "increase":
      return { ...state, count: count + step };
    case "decrease":
      return { ...state, count: count - step };
    case "setCount":
      return { ...state, count: payload };
    case "setStep":
      return { ...state, step: payload };
    case "reset":
      return { ...initialState };
    default:
      console.warn(`Unhandled action: ${type}`);
      return state;
  }
};

function DateCounter() {
  const [{ count, step }, dispatch] = useReducer(reducer, initialState);

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const decrease = function () {
    dispatch({ type: "decrease" });
  };

  const increase = function () {
    dispatch({ type: "increase" });
  };

  const defineCount = function (e) {
    if (!e.target.value || isNaN(e.target.value)) return;
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={decrease}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={increase}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default DateCounter;
