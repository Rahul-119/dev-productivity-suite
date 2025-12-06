import Header from "./Header"
import Sidebar from "./Sidebar"
export default function Layout({children}){
    return (
        <div className="flex flex-col">
            <Header></Header>
            <div className="flex flex-1 min-h-screen">
                <Sidebar></Sidebar>
                <main className="bg-gray-50 flex-1 p-8 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}