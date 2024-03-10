import Link from "next/link"
import Image from "next/image"
import styles from "./styles.module.sass"

export default function Card({ data, card, slug }: any) {
    return (
        <Link className={styles.card} href={data ? slug : card.url}>
            <div className={styles.card_wrap}>
                <Image src={data?.img?.data?.attributes?.url || card.img} alt={data?.title || card.title} width={400} height={200} />
            </div>
            <div className={styles.card_content}>
                <div className={styles.card_title}>
                    {data?.title || card.title}
                </div>
                <button className={styles.card_btn}>
                    Play for free
                </button>
            </div>
        </Link>
    )
}