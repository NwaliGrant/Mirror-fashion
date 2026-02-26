import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "women",
    image: "",
    description: "",
    isNew: false
  });
  const [initialLoad, setInitialLoad] = useState(true);

  // Load product data
  useEffect(() => {
    const loadProduct = () => {
      const products = JSON.parse(localStorage.getItem("shopProducts") || "[]");
      const product = products.find(p => p.id === Number(id));
      
      if (product) {
        setForm(product);
      } else {
        alert("Product not found!");
        navigate("/admin/products");
      }
      setInitialLoad(false);
    };
    
    loadProduct();
  }, [id, navigate]); // Remove setForm from dependencies

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({...form, image: reader.result});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Get existing products
    const products = JSON.parse(localStorage.getItem("shopProducts") || "[]");
    
    // Update the product
    const updatedProducts = products.map(p => 
      p.id === Number(id) ? { ...form, price: Number(form.price) } : p
    );
    
    // Save to localStorage
    localStorage.setItem("shopProducts", JSON.stringify(updatedProducts));
    
    // Trigger storage event for other tabs
    window.dispatchEvent(new Event("storage"));
    
    setLoading(false);
    alert("Product updated successfully!");
    navigate("/admin/products");
  };

  if (initialLoad) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#C8A96A] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => navigate("/admin/products")}
        className="flex items-center gap-2 text-gray-600 hover:text-[#C8A96A] mb-6 transition-colors"
      >
        <ArrowLeft size={18} />
        Back to Products
      </button>

      <h1 className="font-display text-3xl mb-8">Edit Product</h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow max-w-2xl">
        <div className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className="font-body text-sm block mb-2">Product Image</label>
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                <img 
                  src={form.image || "https://via.placeholder.com/100x100?text=No+Image"} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg inline-flex items-center gap-2">
                  <Upload size={16} />
                  <span>Upload New Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="font-body text-sm block mb-2">Image URL</label>
            <input
              type="text"
              value={form.image}
              onChange={(e) => setForm({...form, image: e.target.value})}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#C8A96A] focus:outline-none"
            />
          </div>

          <div>
            <label className="font-body text-sm block mb-2">Product Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#C8A96A] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="font-body text-sm block mb-2">Price (₦)</label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({...form, price: e.target.value})}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#C8A96A] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="font-body text-sm block mb-2">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({...form, category: e.target.value})}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#C8A96A] focus:outline-none"
            >
              <option value="women">Women</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>

          <div>
            <label className="font-body text-sm block mb-2">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({...form, description: e.target.value})}
              rows="4"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#C8A96A] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isNew}
              onChange={(e) => setForm({...form, isNew: e.target.checked})}
              className="w-4 h-4 text-[#C8A96A]"
            />
            <label className="font-body text-sm">Mark as New Arrival</label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C8A96A] text-white py-3 rounded-lg font-body hover:bg-[#111111] transition-colors disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
