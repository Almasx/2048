import type { ReactNode } from "react";
import clsx from "clsx";

interface BadgeProps {
  children: ReactNode;
  active?: boolean;
  onClick?: (event?: unknown) => void;
  className?: string;
}

const Badge = ({ children, active, onClick, className = "" }: BadgeProps) => {
  return (
    <button
      className={clsx(
        className,
        "rounded-xl border px-3 py-1 outline-none duration-150 ease-in-out hover:bg-white hover:text-black",
        active
          ? "flex flex-row items-center border-transparent bg-white text-black "
          : " border-[#1c1c1c]"
      )}
      onClick={(event) => {
        onClick && onClick(event);
      }}
    >
      {children}
    </button>
  );
};

export default Badge;
