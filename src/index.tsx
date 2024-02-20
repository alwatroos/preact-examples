import { render } from "preact";

import "./style.css";
import {
  PropsWithChildren,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "preact/compat";
import { signal, useComputed } from "@preact/signals";

const generateRandomString = (length: number) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const firstSignal = signal("first signal " + generateRandomString(5));
const secondSignal = signal("second signal " + generateRandomString(5));

export function App() {
  const [memoProp, setMemoProp] = useState(
    () => "This is a memoized component " + generateRandomString(5)
  );

  const [internalState, setInternalState] = useState(
    "This is an internal state " + generateRandomString(5)
  );

  const changeMemoProp = useCallback(() => {
    setMemoProp("This is a memoized component " + generateRandomString(5));
  }, [setMemoProp]);

  const changeInternalState = useCallback(() => {
    setInternalState("This is an internal state " + generateRandomString(5));
  }, [setInternalState]);

  const changeFirstSignal = useCallback(() => {
    firstSignal.value = "first signal " + generateRandomString(5);
  }, []);

  const changeSecondSignal = useCallback(() => {
    secondSignal.value = "second signal " + generateRandomString(5);
  }, []);

  return (
    <div>
      <section className="grid">
        <Button
          onClick={changeMemoProp}
          title="Change memo prop"
          description="Click here to change the memo prop"
        />
        <Button
          onClick={changeInternalState}
          title="Change internal state"
          description="Click here to change the internal state"
        />
        <Button
          onClick={changeFirstSignal}
          title="Change first signal"
          description="Click here to change the first signal"
        />
        <Button
          onClick={changeSecondSignal}
          title="Change second signal"
          description="Click here to change the second signal"
        />
      </section>
      <section>
        <MemoComponent value={memoProp} />
        <ComputedComponent />
        <UseMemoComponent valueOne={memoProp} valueTwo={internalState} />
        <AnimatedParagraph>{internalState}</AnimatedParagraph>
        <ConstMemoComponent value={memoProp} />
      </section>
    </div>
  );
}

const AnimatedParagraph = ({ children }: PropsWithChildren) => {
  const ref = useRef<HTMLParagraphElement>(null);
  /**
   * This is an example of useEffect without dependencies - it will run on every render
   */
  useEffect(() => {
    if (ref.current) {
      ref.current.animate(
        [
          { transform: "scale(0.5)", opacity: 1 },
          { transform: "scale(1.5)", opacity: 1 },
          { transform: "scale(1)", opacity: 1 },
        ],
        {
          duration: 500,
          easing: "ease-in-out",
        }
      );
    }
  });
  return <p ref={ref}>{children}</p>;
};

const MemoComponent = memo(function MemoComponent({
  value,
}: {
  value: string;
}) {
  return <AnimatedParagraph>{value}</AnimatedParagraph>;
});

const Button = memo(function Button({
  title,
  description,
  onClick,
}: {
  title: string;
  description: string;
  onClick?: () => void;
}) {
  return (
    <button onClick={onClick} class="resource">
      <h2>{title}</h2>
      <p>{description}</p>
    </button>
  );
});

const ComputedComponent = () => {
  const computedValue = useComputed(
    () => firstSignal.value + " " + secondSignal.value
  );
  return <AnimatedParagraph>{computedValue.value}</AnimatedParagraph>;
};

const UseMemoComponent = function UseMemoComponent({
  valueOne,
  valueTwo,
}: {
  valueOne: string;
  valueTwo: string;
}) {
  const value = useMemo(() => {
    console.log("[UseMemoComponent] useMemo called");
    return "[UseMemoComponent] " + valueOne + " " + valueTwo;
  }, [valueOne, valueTwo]);
  return <AnimatedParagraph>{value}</AnimatedParagraph>;
};

const ConstMemoComponent = memo(
  function ConstStaticMemoComponent({ value }: { value: string }) {
    return (
      <AnimatedParagraph>
        {"This is const memo component " + value}
      </AnimatedParagraph>
    );
  },
  () => true
);

render(<App />, document.getElementById("app"));
