import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import JsonTools from "./components/Tools/JsonTools";
import CodeFormatter from "./components/Tools/CodeFormatter";
import ApiTester from "./components/Tools/ApiTester";
import RegexTester from "./components/Tools/RegexTester";
import HashGenerator from "./components/Tools/HashGenerator";
import Home from "./pages/Home";

function App() {
	return (
		<div>
			<Layout>
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/json-tools" element={<JsonTools />}></Route>
					<Route
						path="/regex-tester"
						element={<RegexTester />}
					></Route>
					<Route
						path="/code-formatter"
						element={<CodeFormatter />}
					></Route>
					<Route path="/api-tester" element={<ApiTester />}></Route>
					<Route
						path="/hash-generator"
						element={<HashGenerator />}
					></Route>
				</Routes>
			</Layout>
		</div>
	);
}

export default App;
