function ItemCard(props) {
  return (
    <>
      <div className='item-card'>
        <h1>ItemCard</h1>
        {JSON.stringify(props)}
      </div>
    </>
  );
}

export default ItemCard;

const itemPlaceholder = [
  {
    id: 1,
    item_code: 'W2765',
    name: 'Steel Rod',
    description: '10ft round steel rod',
    price_per_price_unit: 3.33,
    unit_type_id: 2,
  },
  {
    id: 2,
    item_code: 'W2785',
    name: 'Cookie Wand',
    description: 'Chocolate Chip... not Oatmeal Raisin',
    price_per_price_unit: 20.5,
    unit_type_id: 3,
  },
  {
    id: 3,
    item_code: 'E3290',
    name: 'Block of wood',
    description: "It's a block of wood",
    price_per_price_unit: 4,
    unit_type_id: 1,
  },
];
