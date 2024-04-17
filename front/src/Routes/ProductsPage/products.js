import { ApiService } from '../../Services/ApiService';
import { useState, useEffect } from 'react';
import './products.css'

export function ProductInfo(props) {
    const { title, description, price, imageUrl } = props;
    return (
        <div className="product-info">
            <img src={imageUrl} alt={title}></img>
            <h1>{title}</h1>
            <h2>{price}</h2>
            <br />
            <p>{description}</p>
        </div>
    );
}

export function Comment(props) {
    const { comment } = props;
    const text = comment.text;
    const username = comment.user.username;

    return (
        <div className='comment'>
            <p className='text'>
                {text}
            </p>
            <b className='username'>
                {username}
            </b>
        </div>
    );
}

export function Comments(props) {
    const [commentText, setCommentText] = useState("");
    const { comment_set, id } = props;

    const handleComment = async (event) => {

        const formData = new FormData();

        const user = await ApiService("users/current/");
        formData.append('user', user);

        formData.append('text', commentText);

        formData.append('product', event.target.getAttribute('id'));

        await ApiService("comments/", {
            method: "post",
            body: formData,
        });
    }

    const handleReservation = async (event) => {

    }

    return (
        <div className='comments'>
            <div className='other-comments'>
                {comment_set.map((item) => (
                    <Comment
                        comment={item}
                    />
                ))}

            </div>
            <div className='your-comments'>
                <input
                    placeholder="Введите комментарий"
                    onChange={(event) => { setCommentText(event.target.value) }}
                />
                <button id={id} onClick={handleComment}>Отправить комментарий</button>
            </div>
            <button className='reservation' id={id} onClick={handleReservation}>Забронировать товар</button>
        </div>
    );
}

export function Product(props) {
    const { title, description, price, imageUrl, comment_set, id } = props;

    return (
        <div className="product" id={id}>
            <ProductInfo
                title={title}
                description={description}
                price={price}
                imageUrl={imageUrl}
            />
            <Comments
                comment_set={comment_set}
                id={id}
            />
        </div>
    )
}

export function Products(props) {
    const { categoryLink } = props;

    const [productItems, setProductItems] = useState([]);

    useEffect(() => {
        (async () => {
            const newProductItems = await ApiService('products/');
            setProductItems(newProductItems);
        })();
    }, [])


    return (
        <div className="products">
            {productItems.filter((item) => (
                item.category.link === categoryLink
            )).map((item) => (
                <Product
                    title={item.title}
                    description={item.description}
                    price={item.price}
                    imageUrl={item.imageUrl}
                    comment_set={item.comment_set}
                    id={item.id}
                />
            ))}

        </div>
    );
}