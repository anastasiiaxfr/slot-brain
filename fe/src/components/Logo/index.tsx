import Link from "next/link"
import LogoImg from "@/assets/img/logo.svg"

export default function Logo() {
    return (
        <Link href="/" className="logo">
            <LogoImg width="224" height="103"></LogoImg>
        </Link>
    )
}