export default function Sidebar(){
    return (
        <nav>
            <div className="w-64 h-screen bg-gray-100"> 
                <h2 className="pt-7 p-4 text-lg font-semibold text-gray-800">Tools at your Disposal</h2>
                <ul>
                    <li className="p-4 hover:bg-gray-200 text-gray-700">Api Tester</li>
                    <li className="p-4 hover:bg-gray-200 text-gray-700">Code Formatter</li>
                    <li className="p-4 hover:bg-gray-200 text-gray-700">Json Tools</li>
                    <li className="p-4 hover:bg-gray-200 text-gray-700">Regex Tester</li>
                </ul>
            </div>
        </nav>
    )
}