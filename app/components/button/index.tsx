import { motion } from 'framer-motion';

interface ButtonProps {
    isActive: boolean;
    toggleMenu: () => void;
}

export default function Button({ isActive, toggleMenu }: ButtonProps) {
    return (
        <div className="absolute top-0 right-0 w-25 h-10 cursor-pointer rounded-[25px] overflow-hidden text-sm">
            <motion.div
                className="relative w-full h-full"
                animate={{ top: isActive ? "-100%" : "0%" }}
                transition={{ duration: 0.5, type: "tween", ease: [0.76, 0, 0.24, 1] }}
            >
                <div
                    className="w-full h-full bg-menuButton group"
                    onClick={() => toggleMenu()}
                >
                    <PerspectiveText label="Menu" variant="light" />
                </div>

                <div
                    className="w-full h-full bg-black group"
                    onClick={() => toggleMenu()}
                >
                    <PerspectiveText label="Close" variant="dark" />
                </div>
            </motion.div>
        </div>
    )
}

function PerspectiveText({ label, variant }: { label: string; variant: 'light' | 'dark' }) {
    const textColor = variant === 'light' ? 'text-black' : 'text-menuButton';

    return (
        <div
            className="flex flex-col justify-center items-center h-full w-full transition-transform duration-750 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:rotate-x-90"
            style={{ transformStyle: 'preserve-3d' }}
        >
            <p className={`m-0 uppercase pointer-events-none transition-all duration-750 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full group-hover:opacity-0 ${textColor}`}>
                {label}
            </p>
            <p
                className={`m-0 uppercase pointer-events-none absolute transition-all duration-750 ease-[cubic-bezier(0.76,0,0.24,1)] opacity-0 group-hover:opacity-100 ${textColor}`}
                style={{ transformOrigin: 'bottom center', transform: 'rotateX(-90deg) translateY(9px)' }}
            >
                {label}
            </p>
        </div>
    )
}