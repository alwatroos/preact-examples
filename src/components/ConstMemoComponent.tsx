import { memo } from "preact/compat";
import { AnimatedParagraph } from "./AnimatedParagraph";

export const ConstMemoComponent = memo(
  function ConstStaticMemoComponent({ value }: { value: string }) {
    return (
      <AnimatedParagraph>
        <strong>{"[ConstMemoComponent] "}</strong>
        {value}
      </AnimatedParagraph>
    );
  },
  () => true
);
