import { PropsWithChildren, useEffect, useRef } from "preact/compat";

export const AnimatedParagraph = ({ children }: PropsWithChildren) => {
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
