import NavBar from "@/components/NavBar";
import OnepageScroll from "@/components/OnepageScroll";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeatureSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialSection";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import '../styles/globals.css';

function Home() {
    return (
        <>
            <NavBar />
            <main className="landingMain">
                <OnepageScroll>
                    <HeroSection />
                    <FeaturesSection />
                    <AboutSection />
                    <TestimonialsSection />
                    <CallToAction />
                </OnepageScroll>
            </main>
            <Footer />
        </>
    );
}

export default Home;
