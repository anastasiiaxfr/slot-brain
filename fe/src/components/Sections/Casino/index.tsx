
import styles from "./styles.module.sass"
import casinos from "./constant"
import Card from "./Card-default"

export default function Casino() {
    return (
        <section className="section">
            <div className="container">
                <h2>
                    Casino Reviews
                </h2>
                <p>
                    Top Paying Casinos. They’re just like the real machines.
                </p>

                <div className={styles.cards}>
                    {casinos.map((i: any, ind: number) => (
                        <Card data={i} key={ind} />
                    ))}
                </div>

            </div>
        </section>
    )
}