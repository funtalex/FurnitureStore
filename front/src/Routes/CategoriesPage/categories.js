import { ApiService } from '../../Services/ApiService'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import './categories.css'

export function Category(props) {
    const { imageUrl, text, link } = props;

    return (
        <div className='category-item'>
            <Link to={'/categories/' + link}>
                <button>
                    <img src={imageUrl} alt={text}></img>
                </button>
            </Link>
            <br />
            <b>{text}</b>
        </div>
    );
}

export function Categories() {
    const [categoryItems, setCategoryItems] = useState([]);

    useEffect(() => {
        (async () => {
            const newCategories = await ApiService('categories/');
            setCategoryItems(newCategories);
        })();
    }, [])

    return (
        <div className="categories">
            {categoryItems.map((item) => (
                <Category
                    imageUrl={item.imageUrl}
                    text={item.text}
                    link={item.link}
                />
            ))}

        </div>
    );
}