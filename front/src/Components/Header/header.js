import { Link } from "react-router-dom";
import './header.css';

export function Header() {

    return (
        <header className="header">
            <Link to={"/"}>
                <button>Главная страница</button>
            </Link>
            <Link to="/categories">
                <button>Категории</button>
            </Link>
            <Link to="/login">
                <button>Вход/Регистрация</button>
            </Link>
        </header>
    );
}