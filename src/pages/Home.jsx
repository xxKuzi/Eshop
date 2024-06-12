import React, { useEffect, useRef, useState } from "react";

import Section from "../components/home/Home_Section";
import Carousel from "../components/home/Home_Carousel";
import Footer from "../parts/Footer";

import Strengths from "../components/home/Home_Strengths";
import Hero from "../components/home/Home_Hero";
import { RevealX, RevealY } from "../animations/Reveal";

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <Carousel />

      <img className="mt-10 drop-shadow-lg" src="wide.jpg" />

      <section id="offer" className="mt-6 flex flex-col items-center">
        <RevealX>
          <Section image="black.png" headline="Sportovní brýle" link="sport" />
        </RevealX>
        <RevealX direction="left">
          <Section image="out1.png" headline="Volnočasové brýle" link="free-time" />
        </RevealX>
      </section>

      <div className="mt-[110px] flex flex-col items-center justify-center ">
        <div className="mx-7 h-[2px] w-[80vw] rounded bg-gray-300"></div>
      </div>

      <Strengths />
      <Footer />
    </div>
  );
}
