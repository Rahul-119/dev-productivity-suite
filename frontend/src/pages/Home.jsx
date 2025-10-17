export default function Home(){
    return (
        <div className="h-screen bg-gray-200 w-full flex">
            {/* Sidebar */}
            <div className="bg-indigo-900 w-64 h-full">
                <div className="my-5 bold">Tools we have:</div>
                <ul>
                    <li className="p-4 ">API Tester</li>
                    <li className="p-4">JSON Tools</li>
                    <li className="p-4">Regex Tester</li>
                    <li className="p-4">Code Formatter</li>
                </ul>
            </div>

            <div className="flex-grow">
                <p>Main</p>
            </div>
        </div>
    )
}