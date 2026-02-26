import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Package, Plus, LogOut, ShoppingBag } from "lucide-react";

export default function Layout() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem("adminAuth");
    if (!isAuth) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex">
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <h2 className="font-display text-xl">Admin Panel</h2>
        </div>
        
        <nav className="p-4">
          <Link
            to="/admin/products"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-[#F5F5F5] rounded-lg transition-colors mb-1"
          >
            <Package size={18} />
            <span>Products</span>
          </Link>

          <Link
            to="/admin/products/add"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-[#F5F5F5] rounded-lg transition-colors mb-1"
          >
            <Plus size={18} />
            <span>Add Product</span>
          </Link>

          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-[#F5F5F5] rounded-lg transition-colors mb-1"
          >
            <ShoppingBag size={18} />
            <span>View Site</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-4"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
}
