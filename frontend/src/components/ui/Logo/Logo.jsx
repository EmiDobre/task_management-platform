import { PanelsTopLeft } from "lucide-react";
import "./Logo.css";

function Logo() {
    return (
        <div className="logo">
      <span className="logo__mark">
        <PanelsTopLeft size={21} strokeWidth={2.3} />
      </span>

            <span className="logo__name">TaskFlow</span>
        </div>
    );
}

export default Logo;