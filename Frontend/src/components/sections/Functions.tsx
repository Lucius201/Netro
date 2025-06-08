import logo from '../../assets/netro.png';

export default function About() {
    const sectionStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
    };

    const articleStyle: React.CSSProperties = {
        animation: 'fadein-firstSection 1s',
        left: '60%',
        transform: 'translate(-50%)'
    };

    return (
        <section style={sectionStyle}>
            <article style={articleStyle}>
                <div className="values-text">


                    <h3> Connect securely. </h3>
                    <p className="values-p">Our messenger links you with people who matter—beyond just small
                        talk.</p>

                    <h3> Your privacy matters. </h3>
                    <p className="values-p">We use secure cookies and passwords are securely
                        stored.</p>

                    <h3> Start chatting today. </h3>
                    <p className="values-p">Join Netro Messenger and enjoy safe, meaningful conversations from
                        the start.</p>




                </div>

                <div className="values-logo">
                    <img src={logo} alt="Beschreibung" />

                    <h3> Netro </h3>
                    <p>Free for personal use</p>
                </div>
            </article>
        </section>
    );
}
