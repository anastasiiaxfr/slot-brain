import styles from "./styles.module.sass"
import Link from "next/link"
import Image from "next/image"

import StarIcon from "@/assets/icons/star.svg"

export default function Card({ data }: any) {
    console.log(data)
    return (
        <section className={styles.card}>
            <Link className={styles.card_img} href={data.slug}>
                <Image alt={data.title} width={100} height={100} src={data.thumbnail.data.attributes.url} />
            </Link>
            <div className={styles.card_content}>
                <div className={styles.card_title}>
                    <Link href={data.slug}><b>{data.title}</b></Link>
                    <span className={styles.card_rating}>
                        <StarIcon width="18" height="18" /> {data.rating.toFixed(1)}
                    </span>
                </div>

                <div className={styles.card_cta}>
                    <Link href={data.slug} className={`btn ${styles.card_btn}`}>View</Link>
                    <Link href={data.url} className={`btn btn-text ${styles.card_btn_text}`}>Visit Casino</Link>
                </div>
            </div>
        </section>
    )
}