import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import AnimatedSvg from './AnimatedSvg';


const ThemeToggler = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;
    return (
        <span
            className=""
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            aria-label="Toggle Dark Mode"
        >
            {theme === 'light' ? (
                <AnimatedSvg />
            ) : (
                <AnimatedSvg />
            )}
        </span>
    );
};

export default ThemeToggler;