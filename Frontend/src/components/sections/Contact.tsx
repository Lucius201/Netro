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
                        Contributers
                    </h1>
                    <div style={paragraphStyle}>
                        <ul>
                            <li>Lucius Lechner</li>
                            <li>Atussa Mehrawari</li>
                            <li>Johann Flögel</li>
                        </ul>
                    </div>

                </div>
            </article>
        </section>
    );
}
