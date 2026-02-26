import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import Swal from "sweetalert2"; // Add this import
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

export default function Cart() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const products = [
        {
          id: 1,
          name: "Silk Evening Gown",
          price: 890,
          qty: 1,
          size: "M",
          img: "/images/product1.jpg",
          category: "women"
        },
        {
          id: 2,
          name: "Leather Crossbody Bag",
          price: 450,
          qty: 2,
          size: "One Size",
          img: "/images/product2.jpg",
          category: "accessories"
        },
        {
          id: 3,
          name: "Gold Statement Earrings",
          price: 320,
          qty: 1,
          size: "One Size",
          img: "/images/product3.jpg",
          category: "accessories"
        }
      ];
      setItems(products);
      setLoading(false);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const shipping = subtotal > 200000 ? 0 : 5000;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  
  // Tax calculation (7.5% VAT for Nigeria)
  const taxRate = 0.075;
  const tax = (subtotal - discount) * taxRate;
  
  const total = subtotal + shipping - discount + tax;

  const increaseQty = (id) => {
    const updated = items.map(item => 
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    );
    setItems(updated);
  };

  const decreaseQty = (id) => {
    const updated = items.map(item => 
      item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
    );
    setItems(updated);
  };

  const removeItem = (id) => {
    const updated = items.filter(item => item.id !== id);
    setItems(updated);
  };

  const applyPromo = () => {
    if (promoCode.toLowerCase() === "mirror10") {
      setPromoApplied(true);
    }
  };

  const handleCheckout = () => {
    Swal.fire({
      title: 'Congratulations! 🎉',
      text: 'Your order has been placed successfully!',
      icon: 'success',
      confirmButtonText: 'Continue Shopping',
      confirmButtonColor: '#C8A96A',
      background: '#F5F5F5',
      timer: 5000,
      timerProgressBar: true,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/shop");
      }
    });
  };

  const formatPrice = (price) => {
    return `₦${price.toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="bg-[#F5F5F5] min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#C8A96A] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="font-body text-gray-600">Loading your cart...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 text-center">
        <p className="font-body text-xs tracking-[0.3em] uppercase text-[#C8A96A] mb-4">
          Your Selection
        </p>
        <h1 className="font-display text-5xl md:text-7xl text-[#111111] mb-6">
          Shopping <span className="text-[#C8A96A]">Cart</span>
        </h1>
        <div className="w-24 h-1 bg-[#C8A96A] mx-auto"></div>
      </section>

      {/* Cart Content */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          {items.length === 0 ? (
            // Empty Cart
            <div className="text-center py-16 bg-white rounded-2xl">
              <ShoppingBag size={64} className="mx-auto text-gray-300 mb-6" />
              <h2 className="font-display text-2xl text-[#111111] mb-4">Your cart is empty</h2>
              <p className="font-body text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
              <Link
                to="/shop"
                className="inline-block bg-[#111111] text-white px-8 py-4 font-body text-sm tracking-[0.2em] uppercase hover:bg-[#C8A96A] transition-all duration-300"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            // Cart with items
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="bg-white p-6 rounded-xl flex gap-6">
                    {/* Product Image */}
                    <Link to={`/product/${item.id}`} className="w-24 h-24 bg-[#F5F5F5] rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={item.img} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex justify-between mb-2">
                        <div>
                          <Link to={`/product/${item.id}`} className="font-display text-lg hover:text-[#C8A96A] transition-colors">
                            {item.name}
                          </Link>
                          <p className="font-body text-xs text-gray-500 mt-1">
                            {item.category} | Size: {item.size}
                          </p>
                        </div>
                        <p className="font-display text-lg text-[#C8A96A]">
                          {formatPrice(item.price * item.qty)}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-gray-200">
                          <button
                            onClick={() => decreaseQty(item.id)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-12 text-center font-body">{item.qty}</span>
                          <button
                            onClick={() => increaseQty(item.id)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Continue Shopping Link */}
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 font-body text-sm text-gray-500 hover:text-[#C8A96A] transition-colors mt-4"
                >
                  <ArrowLeft size={16} />
                  Continue Shopping
                </Link>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white p-8 rounded-xl sticky top-32">
                  <h2 className="font-display text-2xl mb-6">Order Summary</h2>
                  
                  {/* Promo Code */}
                  <div className="mb-6">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Promo code"
                        className="flex-1 px-4 py-3 border border-gray-200 font-body text-sm focus:outline-none focus:border-[#C8A96A] transition-colors"
                      />
                      <button
                        onClick={applyPromo}
                        className="px-4 py-3 bg-[#111111] text-white font-body text-sm hover:bg-[#C8A96A] transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {promoApplied && (
                      <p className="font-body text-xs text-green-600 mt-2">
                        Promo code applied! 10% discount
                      </p>
                    )}
                  </div>

                  {/* Calculations */}
                  <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                    <div className="flex justify-between font-body">
                      <span className="text-gray-600">Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between font-body">
                      <span className="text-gray-600">Shipping</span>
                      <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                    </div>
                    {promoApplied && (
                      <div className="flex justify-between font-body text-green-600">
                        <span>Discount (10%)</span>
                        <span>-{formatPrice(discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-body">
                      <span className="text-gray-600">Tax (7.5% VAT)</span>
                      <span>{formatPrice(tax)}</span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between font-display text-xl mb-8">
                    <span>Total</span>
                    <span className="text-[#C8A96A]">{formatPrice(total)}</span>
                  </div>

                  {/* Proceed to Checkout Button */}
                  <button 
                    onClick={handleCheckout}
                    className="w-full bg-[#C8A96A] text-white py-4 font-body text-sm tracking-[0.2em] uppercase hover:bg-[#111111] transition-all duration-300 mb-3"
                  >
                    Proceed to Checkout
                  </button>

                  <p className="font-body text-xs text-gray-400 text-center">
                    {tax > 0 ? `Includes ₦${tax.toLocaleString()} VAT` : "Tax calculated at checkout"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
