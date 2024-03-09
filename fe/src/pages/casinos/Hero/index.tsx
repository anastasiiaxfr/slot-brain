import styles from "./styles.module.sass"
import Image from "next/image"
import Link from "next/link"

import IconStar from "@/assets/icons/star.svg"

export default function Hero({ data }: any) {
    console.log(data)
    return (
        <section className={styles.hero}>
            <div className="container">
                <div className={styles.hero_img}>
                    <Image src={data.thumbnail.data.attributes.url} alt={data.title} height={150} width={300} />
                </div>
                <div className={styles.hero_content}>
                    <div className={styles.hero_header}>
                        <span className={styles.hero_cat}>
                            <IconStar width="18" height="18" /> {data.rating.toFixed(1)}
                        </span>
                        <div className={styles.hero_title}>{data.title}</div>
                    </div>
                    {data.bonuse_type ? <div className={styles.hero_banner}>
                        {data.bonuse_type?.data.attributes.name}
                    </div> : null}
                </div>
            </div>
        </section>
    )
}