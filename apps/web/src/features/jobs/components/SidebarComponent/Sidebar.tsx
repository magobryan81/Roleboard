import Header from "./SidebarHeader/Header";
import Footer from "./SidebarFooter/Footer";
import Navbar from "./SidebarContent/Navbar";

export const Sidebar = () => {

    return (
        <aside className="flex flex-col justify-between fixed p-4 w-70 h-full bg-surface">
            <div className="flex flex-col gap-8 h-full">
                <Header/>
                <Navbar/>
            </div>
            <div>
                <Footer/>
            </div>
        </aside>
    )
}
