import './Footer.css'
import {Link} from 'react-router-dom';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-section">
                <div className="footer-logo">Paying Guest</div>
                <div className="footer-links">
                    <Link to="policy">Privacy Policy</Link>
                    <Link to="terms">Terms of Service</Link>
                    <Link to="contact">Contact Us</Link>
                </div>
            </div>
            <div className="copy-right">
                <p>&copy; 2023 Paying Guest. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer;