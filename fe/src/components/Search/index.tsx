import SearchIcon from "@/assets/icons/search.svg"

import styles from "./styles.module.sass"

export default function Search({ placeholder, type = "sm" }: any) {
    return (
        <div className={styles.search_wrap}>
            <form action="/" method="GET" noValidate className={`${styles.search} ${styles[type]}`}>
                <input type="search" className={styles.search_input} placeholder={placeholder} />
                <button type="submit" className={styles.search_btn}>
                    <SearchIcon width="24" height="24" />
                </button>
            </form>
        </div>

    );
}