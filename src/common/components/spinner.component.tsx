import React from "react";
import { ProgressSpinner } from "primereact/progressspinner";

interface ISpinnerProps {
  duration: string;
  color?: string;
  fill?: string;
  hidden: boolean;
  className?: string;
}

export function Spinner({
  duration,
  color = "#533893",
  fill = "transparent",
  hidden,
  className,
}: ISpinnerProps): React.JSX.Element {
  return (
    <div className="p-spinner">
      <ProgressSpinner
        animationDuration={duration}
        color={color}
        fill={fill}
        hidden={hidden}
        className={className}
      />
    </div>
  );
}
