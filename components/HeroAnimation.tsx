import React from 'react';
import { motion, useMotionValue, useTransform, MotionValue } from 'framer-motion';
import { DocumentIcon, CheckCircleIcon, PencilIcon, LightbulbIcon, PaperAirplaneIcon } from './icons';

const containerVariants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 10 } },
};

const AnimatedCard: React.FC<{
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    x: MotionValue<number>;
    y: MotionValue<number>;
}> = ({ children, className, style, x, y }) => {
    return (
        <motion.div
            variants={itemVariants}
            className={`absolute rounded-2xl shadow-xl ${className}`}
            style={{ ...style, x, y }}
            animate={{
                y: [0, -10, 0],
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: Math.random() * 2,
            }}
        >
            {children}
        </motion.div>
    );
};

const FloatingIcon: React.FC<{
    icon: React.ReactNode;
    className: string;
    x: MotionValue<number>;
    y: MotionValue<number>;
    delay?: number;
}> = ({ icon, className, x, y, delay = 0 }) => {
    return (
        <motion.div
            variants={itemVariants}
            className={`absolute text-gray-400/70 dark:text-gray-500/70 ${className}`}
            style={{ x, y }}
            animate={{
                y: [0, -8, 0],
                rotate: [0, 5, 0],
            }}
            transition={{
                duration: 5 + Math.random() * 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay
            }}
        >
            {icon}
        </motion.div>
    );
};


const HeroAnimation: React.FC = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const { clientX, clientY, currentTarget } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const x = (clientX - left) / width - 0.5;
        const y = (clientY - top) / height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    }
    
    // Parallax transformations for cards
    const x1 = useTransform(mouseX, (v) => v * -30);
    const y1 = useTransform(mouseY, (v) => v * -30);
    const x2 = useTransform(mouseX, (v) => v * 20);
    const y2 = useTransform(mouseY, (v) => v * 20);
    const x3 = useTransform(mouseX, (v) => v * -15);
    const y3 = useTransform(mouseY, (v) => v * 35);

    // Parallax transformations for background orbs (stronger effect for depth)
    const x_orb1 = useTransform(mouseX, (v) => v * -60);
    const y_orb1 = useTransform(mouseY, (v) => v * 40);
    const x_orb2 = useTransform(mouseX, (v) => v * 50);
    const y_orb2 = useTransform(mouseY, (v) => v * -50);
    const x_orb3 = useTransform(mouseX, (v) => v * -35);
    const y_orb3 = useTransform(mouseY, (v) => v * 60);

    // Parallax for floating icons
    const x_icon1 = useTransform(mouseX, v => v * 40);
    const y_icon1 = useTransform(mouseY, v => v * -20);
    const x_icon2 = useTransform(mouseX, v => v * -25);
    const y_icon2 = useTransform(mouseY, v => v * 50);
    const x_icon3 = useTransform(mouseX, v => v * 15);
    const y_icon3 = useTransform(mouseY, v => v * -40);


    return (
        <motion.div
            className="relative w-full h-full flex items-center justify-center"
            variants={containerVariants}
            initial="initial"
            animate="animate"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Background Orbs */}
            <motion.div
                className="absolute w-48 h-48 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full filter blur-3xl"
                style={{ x: x_orb1, y: y_orb1, top: '5%', left: '20%' }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
                className="absolute w-40 h-40 bg-purple-500/10 dark:bg-purple-500/20 rounded-full filter blur-3xl"
                style={{ x: x_orb2, y: y_orb2, top: '50%', right: '10%' }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            />
            <motion.div
                className="absolute w-32 h-32 bg-pink-500/10 dark:bg-pink-500/20 rounded-full filter blur-2xl"
                style={{ x: x_orb3, y: y_orb3, bottom: '10%', left: '40%' }}
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />

            {/* Floating Decorative Icons */}
            <FloatingIcon icon={<PencilIcon className="w-8 h-8" />} className="top-1/4 left-0" x={x_icon1} y={y_icon1} delay={0.5} />
            <FloatingIcon icon={<LightbulbIcon className="w-8 h-8" />} className="top-10 right-1/4" x={x_icon2} y={y_icon2} delay={1} />
            <FloatingIcon icon={<PaperAirplaneIcon className="w-8 h-8 -rotate-45" />} className="bottom-10 right-10" x={x_icon3} y={y_icon3} delay={0} />

            {/* Card 1: Document */}
            <AnimatedCard className="p-4 w-64 h-40 bg-[#FFFBF0] border border-gray-200" style={{ top: '10%', left: '5%' }} x={x1} y={y1}>
                <div className="flex items-center gap-2 mb-2">
                    <DocumentIcon className="w-5 h-5 text-gray-500" />
                    <h3 className="font-bold text-sm text-gray-800">Project Phoenix</h3>
                </div>
                <div className="space-y-1.5">
                    <div className="h-2 w-full bg-gray-300 rounded-full"></div>
                    <div className="h-2 w-5/6 bg-gray-300 rounded-full"></div>
                    <div className="h-2 w-3/4 bg-gray-300 rounded-full"></div>
                </div>
            </AnimatedCard>

            {/* Card 2: Kanban Task */}
            <AnimatedCard className="p-4 w-56 bg-[#E6F8F0] border border-gray-200" style={{ top: '35%', right: '0%' }} x={x2} y={y2}>
                <div className="flex items-start gap-2">
                    <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                        <p className="font-medium text-sm text-gray-800">Design Mockups</p>
                        <div className="mt-2 flex items-center gap-2">
                            <span className="text-xs font-semibold text-red-800 bg-red-200 px-2 py-0.5 rounded-full">High</span>
                            <img src="https://api.dicebear.com/8.x/adventurer/svg?seed=Sam" alt="Sam" className="w-5 h-5 rounded-full"/>
                        </div>
                    </div>
                </div>
            </AnimatedCard>

            {/* Card 3: Chat Message */}
            <AnimatedCard className="p-3 w-60 bg-[#EBF4FF] border border-gray-200" style={{ bottom: '15%', left: '20%' }} x={x3} y={y3}>
                 <div className="flex items-start gap-2">
                    <img src="https://api.dicebear.com/8.x/adventurer/svg?seed=Alex" alt="Alex" className="w-7 h-7 rounded-full"/>
                    <div>
                        <p className="font-semibold text-xs text-gray-800">Alex</p>
                        <p className="text-sm bg-blue-500 text-white p-2 rounded-lg mt-1">Great idea! Let's sync up on this tomorrow.</p>
                    </div>
                </div>
            </AnimatedCard>

        </motion.div>
    );
};

export default HeroAnimation;