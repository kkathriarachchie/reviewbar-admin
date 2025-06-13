"use client";

import { LoadingScreen } from "@/components/ui/loading-screen";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <LoadingScreen message="Please wait, loading content..." />;
  }

  if (session) {
    redirect("/dashboard");
  }

  redirect("/sign-in");
}
