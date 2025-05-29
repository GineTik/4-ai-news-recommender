import { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "./button";
import React from "react";
import { Loader2 } from "lucide-react";

type LoadingButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  } & {
    children: React.ReactNode;
    isLoading?: boolean;
  };

export const LoadingButton = ({
  children,
  isLoading,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button {...props} disabled={isLoading}>
      {isLoading && <Loader2 className="size-4 animate-spin" />}
      {children}
    </Button>
  );
};
