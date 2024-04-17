import instagramIcon from './images/instagram.png'
import telegramIcon from './images/telegram.png'
import vkIcon from './images/vk.png'

import './footer.css'

export function Footer() {
    return (<footer className="footer">
        <div className="contact-text">Связаться с нами:</div>
        <div className="links">
            <a href="https://www.instagram.com/_funtalex_">
                <img src={instagramIcon} />
            </a>
            <a href="https://t.me/funtalex">
                <img src={telegramIcon} />
            </a>
            <a href="https://vk.com/id85800727">
                <img src={vkIcon}></img>
            </a>
        </div>
    </footer>
    );
}
