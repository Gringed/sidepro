import { currentUser } from "@/auth/current-user";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/features/landing/HeroSection";
import { LandingHeader } from "@/features/landing/LandingHeader";
import Image from "next/image";
import { redirect } from "next/navigation";
import "./landing.css";
import HowWorksSection from "@/features/landing/HowWorksSection";
import Footer from "@/features/landing/Footer";
import Pricing from "@/features/landing/Pricing";

export default async function Home() {
  const user = await currentUser();

  if (user) {
    redirect("/dashboard");
  }
  return (
    <div className="flex flex-col">
      <div className="h-[150px]" />
      <LandingHeader />
      <HeroSection />

      <HowWorksSection />
      <Pricing />
      <Footer />
    </div>
  );
}
