import Link from "next/link"
import Image from "next/image"


import styles from "./styles.module.sass"
import casinos from "./constant"

export default function Casino() {
    return (
        <section className="section casino">
            <div className="container">
                <h2>
                    Casino Reviews
                </h2>
                <p>
                    Top Paying Casinos. They’re just like the real machines.
                </p>

                <div className={styles.cards}>
                    {casinos.map((i: any, ind: number) => (
                        <Link href={i.url} key={ind} className={styles.card}>
                            <div className={styles.card_wrap}>
                                <Image src={i.img} alt={i.title} />
                            </div>
                            <div className={styles.card_content}>
                                <div className={styles.card_title}>
                                    {i.title}
                                </div>
                                <div className={styles.card_description}>
                                    {i.profit}
                                </div>
                                <button className={styles.card_btn}>
                                    Learn More
                                </button>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    )
}