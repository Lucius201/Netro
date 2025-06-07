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
                        Getting Started
                    </h1>
                    <p style={paragraphStyle}>
                        Our Web 1:1 Messenger brings direct, private conversations to the forefront. Instead of crowded group chats and distractions, the focus is on meaningful, one-on-one interactions.
                        Start Your Chat – Create a profile or jump right in.
                        Reach the Right Person – Our clean, intuitive system connects you directly to who you need.
                        Talk Your Way – Whether it's messages, emojis, or file sharing – you choose how to communicate.
                        This messenger is more than just a chat tool – it’s your personal space for real, secure, one-on-one conversations.
                    </p>
                </div>
            </article>
        </section>
    );
}
