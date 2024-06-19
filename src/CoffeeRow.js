import React from 'react';

const CoffeeRow = ({ item }) => {

  return (
    <tr>
      <td>{item.title}</td>
      <td>{item.brand}</td>
      <td>{item.beans}</td>
      <td>{item.userId}</td>
      <td>{item.id}</td>
    </tr>
  );
}

export default CoffeeRow;
