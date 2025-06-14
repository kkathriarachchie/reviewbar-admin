import { Skeleton } from "@/components/ui/skeleton";

interface LoadingScreenProps {
  message?: string;
}

import Image from "next/image";

export function LoadingScreen({ message = "Loading..." }: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="animate-fade-up-down">
          <Image
            src="/favicon.ico"
            alt="Review Bar Logo"
            width={55}
            height={55}
            priority
            className="object-contain"
          />
        </div>
        <div className="space-y-2">
          <Skeleton className="bg-white" />

          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex space-x-2">
              <div className="h-4 w-4 animate-bounce rounded-full bg-[oklch(75.56%_0.182_142.9)] [animation-delay:-0.3s] " />
              <div className="h-4 w-4 animate-bounce rounded-full bg-[oklch(75.56%_0.182_142.9)] [animation-delay:-0.15s]" />
              <div className="h-4 w-4 animate-bounce rounded-full bg-[oklch(75.56%_0.182_142.9)]" />
            </div>
            <p className="text-sm text-muted-foreground sm:text-base">
              {message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
