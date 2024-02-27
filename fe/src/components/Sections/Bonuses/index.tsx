import Link from "next/link"
import Image from "next/image"
import ReactStars from 'react-stars'

import styles from "./styles.module.sass"
import bonuses from "./constant"

export default function Bonuses() {
    return (
        <section className="section">
            <div className="container">
                <h2>
                    Bonuses
                </h2>
                <p>
                    The best casino in Slot brain
                </p>

                <div className={styles.cards}>
                    {bonuses.slice(0, 3).map((i: any, ind: number) => (
                        <article className={styles.card} key={ind}>
                            <Link className={styles.card_wrap} href={i.url_self}>
                                <Image src={i.img} alt={i.type} />
                            </Link>
                            <div>
                                Bonus type <br /><span>{i.type}</span>
                            </div>
                            <div>
                                Rating
                                <div className={styles.card_rating}>
                                    <ReactStars
                                        count={5}
                                        size={24}
                                        value={i.rating}
                                        edit={false}
                                        color2={'#EB8425'} />
                                </div>

                            </div>
                            <div>
                                <big>
                                    {i.description}
                                </big>

                            </div>
                            <div className={styles.card_cta}>
                                <Link className={`btn ${styles.card_btn}`} href={i.url_blank}>
                                    Get a bonus
                                </Link>
                                <Link className={styles.card_btn_link} href={i.url_self}>
                                    Read Sloto zen
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}
