import * as React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
  title: string;
  onClick?: () => void;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, icon, title, onClick, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow-lg p-6 flex flex-col items-center cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95",
        className
      )}
      onClick={onClick}
      {...props}
    >
      <div className="text-6xl pt-[15px] text-neutral-500">{icon}</div>
      <div className="font-semibold text-center pt-[10px] pb-[15px] text-neutral-500">
        {title}
      </div>
    </div>
  )
);
Card.displayName = "Card";

export { Card };
