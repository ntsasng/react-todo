import { memo } from "react";

function Heading({ onIncrease }) {
  console.log("Re-rendering Heading component");
  return (
    <div>
      <h3>Hello Heading Component </h3>
      <button type="button" onClick={onIncrease}>
        Increase +
      </button>
    </div>
  );
}

export default memo(Heading);
