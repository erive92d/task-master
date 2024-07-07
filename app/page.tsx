import LandingPage from "@/components/Landing/LandingPage";
import prisma from "@/lib/prisma";
import { useSession } from "next-auth/react";

export default function Home() {
  

  return <LandingPage/>
}
