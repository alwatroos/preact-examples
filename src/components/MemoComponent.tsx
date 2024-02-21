import { memo } from "preact/compat";
import { AnimatedParagraph } from "./AnimatedParagraph";

export const MemoComponent = memo(function MemoComponent({
  value,
}: {
  value: string;
}) {
  return (
    <AnimatedParagraph>
      <strong>{"[MemoComponent] "}</strong>
      {value}
    </AnimatedParagraph>
  );
});
