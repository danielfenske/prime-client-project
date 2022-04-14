import { useState } from 'react';

function ItemCard(props) {
  return (
    <>
      <div className='item-card'>
        <select></select>
        {JSON.stringify(props)}
      </div>
    </>
  );
}

export default ItemCard;
