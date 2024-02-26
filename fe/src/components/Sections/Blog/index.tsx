import Link from "next/link"
import Image from "next/image"

import styles from "./styles.module.sass"
import cards from "./contstant"

import IconPubDate from "@/assets/icons/calendar.svg"
import IconClock from "@/assets/icons/clock.svg"
import IconEye from "@/assets/icons/eye.svg"

export default function Blog() {
    return (
        <section className={`section ${styles.blog}`}>
            <div className="container">
                <h2>Blog</h2>
                <p>
                    The most interesting thing about the Slot brain is here
                </p>

                <div className={styles.cards}>

                    {cards.map((i: any, ind: number) => (
                        <Link className={styles.card} href="/" key={ind}>
                            <div className={styles.card_wrap}>
                                <Image src={i.img} alt={i.title} />
                            </div>
                            <div className={styles.card_content}>
                                <div className={styles.card_title}>
                                    {i.title}
                                </div>
                                <div className={styles.card_description}>
                                    {i.description}
                                </div>
                                <div className={styles.card_info}>
                                    <span>
                                        <IconPubDate width="16" height="16" />{i.pub_date}
                                    </span>

                                    <div>
                                        <span>
                                            <IconClock width="16" height="16" /> {i.time_read}
                                        </span>
                                        <span>
                                            <IconEye width="16" height="16" /> {i.views}
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </Link>
                    ))}

                </div>
            </div>
        </section>
    )
}
