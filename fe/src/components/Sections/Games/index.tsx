import Card from "./Card"
import games from "./constant"
import styles from "./styles.module.sass"


export default function Games() {
    return (
        <section className="section">
            <div className="container">
                <h2>Games</h2>
                <p>We have the most free slots on the internet. Play thousands of games for free.</p>

                <div className={styles.cards}>
                    {games.map((i: any, ind: number) => (
                        <Card card={i} key={ind} />
                    ))}
                </div>

            </div>
        </section>
    )
}