import { useState } from "react";
import { Braces, CheckCircle, Wand2, Minimize2, Trash2 } from "lucide-react";
import CopyButton from "../common/CopyButton";

export default function JsonTools() {
	const [input, setInput] = useState("");
	const [output, setOutput] = useState("");
	const [message, setMessage] = useState("");
	const [messageType, setMessageType] = useState("");

	const handleClear = () => {
		setInput("");
		setOutput("");
		setMessage("");
		setMessageType("");
	};

	const handleFormat = () => {
		try {
			const parsed = JSON.parse(input);
			const jsonString = JSON.stringify(parsed, null, 2);
			setOutput(jsonString);
			setMessage("JSON formatted successfully!");
			setMessageType("success");
		} catch (error) {
			setMessage("Error in Input String: " + error.message);
			setMessageType("error");
		}
	};

	const handleValidate = () => {
		try {
			const parsed = JSON.parse(input);
			setMessage("JSON format is correct!");
			setMessageType("success");
		} catch (error) {
			setMessage("Error in Input String: " + error.message);
			setMessageType("error");
		}
	};

	const handleMinify = () => {
		try {
			const parsed = JSON.parse(input);
			const jsonString = JSON.stringify(parsed);
			setOutput(jsonString);
			setMessage("JSON minified successfully!");
			setMessageType("success");
		} catch (error) {
			setMessage("Error in Input String: " + error.message);
			setMessageType("error");
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="text-center mb-8">
					<div className="flex items-center justify-center gap-3 mb-2">
						<Braces size={40} className="text-purple-400" />
						<h1 className="text-4xl md:text-5xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
							JSON Tools
						</h1>
					</div>
					<p className="text-slate-400 text-sm md:text-base">Validate, format, and minify JSON data</p>
				</div>

				{/* Main Card */}
				<div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden">
					{/* Input Section */}
					<div className="p-4 md:p-6">
						<label className="block mb-3 text-slate-300 font-semibold text-sm flex items-center gap-2">
							<Braces size={18} />
							Input JSON
						</label>
						<textarea
							placeholder="Paste your JSON here..."
							className="w-full h-64 md:h-80 px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-200 font-mono text-sm resize-none"
							value={input}
							onChange={(e) => setInput(e.target.value)}
						/>
					</div>

					{/* Action Buttons */}
					<div className="px-4 md:px-6 pb-4 flex flex-wrap gap-3">
						<button
							className="flex-1 min-w-[120px] px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
							onClick={handleValidate}
						>
							<CheckCircle size={20} />
							Validate
						</button>
						<button
							className="flex-1 min-w-[120px] px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
							onClick={handleFormat}
						>
							<Wand2 size={20} />
							Format
						</button>
						<button
							className="flex-1 min-w-[120px] px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
							onClick={handleMinify}
						>
							<Minimize2 size={20} />
							Minify
						</button>
						<button
							className="px-6 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
							onClick={handleClear}
						>
							<Trash2 size={20} />
							Clear
						</button>
					</div>

					{/* Message Display */}
					{message && (
						<div className={`mx-4 md:mx-6 mb-4 p-4 rounded-xl border text-sm flex items-start gap-3 ${
							messageType === "success"
								? "bg-green-500/10 border-green-500/50 text-green-400"
								: "bg-red-500/10 border-red-500/50 text-red-400"
						}`}>
							<span className="font-bold text-lg">
								{messageType === "success" ? "✅" : "⚠"}
							</span>
							<p>{message}</p>
						</div>
					)}

					{/* Output Section */}
					<div className="border-t border-slate-700 bg-slate-900/50 p-4 md:p-6">
						<div className="flex justify-between items-center mb-3">
							<label className="text-slate-300 font-semibold text-sm flex items-center gap-2">
								<Braces size={18} />
								Output JSON
							</label>
						</div>
						<div className="relative">
							<CopyButton text={output} className="absolute right-1 top-1 px-0.5 py-0.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium text-sm transition-all duration-200" />
						<textarea
							placeholder="Processed JSON will appear here..."
							readOnly
							className="w-full h-64 md:h-80 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-green-400 placeholder-slate-500 outline-none font-mono text-sm resize-none"
							value={output}
						/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}