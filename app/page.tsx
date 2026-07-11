"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";

import LoadingScreen from "@/components/LoadingScreen";
import PasswordGate from "@/components/PasswordGate";
import Hero from "@/components/Hero";
import GoldenCursor from "@/components/GoldenCursor";
import MusicPlayer from "@/components/MusicPlayer";
import StepFlow from "@/components/StepFlow";
import Footer from "@/components/Footer";

// Below-the-fold sections are dynamically imported to keep the
// initial bundle light — they mount only once each step is reached.
const IntroLetter = dynamic(() => import("@/components/IntroLetter"));
const Timeline = dynamic(() => import("@/components/Timeline"));
const PhotoGallery = dynamic(() => import("@/components/PhotoGallery"));
const VideoGallery = dynamic(() => import("@/components/VideoGallery"));
const ShayriSection = dynamic(() => import("@/components/ShayriSection"));
const Wishes = dynamic(() => import("@/components/Wishes"));
const CakeCelebration = dynamic(() => import("@/components/CakeCelebration"));
const Countdown = dynamic(() => import("@/components/Countdown"));
const GiftReveal = dynamic(() => import("@/components/GiftReveal"));

type Stage = "loading" | "locked" | "unlocked";

export default function Home() {
  const [stage, setStage] = useState<Stage>("loading");

  const steps = [
    { label: "Welcome", render: (goNext: () => void) => <Hero onBegin={goNext} /> },
    { label: "The Letter", render: () => <IntroLetter /> },
    // { label: "Our Story", render: () => <Timeline /> },
    { label: "Gallery", render: () => <PhotoGallery /> },
    { label: "Shayari", render: () => <ShayriSection /> },
        { label: "Films", render: () => <VideoGallery /> },

    { label: "You Are", render: () => <Wishes /> },
    { label: "Celebrate", render: () => <CakeCelebration /> },
    // { label: "Countdown", render: () => <Countdown /> },
    { label: "Your Gift", render: () => <GiftReveal /> },
    {
      label: "The End",
      render: (_goNext: () => void, goToStart: () => void) => (
        <Footer onRestart={goToStart} />
      ),
    },
  ];

  return (
    <main className="relative">
      <GoldenCursor />

      <AnimatePresence mode="wait">
        {stage === "loading" && (
          <LoadingScreen key="loading" onComplete={() => setStage("locked")} />
        )}
      </AnimatePresence>

      {/* {stage === "locked" && (
        <PasswordGate onUnlock={() => setStage("unlocked")} />
      )} */}

      {/* {stage === "unlocked" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <StepFlow steps={steps} />
          <MusicPlayer />
        </motion.div>
      )} */}
    </main>
  );
}
