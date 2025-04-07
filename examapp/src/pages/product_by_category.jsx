import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ProductsByCategory() {
  const { shortcode } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/product/?category=${shortcode}`)
      .then(res => res.json())
      .then(data => setProducts(data));
  }, [shortcode]);

  return (
    <div className="App">

    <div className="container custom-box">
      <h1>All Products in {shortcode} </h1>

      <div className="row">
        {products.map((product) => (
          <div className="col-lg-4 mb-4" key={product.url}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{product.name }</h5>
                <h5 className="card-title">{product.price}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
      <a href={`/products`} className="btn btn-primary">
                  View all products
                </a>
    </div>
  </div>
  );
}