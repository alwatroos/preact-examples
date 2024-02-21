import { useComputed } from "@preact/signals";
import { firstSignal, secondSignal } from "../data";
import { AnimatedParagraph } from "./AnimatedParagraph";
import { memo } from "preact/compat";

export const ComputedComponent = memo(function ComputedComponent() {
  const computedValue = useComputed(
    () => firstSignal.value + " " + secondSignal.value
  );
  return (
    <AnimatedParagraph>
      <strong>{"[ComputedComponent] "}</strong>
      {computedValue.value}
    </AnimatedParagraph>
  );
});
