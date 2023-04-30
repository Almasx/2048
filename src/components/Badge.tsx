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
        "rounded-xl border px-3 py-1 outline-none duration-150 ease-in-out hover:bg-dark hover:text-light dark:hover:bg-light dark:hover:text-dark",
        active
          ? "flex flex-row items-center border-transparent bg-dark text-white dark:bg-light dark:text-black "
          : "border-gray-light dark:border-gray-dark-secondary "
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
