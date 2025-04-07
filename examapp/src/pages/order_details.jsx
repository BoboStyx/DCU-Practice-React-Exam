import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState({});

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/order/${id}/`)
      .then(res => res.json())
      .then(data => setOrder(data));

    fetch(`http://127.0.0.1:8000/api/orderitem/?order=${id}`)
      .then(res => res.json())
      .then(async data => {
        setItems(data);
        const productData = {};
        for (let item of data) {
          const res = await fetch(item.product);
          const prod = await res.json();
          productData[item.id] = prod;
        }
        setProducts(productData);
      });
  }, [id]);

  const total = items.reduce((sum, item) => {
    const prod = products[item.id];
    return sum + (prod ? prod.price * item.quantity : 0);
  }, 0);

  return (
    <div>
    {order && (
    <>
    <div className="App">
    <div className="container custom-box single-box mt-4">
      <h1>Order #{order.url.split('/').filter(Boolean).pop()}</h1>
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">
            {order.shipping_addr}
          </h5>
          <h5 className="card-title">
            {order.date_ordered}
          </h5>
          <h3>Items:</h3>
          <ul>
            {items.map(item => (
              <li key={item.id}>
                {products[item.id]?.name || 'Loading...'} - Qty: {item.quantity} - €{products[item.id]?.price}
              </li>
            ))}
          </ul>
          <h4>Total: €{total.toFixed(2)}</h4>
        </div>
      </div>
      </div>
      </div>
      </>
    )}
    </div>
  );
}
