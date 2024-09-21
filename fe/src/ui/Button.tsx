import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

// експорт, для мімікрації Link під кнопку
export const ButtonClassName =
  "flex items-center justify-center rounded-lg p-2 font-medium transition-colors hover:bg-teraActive focus-visible:bg-teraActive focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:bg-teraActive aria-disabled:cursor-not-allowed aria-disabled:opacity-50 bg-terracotta text-white";

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button {...rest} className={clsx(ButtonClassName, className)}>
      {children}
    </button>
  );
}
