import { useEffect, useRef, useState, RefCallback } from "react";
import Navbar from "../components/NavBar.tsx";
import HeroSection from "../components/sections/HeroSection.tsx";
import ScrollBar from "../components/ScrollBar";
import "../styles/globals.css";
import "../styles/landing.css";
import Mission from "@/components/sections/GetStarted.tsx";
import About from "@/components/sections/About.tsx";
import Contact from "@/components/sections/Functions.tsx";
import Footer from "@/components/sections/Footer.tsx";



const sections = [
    { id: 1, component: <HeroSection /> },
    { id: 2, component: <Mission /> },
    { id: 3, component: <About /> },
    { id: 4, component: <Contact /> },
    { id: 5, component: <Footer /> },
];

export default function Landing() {
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    const setRef = (index: number): RefCallback<HTMLDivElement> => (el) => {
        sectionRefs.current[index] = el;
    };

    const user = localStorage.getItem("email")
        ? {
            name: localStorage.getItem("email")!,
            avatarUrl: localStorage.getItem("avatarUrl") || "",
        }
        : null;

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const scrollY = container.scrollTop + window.innerHeight / 2;
            const index = sectionRefs.current.findIndex((ref) => {
                if (!ref) return false;
                const top = ref.offsetTop;
                const height = ref.offsetHeight;
                return scrollY >= top && scrollY < top + height;
            });
            if (index !== -1) setActiveIndex(index);
        };

        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <>
            <Navbar user={user}/>

            <div className="container" ref={containerRef}>
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

            <ScrollBar count={sections.length} activeIndex={activeIndex}/>


        </>
    );
}
