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
      <LandingHeader />
      <HeroSection />

      <HowWorksSection />
      <Pricing />
      <div
        className="relative bg-cover mt-20 border-t-4 border-primary"
        id="signup"
        style={{
          backgroundImage: "url(/back.svg)",
        }}
      >
        <Footer />
      </div>
    </div>
  );
}
