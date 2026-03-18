import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const LOADING_PHRASES = ['initialising', 'compiling', 'rendering', 'launching'];

export default function LoadingScreen() {
    const [visible, setVisible] = useState(true);
    const [progress, setProgress] = useState(0);
    const [phraseIdx, setPhraseIdx] = useState(0);

    useEffect(() => {
        // Progress animation - smooth ease-out curve
        const start = Date.now();
        const duration = 1900;

        const tick = () => {
            const elapsed = Date.now() - start;
            const t = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - t, 3);
            setProgress(Math.floor(eased * 100));
            if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);

        // Cycle through phrases
        const phraseInterval = setInterval(() => {
            setPhraseIdx(i => (i + 1) % LOADING_PHRASES.length);
        }, 480);

        const timer = setTimeout(() => setVisible(false), 2100);
        return () => {
            clearTimeout(timer);
            clearInterval(phraseInterval);
        };
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    key="loader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.06, filter: 'blur(12px)' }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
                    style={{ background: 'hsl(222 28% 3%)' }}
                >
                    {/* Pulsing radial orb */}
                    <motion.div
                        animate={{
                            scale: [1, 1.25, 1],
                            opacity: [0.04, 0.1, 0.04],
                        }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
                        style={{ background: 'radial-gradient(circle, hsl(162 85% 48%), transparent 70%)' }}
                    />
                    <motion.div
                        animate={{
                            scale: [1.2, 1, 1.2],
                            opacity: [0.03, 0.06, 0.03],
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                        className="absolute w-[350px] h-[350px] rounded-full pointer-events-none"
                        style={{ background: 'radial-gradient(circle, hsl(268 65% 62%), transparent 70%)' }}
                    />

                    {/* Logo mark with ring */}
                    <div className="relative mb-10">
                        {/* Outer spinning ring */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                            className="absolute inset-0 -m-5 rounded-full"
                            style={{
                                border: '1px solid transparent',
                                borderTopColor: 'hsl(162 85% 48% / 0.6)',
                                borderRightColor: 'hsl(268 65% 62% / 0.3)',
                                width: 'calc(100% + 40px)',
                                height: 'calc(100% + 40px)',
                            }}
                        />
                        {/* Inner counter-spinning ring */}
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                            className="absolute inset-0 -m-2 rounded-full"
                            style={{
                                border: '1px solid transparent',
                                borderBottomColor: 'hsl(162 85% 48% / 0.4)',
                                width: 'calc(100% + 16px)',
                                height: 'calc(100% + 16px)',
                            }}
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.5, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="relative text-5xl font-bold mono"
                            style={{
                                background: 'linear-gradient(135deg, hsl(162 85% 52%), hsl(268 65% 65%))',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                textShadow: 'none',
                            }}
                        >
                            SER
                        </motion.div>
                    </div>

                    {/* Progress bar */}
                    <div className="w-52 h-[2px] bg-white/5 rounded-full overflow-hidden mb-4 relative">
                        <motion.div
                            className="h-full rounded-full"
                            style={{
                                width: `${progress}%`,
                                background: 'linear-gradient(90deg, hsl(162 85% 48%), hsl(268 65% 62%))',
                                boxShadow: '0 0 10px hsl(162 85% 48% / 0.7)',
                            }}
                            transition={{ ease: 'easeOut' }}
                        />
                    </div>

                    {/* Animated phrase */}
                    <div className="h-5 overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={phraseIdx}
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -10, opacity: 0 }}
                                transition={{ duration: 0.25, ease: 'easeOut' }}
                                className="mono text-[11px] text-muted-foreground/50 tracking-[0.25em] uppercase"
                            >
                                {LOADING_PHRASES[phraseIdx]}...
                            </motion.p>
                        </AnimatePresence>
                    </div>

                    {/* Percentage */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mono text-xs text-primary/40 mt-2"
                    >
                        {progress}%
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
