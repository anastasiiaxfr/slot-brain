import Link from "next/link"
import Image from "next/image"
import styles from "./styles.module.sass"

import AuthorImg from "@/assets/img/authors/author-1.png"
import UpprovedIcon from "@/assets/icons/upproved.svg"

export default function Author({ data }: any) {
    console.log(data)
    return (
        <section className={styles.author}>
            <div className="container">
                <div className={styles.author_header}>

                    <div className={styles.author_img}>
                        <Image src={AuthorImg} alt={''} width={200} height={200} />
                    </div>
                    <div>
                        <div className={styles.author_name}>
                            <span>{data.data.attributes.name}</span>
                            <UpprovedIcon width={24} height={24} />
                        </div>
                        <div className={styles.author_job}>
                            {data.data.attributes.job}
                        </div>
                    </div>
                    <div className={styles.author_cta}>
                        <button className={`btn btn-bd ${styles.author_btn}`}>See All Articles</button>
                    </div>

                </div>
                <div className={styles.author_content}>
                    <div className={styles.author_description}>
                        Carlos has a BA in Hispanic Studies from the Pontificia Universidad Católica of PR. He’s finishing his MA in Linguistics, focusing on sociolinguistics.
                    </div>

                    <div className=""> <b>Last Articles</b> </div>

                    <ul>
                        <li>
                            <Link href="/">7 Best Cash Back Credit Cards of September 2022</Link>
                        </li>
                        <li>
                            <Link href="/">6 Best Credit Cards of September 2022</Link>
                        </li>
                    </ul>

                </div>
                <div className={styles.author_footer}>

                </div>
            </div>
        </section >
    )
}

