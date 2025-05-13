import styles from "./CallToAction.module.css";

const CallToAction = () => {
    return (
        <section className={styles.section}>
            <h2 className={styles.heading}>Ready to get started?</h2>
            <a href="/register_redirect">
                <button className={styles.button}>Join Netro Now</button>
            </a>
        </section>
    );
};

export default CallToAction;
