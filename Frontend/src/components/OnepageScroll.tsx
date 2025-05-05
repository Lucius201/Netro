// components/OnePageScrollLayout.tsx
import React from 'react';

interface OnePageScrollLayoutProps {
    children: React.ReactNode;
}

const OnePageScrollLayout: React.FC<OnePageScrollLayoutProps> = ({ children }) => {
    return (
        <div
            className="h-screen w-screen overflow-y-auto snap-y snap-mandatory scroll-smooth no-scrollbar"
            style={{
                scrollbarWidth: 'none', /* Für Firefox */
            }}
        >
            {React.Children.map(children, (child, index) => (
                <section key={index} className="h-screen w-full snap-start flex justify-center items-center">
                    {child}
                </section>
            ))}
        </div>
    );
};

export default OnePageScrollLayout;
