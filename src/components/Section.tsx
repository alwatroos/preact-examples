import { PropsWithChildren } from "preact/compat";

export const Section = ({
  children,
  grid = false,
}: PropsWithChildren<{ grid?: boolean }>) => {
  return <section className={grid && "grid"}>{children}</section>;
};
