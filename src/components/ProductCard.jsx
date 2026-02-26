import { Link } from "react-router-dom";
import { Star } from "lucide-react";

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="relative aspect-3/4 overflow-hidden bg-[#F5F5F5] mb-3 rounded-lg">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-[#C8A96A] text-white text-[10px] font-body tracking-wider px-2 py-1">
            NEW
          </span>
        )}
      </div>
      <div className="text-center">
        <h3 className="font-body text-sm font-medium text-[#111111] mb-1">
          {product.name}
        </h3>
        <p className="font-body text-[#C8A96A] font-semibold text-sm mb-2">
          ₦{product.price.toLocaleString()}
        </p>
        <div className="flex justify-center items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} className="fill-[#C8A96A] text-[#C8A96A]" />
          ))}
        </div>
      </div>
    </Link>
  );
}
