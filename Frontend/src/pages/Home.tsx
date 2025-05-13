import Navbar from "../components/NavBar";
import OnepageScroll from "../components/OnepageScroll.tsx";

const Section1 = () => <div className="bg-red-500 w-full h-full"></div>;
const Section2 = () => <div className="bg-green-500 w-full h-full"></div>;
const Section3 = () => <div className="bg-blue-500 w-full h-full"></div>;


function Home() {
    return (
        <>
            <Navbar></Navbar>
            <OnepageScroll>
                <Section1 />
                <Section2 />
                <Section3 />
                <Section1 />
                <Section2 />
                <Section3 />
            </OnepageScroll>
        </>
    );
}
