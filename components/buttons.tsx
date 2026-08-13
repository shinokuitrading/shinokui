import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/components/utils";

export const buttonStyles = cva(
  "inline-flex items-center justify-center rounded-full border text-sm md:text-base px-6 py-2 md:px-7 md:py-2.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-oceanBrown/70 focus-visible:ring-offset-ivory",
  {
    variants: {
      variant: {
        primary:
          "bg-oceanBrown text-ivory border-oceanBrown hover:bg-oceanBrown/90",
        outline:
          "border-oceanBrown/60 text-oceanBrown hover:bg-oceanBrown/5",
        ghost:
          "border-oceanBrown/40 bg-oceanBrown/10 text-oceanBrown font-semibold hover:bg-oceanBrown/15"
      }
    },
    defaultVariants: {
      variant: "primary"
    }
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles>;

export function Button({ className, variant, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonStyles({ variant, className }))} {...props} />
  );
}
