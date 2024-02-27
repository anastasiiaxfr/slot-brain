
import Image from "next/image"
import FaqBanner from "@/assets/img/faq.jpg"
import ArrIcon from "@/assets/icons/arr-r.svg"

import styles from "./styles.module.sass"


import { Disclosure } from '@headlessui/react'
import faqs from "./constant"


export default function Faq() {
    return (
        <section className={`section`}>
            <div className="container">
                <h2>
                    Questions and answers
                </h2>

                <div className={styles.faq_row}>
                    <div className="col">


                        <dl className={styles.faq}>
                            {faqs.map((faq, ind) => (
                                <Disclosure as="div" key={ind} className="">
                                    {({ open }) => (
                                        <>
                                            <dt>
                                                <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                                                    <span className="text-base font-semibold leading-7">{faq.question}</span>
                                                    <span className="">
                                                        {open ? (
                                                            <ArrIcon aria-hidden="true" />
                                                        ) : (
                                                            <ArrIcon aria-hidden="true" />
                                                        )}
                                                    </span>
                                                </Disclosure.Button>
                                            </dt>
                                            <Disclosure.Panel as="dd" className="">
                                                <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                            ))}
                        </dl>


                    </div>
                    <div className="col">
                        <Image src={FaqBanner} alt="Faq" width="636" height="563" quality={80} className={styles.faq_banner} />
                    </div>
                </div>

                <div className={styles.faq_cta}>
                    <a href="#" className="btn" role="button">More details</a>
                </div>

            </div>
        </section>
    )
}