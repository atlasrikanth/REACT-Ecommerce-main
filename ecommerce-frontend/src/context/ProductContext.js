  import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all products when the provider mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('https://react-ecommerce-main.onrender.com/api/products');
      console.log('Raw product data from backend:', res.data);
      const fetchedProducts = res.data.map((item) => {
        // Ensure image is a string and prepend base URL if it exists
        const image =
          item.image && typeof item.image === 'string'
            ? `https://react-ecommerce-main.onrender.com${item.image}`
            : 'https://placehold.co/150?text=No+Image';

        // Ensure images array contains valid URLs
        const images =
          item.images && Array.isArray(item.images)
            ? item.images.map((img) =>
                typeof img === 'string' ? `https://react-ecommerce-main.onrender.com${img}` : 'https://placehold.co/150?text=No+Image'
              )
            : [];

        // Ensure sizes is an array
        const sizes = Array.isArray(item.sizes) ? item.sizes : [];

        return {
          _id: item._id || '',
          name: item.name || '',
          price: Number(item.price) || 0,
          stock: Number(item.stock) || 0,
          image,
          images,
          category: item.category || 'Uncategorized',
          featured: item.featured || false,
          description: item.description || '',
          brand: item.brand || '',
          weight: Number(item.weight) || 0,
          model: item.model || '',
          offer: item.offer || '',
          sizes,
          isActive: item.isActive !== undefined ? item.isActive : true,
        };
      });
      console.log('Processed products:', fetchedProducts);
      setProducts(fetchedProducts);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.response?.data?.message || 'Failed to fetch products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch a single product by ID (useful for ProductDetails.js)
  const fetchProductById = async (productId) => {
    try {
      const res = await axios.get(`https://react-ecommerce-main.onrender.com/api/products/${productId}`);
      console.log('Raw product data for ID', productId, ':', res.data);
      const item = res.data;

      const image =
        item.image && typeof item.image === 'string'
          ? `https://react-ecommerce-main.onrender.com${item.image}`
          : 'https://placehold.co/150?text=No+Image';

      const images =
        item.images && Array.isArray(item.images)
          ? item.images.map((img) =>
              typeof img === 'string' ? `https://react-ecommerce-main.onrender.com${img}` : 'https://placehold.co/150?text=No+Image'
            )
          : [];

      const sizes = Array.isArray(item.sizes) ? item.sizes : [];

      const product = {
        _id: item._id || '',
        name: item.name || '',
        price: Number(item.price) || 0,
        stock: Number(item.stock) || 0,
        image,
        images,
        category: item.category || 'Uncategorized',
        featured: item.featured || false,
        description: item.description || '',
        brand: item.brand || '',
        weight: Number(item.weight) || 0,
        model: item.model || '',
        offer: item.offer || '',
        sizes,
        isActive: item.isActive !== undefined ? item.isActive : true,
      };

      console.log('Processed product:', product);
      return product;
    } catch (err) {
      console.error('Error fetching product by ID:', err);
      throw new Error(err.response?.data?.message || 'Failed to fetch product');
    }
  };

  const value = {
    products,
    loading,
    error,
    fetchProducts,
    fetchProductById, // Expose this function for ProductDetails.js
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export const useProducts = () => useContext(ProductContext); 

















































































/* import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('http://localhost:5001/api/products');
      console.log('Raw product data from backend:', res.data); // Debug raw data
      const fetchedProducts = res.data.map((item) => {
        // Ensure image is a string and prepend base URL if it exists
        const image = item.image && typeof item.image === 'string'
          ? `http://localhost:5001${item.image}`
          : 'https://placehold.co/150?text=No+Image';

        // Ensure images array contains valid URLs
        const images = item.images && Array.isArray(item.images)
          ? item.images.map(img => typeof img === 'string' ? `http://localhost:5001${img}` : 'https://placehold.co/150?text=No+Image')
          : [];

        return {
          _id: item._id,
          name: item.name,
          price: Number(item.price) || 0,
          stock: item.stock || 0,
          image,
          images,
          category: item.category || 'Uncategorized',
          featured: item.featured || false,
          description: item.description || '',
          brand: item.brand || '',
          weight: item.weight || 0,
          model: item.model || '',
        };
      });
      console.log('Processed products:', fetchedProducts); // Debug processed data
      setProducts(fetchedProducts);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.response?.data?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductContext.Provider value={{ products, loading, error, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext); */



















































/* // ecommerce-frontend/src/context/ProductContext.js
import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('http://localhost:5001/api/products');
      console.log('Raw product data from backend:', res.data); // Debug raw data
      const fetchedProducts = res.data.map((item) => ({
        _id: item._id,
        name: item.name,
        price: Number(item.price) || 0,
        stock: item.stock || 0,
        image: item.image ? `http://localhost:5001${item.image}` : '', // Prepend base URL
        images: item.images ? item.images.map(img => `http://localhost:5001${img}`) : [],
        category: item.category || 'Uncategorized',
        featured: item.featured || false,
        description: item.description || '',
        brand: item.brand || '',
        weight: item.weight || 0,
        model: item.model || '',
      }));
      console.log('Processed products:', fetchedProducts); // Debug processed data
      setProducts(fetchedProducts);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.response?.data?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductContext.Provider value={{ products, loading, error, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext);
 */











































































