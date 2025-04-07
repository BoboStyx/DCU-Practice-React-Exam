import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function CustomerDetails() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/customer/${id}/`)
      .then(res => res.json())
      .then(data => setCustomer(data));

    fetch(`http://127.0.0.1:8000/api/order/`)
      .then(res => res.json())
      .then(data => setOrders(data.filter(o => o.customer === `http://127.0.0.1:8000/api/customer/${id}/`)));
  }, [id]);

  return (
    <div className="App">
    <div className="container custom-box single-box mt-4">
      <div className="card mb-3">
        <div className="card-body">
        {customer && (
        <div>
        <h1>{customer.name}</h1>
          <h5 className="card-title">
            Customer #{customer.url.split('/').filter(Boolean).pop()}
          </h5>
          <p className="card-text">
            <strong>Email:</strong> {customer.email}
          </p>
          <p className="card-text">
            <strong>Student ID:</strong> {customer.address}
          </p>
        </div>
        )}
        </div>
        <div className="card-body">
        <h3>Orders</h3>
          <ul>
        {orders.map(order => (
          <li key={order.url}><a href={`order/${order.url.split('/').filter(Boolean).pop()}`}>Order #{order.url.split('/').filter(Boolean).pop()}</a> - Order Status: {order.status}</li>
        ))}
      </ul>
        </div>
        </div>
      </div>
      </div>
  );
}