export default function About() {
    const sectionStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
    };

    const articleStyle: React.CSSProperties = {
        animation: 'fadein-firstSection 1s',
    };

    const textBlockStyle: React.CSSProperties = {
        color: 'var(--textgrey)',
        position: 'relative',
        overflow: 'hidden',
        top: '50%',
        transform: 'translate(0, calc(-50% - 60px))',
    };

    const h1Style: React.CSSProperties = {
        fontSize: '3rem',
        fontWeight: 'bold',
        lineHeight: '1.1',
        margin: 0,
    };

    const paragraphStyle: React.CSSProperties = {
        fontSize: '1.25rem',
        marginTop: '1rem',
        maxWidth: '40rem',
    };

    return (
        <section style={sectionStyle}>
            <article style={articleStyle}>
                <div style={textBlockStyle}>
                    <h1 style={h1Style}>
                        About the Project
                    </h1>
                    <p style={paragraphStyle}>
                        Netro - Chat was created by three IT students with a shared vision: to build a platform that connects people
                        through their similarities.
                        Our goal is to make social media more personal, intelligent, and less superficial.

                        What started as a university project quickly grew into something bigger. Netro is the result of months
                        of development, passion,
                        and the desire to bring real value to the digital world. We’re excited to welcome you to Netro and shape
                        the future of social networking together!
                    </p>
                </div>
            </article>
        </section>
    );
}
