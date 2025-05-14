import { ReactNode } from "react";
import '../styles/globals.css';

export default function OnepageScroll({ children }: { children: ReactNode }) {
    return (
        <div className="landingMain">
            {children}
            <div className="scrollbar">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span id="scrollbar-highlight" />
            </div>
        </div>
    );
}
