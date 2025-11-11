import { cn } from "@/lib/utils";
interface ContainProps {
    children : React.ReactNode;
    className ? : string;
}

export default function Container({children , className} : ContainProps) {
    return (
        <div className={cn("container mx-auto px-4", className)}>
          {children}
        </div>
    );
}