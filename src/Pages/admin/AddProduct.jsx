import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";

export default function AddProduct() {
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
    const existing = JSON.parse(localStorage.getItem("shopProducts") || "[]");
    
    // Create new product
    const newProduct = {
      ...form,
      id: Date.now(),
      price: Number(form.price)
    };
    
    // Add to list
    existing.push(newProduct);
    
    // Save to localStorage
    localStorage.setItem("shopProducts", JSON.stringify(existing));
    
    // Trigger storage event for other tabs
    window.dispatchEvent(new Event("storage"));
    
    setLoading(false);
    alert("Product added successfully!");
    navigate("/admin/products");
  };

  return (
    <div>
      <button
        onClick={() => navigate("/admin/products")}
        className="flex items-center gap-2 text-gray-600 hover:text-[#C8A96A] mb-6 transition-colors"
      >
        <ArrowLeft size={18} />
        Back to Products
      </button>

      <h1 className="font-display text-3xl mb-8">Add New Product</h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow max-w-2xl">
        <div className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className="font-body text-sm block mb-2">Product Image</label>
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                <img 
                  src={form.image || "https://via.placeholder.com/100x100?text=Preview"} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg inline-flex items-center gap-2">
                  <Upload size={16} />
                  <span>Upload Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-xs text-gray-500 mt-2">Or enter URL below</p>
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
              placeholder="/images/product.jpg"
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
            className="w-full bg-[#C8A96A] text-white py-3 rounded-lg font-body hover:bg-[#111111] disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
