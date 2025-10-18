import Header from "./Header"
import Sidebar from "./Sidebar"
export default function Layout({children}){
    return (
        <div className="flex flex-col min-h-screen">
            <Header></Header>
            <div className="flex flex-1">
                <Sidebar></Sidebar>
                <main className="bg-gray-50 flex-1 p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}