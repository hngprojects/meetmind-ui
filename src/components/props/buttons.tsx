import type { ReactNode } from "react";
import { Button } from "../ui/button";

interface Props {
  style?: string;
  style2?: string;
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: ReactNode;
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
      </Button>
    </div>
  );
};

export default Buttons;
