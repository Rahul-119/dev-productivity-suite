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
		<nav className="w-64 h-screen bg-gray-100 p-4">
			<h2 className="pt-7 p-4 text-lg font-semibold text-gray-800">
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
										? "bg-blue-600 text-white"
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
