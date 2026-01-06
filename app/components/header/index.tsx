'use client';

import { useState } from "react";
import Button from "../button";
import { AnimatePresence, motion, Variants } from "framer-motion";
import Navbar from "./components/nav";

export default function Header() {

    const [isActive, setIsActive] = useState(false);

    const menu: Variants = {
        open: {
            width: "480px",
            height: "650px",
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

    return (
        <header className="fixed top-10 right-10 z-50">
            <motion.div
                className='relative bg-menuButton rounded-[25px] w-120 h-162.5'
                variants={menu}
                animate={isActive ? "open" : "closed"}
                initial="closed"
            >
                <AnimatePresence>
                    {isActive && <Navbar />}
                </AnimatePresence>
            </motion.div>
            <Button isActive={isActive} toggleMenu={() => setIsActive(!isActive)} />
        </header>
    );
}