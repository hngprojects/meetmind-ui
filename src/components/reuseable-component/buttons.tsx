import type { ReactNode } from "react";
import { Button } from "../ui/button";

interface Props {
  style?: string;
  style2?: string;
  text: string;
  onClick?: (() => void | undefined) | undefined;
  disabled?: boolean;
  icon?: ReactNode;
  icon2?: ReactNode;
  type: "reset" | "submit" | "button";
}

const Buttons = ({
  style,
  style2,
  text,
  onClick,
  disabled,
  type,
  icon,
  icon2,
}: Props) => {
  return (
    <div className={` ${style2}`}>
      <Button
        variant="default"
        className={`${style} w-full rounded-lg 
           hover:cursor-pointer flex items-center justify-center`}
        onClick={onClick}
        disabled={disabled}
        type={type}
      >
        {icon}
        {text}
        {icon2}
      </Button>
    </div>
  );
};

export default Buttons;
