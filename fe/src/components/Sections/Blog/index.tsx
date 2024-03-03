import cards from "./contstant"
import Card from "./Card-default"
import styles from "./styles.module.sass"

export default function Blog() {
    return (
        <section className={`section`}>
            <div className="container">
                <h2>Blog</h2>
                <p>
                    The most interesting thing about the Slot brain is here
                </p>

                <div className={styles.cards}>

                    {cards.map((i: any, ind: number) => (
                        <Card key={ind} data={i} />
                    ))}

                </div>
            </div>
        </section>
    )
}
