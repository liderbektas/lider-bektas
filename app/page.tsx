'use client'

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Loader from "../components/loader";
import { useEffect, useRef, useState } from "react";
import { useLoader } from "@/context/loader";

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const { loaderFinished, setLoaderFinished } = useLoader();
  const [windowsWidth, setWindowsWidth] = useState(0);

  useGSAP(() => {
    if (loaderFinished && mainRef.current) {
      gsap.fromTo(mainRef.current,
        {
          opacity: 0,
          y: 20
        },
        {
          duration: 1,
          opacity: 1,
          y: 0,
          ease: "power2.out"
        }
      );
    }
  }, [loaderFinished]);

  useEffect(() => {
    setWindowsWidth(window.innerWidth);
  }, [])

  const getBlocks = () => {
    const blockSize = windowsWidth * 0.05;
    const nbOfBlocks = Math.ceil(window.innerHeight / blockSize);
    return [...Array(nbOfBlocks).keys()].map((_, index) => {
      return (
        <div
          onMouseEnter={(e) => { colorize(e.target as HTMLDivElement) }}
          key={index}
          className="w-full h-[5vw]"
        />
      )
    })
  }

  const colorize = (el: HTMLDivElement) => {
    el.style.backgroundColor = 'white'
    setTimeout(() => {
      el.style.backgroundColor = 'transparent';
    }, 300)
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      {!loaderFinished ? (
        <Loader onComplete={() => setLoaderFinished(true)} />
      ) : (
        <div className="flex h-screen items-center justify-center bg-primary w-full">
          <div ref={mainRef} className="relative z-10 pointer-events-none mix-blend-difference text-white text-center flex flex-col items-center px-4">
            <h1 className="leading-[0.9] tracking-tight font-light">
              <span className="vintage-name italic font-normal text-[clamp(3rem,10vw,5rem)]">
                Lider
              </span>
              <br />
              <span className="vintage-title text-[clamp(2.5rem,9vw,5rem)]">
                BEKTAŞ
              </span>
            </h1>
            <div className="w-[60%] h-px bg-white my-[clamp(1rem,4vw,1.7rem)] opacity-40"></div>
            <p className="vintage-elegant text-[clamp(0.7rem,2.2vw,1.2rem)] tracking-[0.3em] opacity-80">
              CREATIVE DEVELOPER
            </p>
            <p className="vintage-name italic text-[clamp(0.6rem,2vw,1rem)] mt-[clamp(0.5rem,2vw,0.75rem)] tracking-wide opacity-60">
              Istanbul, Turkey
            </p>
            <p className="vintage-title text-[clamp(0.8rem,1.7vw,0.875rem)] mt-[clamp(1.5rem,5vw,2rem)] tracking-[0.4em] opacity-50">
              © 2025
            </p>
          </div>

          <div className="flex h-full w-full overflow-hidden absolute">
            {
              windowsWidth > 0 && [...Array(20).keys()].map((_, index) => {
                return (
                  <div key={index} className="w-[5vw]">
                    {getBlocks()}
                  </div>
                )
              })
            }
          </div>
        </div>
      )}
    </div>
  );
}