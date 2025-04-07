import { useState, useEffect } from "react";

function Customers(){
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try{
        const response = await fetch("http://127.0.0.1:8000/api/customer/");
        if (!response.ok) throw new Error("Failed to fetch customers.");
        const data = await response.json();
        setCustomers(data);
      } 
      catch (err){
        setError(err.message);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className="App">

    <div className="container custom-box">
      <h1>All Customers</h1>
      {error && <p className="text-danger">{error}</p>}

      <div className="row">
        {customers.map((customer) => (
          <div className="col-lg-4 mb-4" key={customer.url}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{customer.name}</h5>
                <a href={`/customer/${customer.url.split('/').filter(Boolean).pop()}`} className="btn btn-primary">
                  View Customer Information
                </a>
                <br></br>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
}

export default Customers;