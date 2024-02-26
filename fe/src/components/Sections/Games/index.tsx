import Link from "next/link"
import Image from "next/image"
import styles from "./styles.module.sass"
import games from "./constant"


export default function Games() {
    return (
        <section className="section games">
            <div className="container">
                <h2>Games</h2>
                <p>We have the most free slots on the internet. Play thousands of games for free.</p>

                <div className={styles.cards}>
                    {games.map((i: any, ind: number) => (
                        <Link className={styles.card} href={i.url} key={ind}>
                            <div className={styles.card_wrap}>
                                <Image src={i.img} />
                            </div>
                            <div className={styles.card_content}>
                                <div className={styles.card_title}>
                                    {i.title}
                                </div>
                                <button className={styles.card_btn}>
                                    Play for free
                                </button>
                            </div>
                        </Link>
                    ))}


                </div>


            </div>
        </section>
    )
}