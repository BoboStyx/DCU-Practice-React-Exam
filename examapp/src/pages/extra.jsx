import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CategoryDropdown() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/category/')
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  const handleChange = (e) => {
    const shortcode = e.target.value;
    if (shortcode) {
      navigate(`/products/${shortcode}`);
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor="categoryDropdown" className="form-label">Choose a Category:</label>
      <select id="categoryDropdown" className="form-select" onChange={handleChange}>
        <option value="">-- Select --</option>
        {categories.map(category => {
          const shortcode = category.url.match(/\/category\/([^/]+)\/$/)[1];
          return (
            <option key={shortcode} value={shortcode}>
              {category.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}