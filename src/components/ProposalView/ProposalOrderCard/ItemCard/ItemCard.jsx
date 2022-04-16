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
        <input 
         type = "text"
         placeholder = "item name"
         value = {item.item_name}
         />



        {/* {JSON.stringify(props)} */}
      </div>
    </>
  );
}

export default ItemCard;
