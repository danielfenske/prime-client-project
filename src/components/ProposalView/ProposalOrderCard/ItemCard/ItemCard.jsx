import { useState } from 'react';
import { useSelector } from 'react-redux';

function ItemCard(props) {
  const items = useSelector((store) => store.itemReducer);

  return (
    <>
      <div className='item-card'>
        <select>
          {items.map((item, index) => {
            return <option key={index}>{item.item_code}</option>;
          })}
        </select>
        {JSON.stringify(props)}
      </div>
    </>
  );
}

export default ItemCard;
