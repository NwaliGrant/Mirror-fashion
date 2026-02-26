import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Edit, Trash2, Search, Plus } from "lucide-react";
import { getProducts } from "../../data/products";

export default function Products() {
  const navigate = useNavigate();
  const [productList, setProductList] = useState([]);
  const [search, setSearch] = useState("");

  // Load products
  useEffect(() => {
    const loadProducts = () => {
      const allProducts = getProducts();
      setProductList(allProducts);
    };
    
    loadProducts();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const updated = productList.filter(p => p.id !== id);
      setProductList(updated);
      localStorage.setItem("shopProducts", JSON.stringify(updated));
      
      // Trigger storage event for other tabs
      window.dispatchEvent(new Event("storage"));
      
      alert("Product deleted successfully!");
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/products/edit/${id}`);
  };

  const filtered = productList.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-3xl">Products</h1>
        <Link
          to="/admin/products/add"
          className="bg-[#C8A96A] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#111111] transition-colors"
        >
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-[#C8A96A] focus:outline-none"
        />
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-body text-gray-600">Image</th>
              <th className="px-6 py-4 text-left text-sm font-body text-gray-600">Name</th>
              <th className="px-6 py-4 text-left text-sm font-body text-gray-600">Price</th>
              <th className="px-6 py-4 text-left text-sm font-body text-gray-600">Category</th>
              <th className="px-6 py-4 text-left text-sm font-body text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-12 h-12 object-cover rounded"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/50x50?text=No+Image";
                    }}
                  />
                </td>
                <td className="px-6 py-4 font-body">{product.name}</td>
                <td className="px-6 py-4 font-body">₦{product.price.toLocaleString()}</td>
                <td className="px-6 py-4 font-body capitalize">{product.category}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(product.id)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
}
