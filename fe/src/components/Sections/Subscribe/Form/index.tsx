import styles from "./styles.module.sass"

export default function Form() {
    return (
        <form className={styles.form}>
            <div className="">
                <label htmlFor="email" className="sr-only">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Subscribe to our newsletter"
                />
            </div>
            <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
            >
                Send
            </button>
        </form>
    )
}