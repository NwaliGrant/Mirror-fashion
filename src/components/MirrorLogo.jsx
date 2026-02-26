import { Link } from "react-router-dom";

export default function MirrorLogo({ className }) {
  return (
    <Link to="/" className={className}>
      <span className="font-bold">MI</span>
      <span className="inline-block transform scale-x-[-1] font-bold">R</span>
      <span className="font-bold">ROR</span>
    </Link>
  );
}
