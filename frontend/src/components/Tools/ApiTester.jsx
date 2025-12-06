import { useState } from "react";
import { Send, Plus, Trash2, Code, FileText } from "lucide-react";
import axios from "axios";
import CopyButton from "../common/CopyButton";

export default function ApiTester() {
	const [input, setInput] = useState("");
	const [output, setOutput] = useState("");
	const [method, setMethod] = useState("GET");
	const [error, setError] = useState("");
	const [body, setBody] = useState("");
	const [headerRow, setHeaderRow] = useState([{ key: "", value: "" }]);
	const [panel, setPanel] = useState("header");
	const [loading, setLoading] = useState(false);

	const handleRequest = async (method, url) => {
		if (!url.trim()) {
			setError("Please enter a valid URL");
			setOutput("");
			return;
		}

		setLoading(true);
		try {
			let parseString = "";
			let isEmpty = body.trim().length <= 0;

			if (!isEmpty) {
				try {
					parseString = JSON.parse(body);
				} catch (error) {
					setError("Invalid JSON in body: " + error.message);
					setOutput("");
					setLoading(false);
					return;
				}
			}

			const headerObject = {};
			headerRow.forEach(({ key, value }) => {
				if (key.trim() && value.trim()) {
					headerObject[key] = value;
				}
			});

			const res = await axios({
				method: method,
				url: url,
				data: !isEmpty ? parseString : undefined,
				headers: headerObject,
			});

			const formattedCode = JSON.stringify(res.data, null, 2);
			setOutput(formattedCode);
			setError("");
		} catch (error) {
			setError(error.message);
			setOutput("");
		} finally {
			setLoading(false);
		}
	};

	const methodColors = {
		GET: "from-blue-500 to-cyan-500",
		POST: "from-green-500 to-emerald-500",
		PUT: "from-orange-500 to-amber-500",
		DELETE: "from-red-500 to-rose-500",
		PATCH: "from-purple-500 to-pink-500"
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="text-center mb-8">
					<h1 className="text-4xl md:text-5xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
						API Tester
					</h1>
					<p className="text-slate-400 text-sm md:text-base">Test your API endpoints with ease</p>
				</div>

				{/* Main Card */}
				<div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden">
					{/* Request Section */}
					<div className="p-4 md:p-6 space-y-4">
						{/* Method and URL Input */}
						<div className="flex flex-col md:flex-row gap-3">
							<select
								className={`px-4 py-3 rounded-xl bg-gradient-to-r ${methodColors[method]} text-white font-bold text-sm md:text-base shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer outline-none md:w-32`}
								value={method}
								onChange={(e) => setMethod(e.target.value)}
							>
								<option value="GET">GET</option>
								<option value="POST">POST</option>
								<option value="PUT">PUT</option>
								<option value="DELETE">DELETE</option>
								<option value="PATCH">PATCH</option>
							</select>

							<input
								type="text"
								placeholder="https://api.example.com/endpoint"
								className="flex-1 px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-200 font-mono text-sm"
								value={input}
								onChange={(e) => setInput(e.target.value)}
							/>

							<button
								className={`px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
								onClick={() => handleRequest(method, input)}
								disabled={loading}
							>
								{loading ? (
									<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
								) : (
									<>
										<Send size={18} />
										<span className="hidden md:inline">Send</span>
									</>
								)}
							</button>
						</div>

						{/* Tab Buttons */}
						<div className="flex gap-2 border-b border-slate-700">
							<button
								className={`px-6 py-3 font-semibold transition-all duration-200 flex items-center gap-2 ${
									panel === "header"
										? "text-purple-400 border-b-2 border-purple-400"
										: "text-slate-400 hover:text-white"
								}`}
								onClick={() => setPanel("header")}
							>
								<FileText size={18} />
								Headers
							</button>
							<button
								className={`px-6 py-3 font-semibold transition-all duration-200 flex items-center gap-2 ${
									panel === "body"
										? "text-purple-400 border-b-2 border-purple-400"
										: "text-slate-400 hover:text-white"
								}`}
								onClick={() => setPanel("body")}
							>
								<Code size={18} />
								Body
							</button>
						</div>

						{/* Body Panel */}
						{panel === "body" && (
							<div className="space-y-2">
								<label className="text-slate-300 text-sm font-medium">Request Body (JSON)</label>
								<textarea
									placeholder='{"key": "value"}'
									className="w-full h-48 md:h-64 px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-200 font-mono text-sm resize-none"
									value={body}
									onChange={(e) => setBody(e.target.value)}
								/>
							</div>
						)}

						{/* Header Panel */}
						{panel === "header" && (
							<div className="space-y-3">
								<div className="flex justify-between items-center">
									<label className="text-slate-300 text-sm font-medium">Request Headers</label>
									<button
										className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium transition-all duration-200 flex items-center gap-2"
										onClick={() => setHeaderRow([...headerRow, { key: "", value: "" }])}
									>
										<Plus size={16} />
										Add Header
									</button>
								</div>

								<div className="space-y-2 max-h-64 overflow-y-auto pr-2">
									{headerRow.map((row, idx) => (
										<div key={idx} className="flex flex-col md:flex-row gap-2 bg-slate-700/30 p-3 rounded-lg">
											<input
												type="text"
												placeholder="Key (e.g., Authorization)"
												className="flex-1 px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:border-purple-500 outline-none transition-all duration-200 font-mono text-sm"
												value={row.key}
												onChange={(e) => {
													const copy = [...headerRow];
													copy[idx].key = e.target.value;
													setHeaderRow(copy);
												}}
											/>
											<input
												type="text"
												placeholder="Value (e.g., Bearer token)"
												className="flex-1 px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:border-purple-500 outline-none transition-all duration-200 font-mono text-sm"
												value={row.value}
												onChange={(e) => {
													const copy = [...headerRow];
													copy[idx].value = e.target.value;
													setHeaderRow(copy);
												}}
											/>
											{headerRow.length > 1 && (
												<button
													className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-all duration-200 flex items-center justify-center gap-2 md:w-auto"
													onClick={() => {
														const copy = [...headerRow];
														copy.splice(idx, 1);
														setHeaderRow(copy);
													}}
												>
													<Trash2 size={16} />
													<span className="md:hidden">Delete</span>
												</button>
											)}
										</div>
									))}
								</div>
							</div>
						)}
					</div>

					{/* Response Section */}
					<div className="border-t border-slate-700 bg-slate-900/50 p-4 md:p-6">
						<div className="flex justify-between items-center mb-3">
							<label className="text-slate-300 text-sm font-medium flex items-center gap-2">
								<Code size={18} />
								Response
							</label>
						</div>

						{error && (
							<div className="mb-3 p-4 rounded-xl bg-red-500/10 border border-red-500/50 text-red-400 text-sm">
								{error}
							</div>
						)}
						<div className="relative">
							<CopyButton text={output} className="absolute right-1 top-1  px-0.1 py-0.1 text-xs rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-all duration-200" />
						<textarea
							placeholder="Response will appear here..."
							readOnly
							className="w-full h-48 md:h-64 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-green-400 placeholder-slate-500 outline-none font-mono text-sm resize-none"
							value={output}
						/>
						</div>
					</div>
				</div>

			</div>
		</div>
	);
}