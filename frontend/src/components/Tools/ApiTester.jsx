import MainWorkspace from "../Layout/MainWorkspace";

import { useState } from "react";
import axios, { isAxiosError } from "axios";

export default function ApiTester() {
	const [input, setInput] = useState("");
	const [output, setOutput] = useState("");
	const [method, setMethod] = useState("GET");
	const [error, setError] = useState("");
	const [body, setBody] = useState("");
	const [header, setHeader] = useState("");
	const [headerRow, setHeaderRow] = useState([{ key: "", value: "" }]);
	const [panel, setPanel] = useState("header");
	const [rows, setRows] = useState(1);

	const test = () => {};

	const handleClear = () => {
		setHeaderRow([]);
	};
	const handleRequest = async (method, url) => {
		try {
			let parseString = "";

			let res = null;
			let isEmpty = false;
			if (body.trim().length <= 0) {
				isEmpty = true;
			} else {
				isEmpty = false;
				try {
					parseString = JSON.parse(body);
					console.log(parseString);
				} catch (error) {
					setError(error.message);
					setOutput("");
					return;
				}
			}

			const headerObject = {};

			headerRow.forEach(({ key, value }) => {
				if (key.trim() && value.trim()) {
					headerObject[key] = value;
				}
			});

			res = await axios({
				method: method,
				url: url,
				data: !isEmpty ? parseString : undefined,
				headers: headerObject,
			});

			const formattedCode = JSON.stringify(res.data, null, 2);
			setOutput(formattedCode);
			console.log(formattedCode);
			setError("");
		} catch (error) {
			console.log(error.message);
			setError(error.message);
			setOutput("");
		}
	};

	return (
		<MainWorkspace title="API Tester">
			<div>
				<div className="flex flex-col">
					<div className="flex">
						<select
							name="dropdown"
							id="method"
							className="p-2 m-3 rounded-md text-sm font-semibold gap-x-1.5 w-30 inline-flex justify-center font-mono outline-1"
							value={method}
							onChange={(e) => setMethod(e.target.value)}
						>
							<option value="GET">GET</option>
							<option va	lue="POST">POST</option>
							<option value="PUT">PUT</option>
							<option value="DELETE">DELETE</option>
							<option value="PATCH">PATCH</option>
						</select>
						<input
							type="text"
							id="pattern"
							name="pattern"
							placeholder="https://api.example.com/data"
							className="p-2 rounded-lg m-3 flex-1 border-2 border-blue-400 font-mono"
							value={input}
							onChange={(e) => setInput(e.target.value)}
						/>
						<button
							className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white 
  rounded-full px-8 py-3 m-3 shadow-lg font-bold hover:scale-105 transition-transform duration-200"
							onClick={() => handleRequest(method, input)}
						>
							Send
						</button>
					</div>

					<div>
						<button
							className="bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 text-white rounded-full px-8 py-3 shadow-lg font-bold hover:scale-105 hover:shadow-xl active:scale-95 transition-all duration-200"
							onClick={() => setPanel("header")}
						>
							Header
						</button>
						<button
							className="px-10 py-2 m-3 rounded-lg bg-blue-600  hover:text-white hover transition-transform hover:scale-105 active:scale-95"
							onClick={() => setPanel("body")}
						>
							Body
						</button>
					</div>

					{panel === "body" && (
						<div>
							<textarea
								name="body"
								id=""
								placeholder="body"
								className="w-full h-32 rounded-lg border-2 border-blue-400 text-sm font-mono p-4 m-4"
								value={body}
								onChange={(e) => setBody(e.target.value)}
							></textarea>
						</div>
					)}

					{panel === "header" && (
						<div>
							{headerRow.map((row, idx) => (
								<div className="flex flex-row">
									<input
										type="key"
										placeholder="Key"
										className="flex-1 border-2 border-blue-400 text-sm font-mono p-2"
										value={row.key}
										onChange={(e) => {
											const copy = [...headerRow];
											copy[idx].key = e.target.value;
											setHeaderRow(copy);
										}}
									/>
									<input
										type="value"
										placeholder="Value"
										className="flex-1 border-2 border-blue-400 text-sm font-mono p-2"
										value={row.value}
										onChange={(e) => {
											const copy = [...headerRow];
											copy[idx].value = e.target.value;
											setHeaderRow(copy);
										}}
									/>
									{headerRow.length > 1 && (
										<button
											className="border-2 bg-blue-400 py-1 px-6"
											onClick={() => {
												const copy = [...headerRow];
												copy.splice(idx, 1);
												setHeaderRow(copy);
											}}
										>
											Delete
										</button>
									)}
								</div>
							))}
							<button
								className="border-2 bg-blue-400 py-1 px-6"
								onClick={() => {
									setHeaderRow([
										...headerRow,
										{ key: "", value: "" },
									]);
								}}
							>
								Add Header
							</button>
						</div>
					)}

					<div>
						<textarea
							name="response"
							id=""
							placeholder="response"
							readOnly
							className="w-full h-32 rounded-lg border-2 border-blue-400 text-sm font-mono p-4 m-4"
							value={output}
						></textarea>
					</div>
				</div>
			</div>
		</MainWorkspace>
	);
}

<input
	type="description"
	placeholder="Description"
	className="flex-1 border-2 border-blue-400 text-sm font-mono p-2"
/>;
