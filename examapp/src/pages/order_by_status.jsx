import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function OrdersByStatus() {
  const { status } = useParams();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/order/?status=${status}`)
      .then(res => res.json())
      .then(data => setOrders(data));
  }, [status]);

  return (
    <div className="container mt-4">
    <div className="card">
      <div className="card-header">
        <h1 className="card-title h4 mb-0">
          Orders with status {status}
        </h1>
      </div>
      <ul className="list-group list-group-flush">
      {orders.map(order => (
          <li key={order.id}>
            <a href={`/order/${order.url.split('/').filter(Boolean).pop()}`}>Order #{order.url.split('/').filter(Boolean).pop()}</a> - Time Ordered: {order.date_ordered}
            </li>
        ))}
      </ul>
    </div>
    </div>
  );
}