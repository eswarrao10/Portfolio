import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 80,
        damping: 22,
        restDelta: 0.001,
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
            style={{
                scaleX,
                background: 'linear-gradient(90deg, hsl(162 85% 48%), hsl(268 65% 62%), hsl(162 85% 52%))',
                boxShadow: '0 0 10px hsl(162 85% 48% / 0.6)',
            }}
        />
    );
}
