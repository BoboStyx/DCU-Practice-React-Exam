import { useState, useEffect } from "react";

function Products(){
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try{
        const response = await fetch("http://127.0.0.1:8000/api/product/");
        if (!response.ok) throw new Error("Failed to fetch products.");
        const data = await response.json();
        setProducts(data);
      } 
      catch (err){
        setError(err.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="App">

    <div className="container custom-box">
      <h1>All Products</h1>
      {error && <p className="text-danger">{error}</p>}

      <div className="row">
        {products.map((product) => (
          <div className="col-lg-4 mb-4" key={product.url}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{product.name }</h5>
                <h5 className="card-title">{product.price}</h5>
                <br></br>
                <a href={`/products/${product.category.split('/').filter(Boolean).pop()}`} className="btn btn-primary">
                  View products by category
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

export default Products;