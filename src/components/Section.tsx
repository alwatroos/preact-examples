import { PropsWithChildren, memo } from "preact/compat";

export const Section = memo(function Section({
  children,
  grid = false,
}: PropsWithChildren<{ grid?: boolean }>) {
  return <section className={grid && "grid"}>{children}</section>;
});
