import "./style.css";
import { render } from "preact";
import {
  useCallback,
  useState,
} from "preact/compat";
import { generatePrefixedRandomString } from "./utils/generatePrefixedRandomString";
import { firstSignal, secondSignal } from "./data";
import { AnimatedParagraph } from "./components/AnimatedParagraph";
import { MemoComponent } from "./components/MemoComponent";
import { Button } from "./components/Button";
import { ComputedComponent } from "./components/ComputedComponent";
import { UseMemoComponent } from "./components/UseMemoComponent";
import { ConstMemoComponent } from "./components/ConstMemoComponent";
import { Section } from "./components/Section";

export function App() {
  const [memoProp, setMemoProp] = useState(() =>
    generatePrefixedRandomString("This is a memoized component ", 5)
  );

  const [internalState, setInternalState] = useState(
    generatePrefixedRandomString("This is an internal state ", 5)
  );

  const changeMemoProp = useCallback(() => {
    setMemoProp(
      generatePrefixedRandomString("This is a memoized component ", 5)
    );
  }, [setMemoProp]);

  const changeInternalState = useCallback(() => {
    setInternalState(
      generatePrefixedRandomString("This is an internal state ", 5)
    );
  }, [setInternalState]);

  const changeFirstSignal = useCallback(() => {
    firstSignal.value = generatePrefixedRandomString("first signal ", 5);
  }, []);

  const changeSecondSignal = useCallback(() => {
    secondSignal.value = generatePrefixedRandomString("second signal ", 5);
  }, []);

  return (
    <div>
      <Section grid>
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
      </Section>
      <Section>
        <AnimatedParagraph>
          <strong>{"[App] "}</strong>
          {internalState}
        </AnimatedParagraph>
        <UseMemoComponent valueOne={memoProp} valueTwo={internalState} />
        <MemoComponent value={memoProp} />
        <ComputedComponent />
        <ConstMemoComponent value={memoProp} />
      </Section>
    </div>
  );
}

render(<App />, document.getElementById("app"));
