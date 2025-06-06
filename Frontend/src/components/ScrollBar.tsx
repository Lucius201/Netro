import "../styles/landing.css"; // oder eigener Pfad, wenn gewünscht

interface ScrollIndicatorProps {
    count: number;
    activeIndex: number;
}

export default function ScrollIndicator({ count, activeIndex }: ScrollIndicatorProps) {
    return (
        <div className="scroll-indicator">
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className={`scroll-dot ${index === activeIndex ? "active" : ""}`}
                />
            ))}
        </div>
    );
}
