import Link from "next/link"


const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-top">

                </div>
                <div className="footer-mdl">
                    <Link href="/privacy-policy">Privacy Policy</Link>
                    <Link href="/terms-of-service">Terms of Service</Link>
                    <Link href="/responsible-gaming">Responsible Gaming</Link>
                </div>
                <div className="footer-btm">
                    <p>&copy; Copyright 2024 - Slot brain All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
