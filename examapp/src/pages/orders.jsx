import { useState, useEffect } from "react";

function Orders(){
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try{
        const response = await fetch("http://127.0.0.1:8000/api/order/");
        if (!response.ok) throw new Error("Failed to fetch orders.");
        const data = await response.json();
        setOrders(data);
      } 
      catch (err){
        setError(err.message);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="App">

    <div className="container custom-box">
      <h1>All orders</h1>
      {error && <p className="text-danger">{error}</p>}

      <div className="row">
        {orders.map((order) => (
          <div className="col-lg-4 mb-4" key={order.url}>
            <div className="card">
              <div className="card-body">
                <h5><strong>Order Status: {order.status}</strong></h5>
                <h5>Address: {order.shipping_addr}</h5>
                <br></br>
                <a href={`/orders/${order.status}`} className="btn btn-primary">
                  View Orders by Status
                </a>
                <br></br>
                <br></br>
                <a href={`/order/${order.url.split('/').filter(Boolean).pop()}`} className="btn btn-primary" >Order #{order.url.split('/').filter(Boolean).pop()}</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
}

export default Orders;