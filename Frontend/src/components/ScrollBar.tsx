import { useEffect, useRef, useState } from "react";
import "../styles/landing.css";
import "../styles/ScrollBar.css";

interface ScrollIndicatorProps {
    count: number;
    activeIndex: number;
}

export default function ScrollBar({ count, activeIndex }: ScrollIndicatorProps) {
    const [dotPositions, setDotPositions] = useState<number[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    // Speichert die vertikale Position jedes Punktes
    useEffect(() => {
        if (!containerRef.current) return;
        const dots = Array.from(containerRef.current.querySelectorAll(".scroll-dot"));
        const positions = dots.map((dot) => (dot as HTMLDivElement).offsetTop);
        setDotPositions(positions);
    }, [count]);

    return (
        <div className="scroll-indicator" ref={containerRef}>
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="scroll-dot" />
            ))}
            {dotPositions.length > 0 && (
                <div
                    className="scroll-dot scroll-active-indicator"
                    style={{ top: dotPositions[activeIndex] }}
                />
            )}
        </div>
    );
}
