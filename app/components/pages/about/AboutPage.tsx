"use client"
import { Hero } from "@pages/about/Hero";
import { FeaturedPostSection } from "./Featured";
import { Mission } from "./Mission";
import { DeveloperInfo } from "./Developer";
import { TechStack } from "./TechStack";
export function AboutPage() {


  return (
    <>
    <Hero />
    <Mission />
    <FeaturedPostSection />
      <DeveloperInfo />
      <TechStack />
    </>
  )
}