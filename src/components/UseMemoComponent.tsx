import { useMemo } from "preact/hooks";
import { AnimatedParagraph } from "./AnimatedParagraph";

export const UseMemoComponent = function UseMemoComponent({
  valueOne,
  valueTwo,
}: {
  valueOne: string;
  valueTwo: string;
}) {
  const value = useMemo(() => {
    console.log("[UseMemoComponent] useMemo called");
    return valueOne + " " + valueTwo;
  }, [valueOne, valueTwo]);
  return (
    <AnimatedParagraph>
      <strong>{"[UseMemoComponent] "}</strong>
      {value}
    </AnimatedParagraph>
  );
};
