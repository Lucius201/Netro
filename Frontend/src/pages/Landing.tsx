import { useEffect, useRef, useState, RefCallback } from "react";
import Navbar from "../components/NavBarNeu";
import HeroSection from "../components/HeroSection";
import ScrollBar from "../components/ScrollBar";
import "../styles/globals.css";
import "../styles/landing.css";

const sections = [
    { id: 1, component: <HeroSection /> },
    { id: 2, component: <HeroSection /> },
    { id: 3, component: <HeroSection /> },
];

export default function Landing() {
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

    const setRef = (index: number): RefCallback<HTMLDivElement> => (el) => {
        sectionRefs.current[index] = el;
    };

    const user = localStorage.getItem("email")
        ? { name: localStorage.getItem("email")!, avatarUrl: localStorage.getItem("avatarUrl") || "" }
        : null;

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY + window.innerHeight / 2;
            const index = sectionRefs.current.findIndex((ref) => {
                if (!ref) return false;
                const top = ref.offsetTop;
                const height = ref.offsetHeight;
                return scrollY >= top && scrollY < top + height;
            });
            if (index !== -1) setActiveIndex(index);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <Navbar user={user} />
            <div className="container">
                {sections.map((section, index) => (
                    <div
                        key={section.id}
                        ref={setRef(index)}
                        className="section"
                    >
                        {section.component}
                    </div>
                ))}
            </div>
            <ScrollBar count={sections.length} activeIndex={activeIndex} />
        </>
    );
}
