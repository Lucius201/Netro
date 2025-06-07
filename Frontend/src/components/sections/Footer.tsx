import landscape from '../../assets/landscape.jpg';

export default function Footer() {
    const sectionStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: `url(${landscape})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top',
        width: '100%',
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
        marginBottom: '300px',
        textAlign: "center"
    };

    return (
        <section style={sectionStyle}>
            <article style={articleStyle}>
                <div style={textBlockStyle}>
                    <h1 style={h1Style}>
                        Footer
                    </h1>
                </div>
            </article>
        </section>
    );
}
