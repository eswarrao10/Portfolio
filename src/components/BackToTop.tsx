import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
    const [visible, setVisible] = useState(false);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        const handler = () => setVisible(window.scrollY > 450);
        window.addEventListener('scroll', handler, { passive: true });
        return () => window.removeEventListener('scroll', handler);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    key="back-to-top"
                    initial={{ opacity: 0, scale: 0.5, y: 24 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 24 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    onHoverStart={() => setHovered(true)}
                    onHoverEnd={() => setHovered(false)}
                    aria-label="Back to top"
                    className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full flex items-center justify-center relative overflow-hidden"
                    whileHover={{ scale: 1.12, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                        border: '1px solid hsl(162 85% 48% / 0.35)',
                        background: 'hsl(222 22% 7% / 0.9)',
                        backdropFilter: 'blur(16px)',
                        boxShadow: hovered
                            ? '0 0 30px hsl(162 85% 48% / 0.4), 0 8px 24px -8px rgba(0,0,0,0.4)'
                            : '0 0 15px hsl(162 85% 48% / 0.15), 0 4px 12px -4px rgba(0,0,0,0.3)',
                    }}
                >
                    {/* Radial fill on hover */}
                    <motion.span
                        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.4 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 rounded-full bg-primary/10"
                    />
                    <ArrowUp
                        size={17}
                        className="relative z-10 text-primary transition-transform duration-300"
                        style={{ transform: hovered ? 'translateY(-2px)' : 'none' }}
                    />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
