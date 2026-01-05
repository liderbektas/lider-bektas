'use client'
import { useGSAP } from "@gsap/react"
import gsap from "gsap";
import { useRef } from "react"

interface LoaderProps {
    onComplete: () => void
}

export default function Loader({ onComplete }: LoaderProps) {

    const containerRef = useRef<HTMLDivElement>(null);
    const leftPanelRef = useRef<HTMLDivElement>(null);
    const rightPanelRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const hiddenContentRef = useRef<HTMLDivElement>(null);
    const leftLineRef = useRef<HTMLDivElement>(null);
    const rightLineRef = useRef<HTMLDivElement>(null);
    const leftLineFillRef = useRef<HTMLDivElement>(null);
    const rightLineFillRef = useRef<HTMLDivElement>(null);
    const lastSceneRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            onComplete: onComplete
        });

        tl.to([leftPanelRef.current, rightPanelRef.current], {
            backgroundColor: '#232323',
            duration: 0.7,
            ease: "power2.in"
        })
            .to(logoRef.current, {
                opacity: 1,
                duration: 0.5,
                ease: "power2.in"
            })
            .to([leftPanelRef.current, rightPanelRef.current], {
                xPercent: (i) => i === 0 ? -100 : 100,
                duration: 0.9,
                ease: "power3.in",
                stagger: 0
            }, '+=0.7')
            .to(logoRef.current, {
                color: '#fff',
                duration: 0.5,
                ease: "power2.in"
            }, "<")
            .fromTo(hiddenContentRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.1 },
                "<")
            .to([leftLineRef.current, rightLineRef.current], {
                width: 'clamp(8rem, 20vw, 15rem)',
                duration: 0.9,
                ease: "power3.in",
            }, '<')
            .to([leftLineFillRef.current, rightLineFillRef.current], {
                width: '100%',
                duration: 0.8,
                ease: "power2.out",
            }, '>+=0.1')
            .to(logoRef.current, {
                y: 80,
                duration: 0.6,
                ease: "back.in(1.2)"
            })
            .to(logoRef.current, {
                opacity: 0,
                scale: 0.5,
                duration: 0.25,
                ease: "power1.in"
            }, ">-0.25")
            .to([leftLineRef.current, rightLineRef.current], {
                width: 0,
                duration: 0.4,
                ease: "power2.inOut"
            }, "<")
            .to(lastSceneRef.current, {
                opacity: 1,
                duration: 1,
                ease: "power2.inOut"
            })

    }, [onComplete])

    return (
        <div ref={containerRef} className="fixed inset-0 z-50 flex items-center justify-center h-screen w-screen overflow-hidden bg-primary">

            <div ref={hiddenContentRef} className="absolute inset-0 z-0 flex flex-col items-center justify-center opacity-0 text-white">
                <div className="mt-40 flex">
                    <div className="flex justify-end w-[clamp(8rem,20vw,15rem)]">
                        <div ref={leftLineRef} className="h-[0.5px] bg-homeLoader relative w-0">
                            <div ref={leftLineFillRef} className="absolute right-0 top-0 h-full w-0 bg-linear-to-l from-white via-white/80 to-transparent" />
                        </div>
                    </div>
                    <div className="flex justify-start w-[clamp(8rem,20vw,15rem)]">
                        <div ref={rightLineRef} className="h-[0.5px] bg-homeLoader relative w-0">
                            <div ref={rightLineFillRef} className="absolute left-0 top-0 h-full w-0 bg-linear-to-r from-white via-white/80 to-transparent" />
                        </div>
                    </div>
                </div>
            </div>

            <div ref={leftPanelRef} className="h-full w-1/2 bg-black relative z-10 origin-left" />
            <div ref={rightPanelRef} className="h-full w-1/2 bg-black relative z-10 origin-right" />

            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                <div ref={logoRef} className="opacity-0 text-black">
                    <span className="font-bodoni text-[clamp(3rem,8vw,5rem)] tracking-tight">
                        <span className="italic font-light pr-[clamp(0.25rem,1vw,0.5rem)]">L</span>
                        <span className="font-normal">B</span>
                    </span>
                </div>
            </div>

            <div ref={lastSceneRef} className="bg-black fixed inset-0 h-screen w-screen opacity-0"></div>
        </div>
    )
}