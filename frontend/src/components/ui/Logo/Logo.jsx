import { PanelsTopLeft } from "lucide-react";
import "./Logo.css";

//componenta logo -> cnad react o foloseste din arbobrele de componente randat
//aceasta produce un jsx - syntax extension for javascript
// <Logo/> - jsx - browserul in transforma in html/ <div ->html uri>

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