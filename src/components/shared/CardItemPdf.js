import React from 'react';
import { Link } from 'react-router-dom';

function CardItemPdf(props) {
  return (
    <>
      <li className='cards__item'>
        <Link className='cards__item__link' to={props.path} target="_blank" download='Bid_Catalogue.pdf'>
          <figure className='cards__item__pic-wrap'>
            <img
              className='cards__item__img'
              alt='Travel Image'
              src={props.src}
            />
          </figure>
          <div className='cards__item__info'>
            <h5 className='cards__item__text'>{props.text}</h5>
            <h5 className='hidden_text'>lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum</h5>
          </div>
        </Link>
      </li>
    </>
  );
}

export default CardItemPdf;
