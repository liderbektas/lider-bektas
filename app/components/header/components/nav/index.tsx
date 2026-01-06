import { motion, Variants } from 'framer-motion';

export default function Navbar() {
    const links = [
        {
            title: "Projects",
            href: "/"
        },
        {
            title: "About",
            href: "/"
        },
        {
            title: "CV",
            href: "/"
        },
    ];

    const perspective: Variants = {
        initial: {
            opacity: 0,
            rotateX: 90,
            translateY: 40,
            translateX: 0,
        },
        enter: (i: number) => ({
            opacity: 1,
            rotateX: 0,
            translateY: 0,
            translateX: 0,
            transition: {
                duration: 0.65,
                delay: 0.5 + (i * 0.1),
                ease: [.215, .61, .355, 1],
                opacity: { duration: 0.35 }
            }
        }),
        exit: {
            opacity: 0,
            transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
        }
    }

    return (
        <div className="flex flex-col justify-between pt-25 px-10 pb-12.5 h-full box-border">
            <div className="flex flex-col gap-2.5">
                {links.map((link, i) => {
                    const { title, href } = link;
                    return (
                        <div
                            key={`b_${i}`}
                            className="perspective-[120px] perspective-origin-bottom"
                        >
                            <motion.div
                                custom={i}
                                variants={perspective}
                                initial="initial"
                                animate="enter"
                                exit="exit"
                            >
                                <a
                                    href={href}
                                    className="no-underline text-black text-[40px]"
                                >
                                    {title}
                                </a>
                            </motion.div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}