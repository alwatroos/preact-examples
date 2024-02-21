import { memo } from "preact/compat";

export const Button = memo(function Button({
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
