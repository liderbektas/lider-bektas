'use client';

import { useRef, useState } from "react";
import Button from "../button";
import { AnimatePresence, motion, Variants } from "framer-motion";
import Navbar from "./components/nav";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useLoader } from "@/context/loader";

export default function Header() {

    const { loaderFinished } = useLoader();
    const containerRef = useRef<HTMLDivElement>(null);
    const [isActive, setIsActive] = useState(false);

    const menu: Variants = {
        open: {
            width: "min(480px, 90vw)",
            height: "min(650px, 85vh)",
            top: "-25px",
            right: "-25px",
            transition: { duration: 0.75, type: "tween" as const, ease: [0.76, 0, 0.24, 1] }
        },

        closed: {
            width: "100px",
            height: "40px",
            top: "0px",
            right: "0px",
            transition: { duration: 0.75, delay: 0.35, type: "tween" as const, ease: [0.76, 0, 0.24, 1] }
        }
    };

    useGSAP(() => {
        if (loaderFinished && containerRef.current) {
            gsap.fromTo(containerRef.current,
                {
                    opacity: 0,
                    x: 50
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    delay: 0.5,
                    ease: "power2.out"
                })
        }
    }, [loaderFinished])

    if (!loaderFinished) return null;

    return (
        <header>
            <div ref={containerRef} className="fixed top-10 right-10 z-50">
                <motion.div
                    className='relative bg-menuButton rounded-[25px] w-25 h-10'
                    variants={menu}
                    animate={isActive ? "open" : "closed"}
                    initial="closed"
                >
                    <AnimatePresence>
                        {isActive && <Navbar />}
                    </AnimatePresence>
                </motion.div>
                <Button isActive={isActive} toggleMenu={() => setIsActive(!isActive)} />
            </div>
        </header>
    );
}