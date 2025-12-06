import { NavLink } from "react-router-dom";

export default function Sidebar() {
	
	const tools = [
		{ name: "Api Tester", path: "/api-tester" },
		{ name: "Code Formatter", path: "/code-formatter" },
		{ name: "Json Tools", path: "/json-tools" },
		{ name: "Regex Tester", path: "/regex-tester" },
		{ name: "Hash Generator", path: "/hash-generator" },
	];

	return (
		<nav className="w-64 min-h-screen bg-white/80 border-r-2 border-blue-100 shadow-lg backdrop-blur-md p-4 ">
			<h2 className="pt-7 p-4 text-lg font-semibold text-gray-800  ">
				Tools at your Disposal
			</h2>
			<ul>
				{tools.map((tool) => (
					<li key={tool.path}>
						<NavLink
							to={tool.path}
							className={({ isActive }) =>
								`p-4 rounded-lg block transition-colors ${
									isActive
										? "border-l-4 border-indigo-500 pl-6"
										: "hover:bg-gray-200 text-gray-700"
								}`
							}
						>
							{tool.name}
						</NavLink>
					</li>
				))}
			</ul>
		</nav>
	);
}
