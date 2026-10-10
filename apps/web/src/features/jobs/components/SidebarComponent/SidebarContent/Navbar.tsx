import { navbar, type NavItem} from "../NavbarData";
import { NavLink, matchPath, useLocation } from "react-router-dom";
// import { useState, useEffect, useId } from "react";


function SidebarItem({item}: {item: NavItem}) {

    // stating for now and will be used for dropdown in notes soon
    // const { pathname } = useLocation();
    // const panelId = useId();
    // const [open, setOpen] = useState(true);

    const activeLink = ({ isActive }: { isActive: boolean }) => 
        `flex items-center gap-2 px-2 py-2 text-xs rounded-md
        ${isActive ? "bg-green-200" : "hover:bg-green-200"}`;
    return (
        <div>
            <li
                key={item.label}
                className="flex flex-col justify-between"
            >
                <span className="flex items-center gap-2 mb-2 text-[14px] text-muted">
                    {item.label}
                </span>
                <div className="flex flex-col gap-0.5 px-2">
                    {item.children?.map((link) => {
                        const Icon = link.icon;
                        return (
                            link.to && (
                                <NavLink 
                                    to={link.to}
                                    className={activeLink}
                                >     
                                    {Icon && <Icon size={18}/>}
                                    {link.label}
                                </NavLink>
                            )
                        )
                    })}
                </div>
            </li>
        </div>
    )
}

const Navbar = () => {
  return (
    <nav>
        <ul className="flex flex-col gap-4">
            {navbar.map((item) => 
                <SidebarItem key={item.label} item={item}/>
            )}
        </ul>
    </nav>
  )
}

export default Navbar