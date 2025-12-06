import { useState } from "react";
import { Search, Trash2, Play, FileSearch } from "lucide-react";

export default function RegexTester() {
	const [pattern, setPattern] = useState("");
	const [input, setInput] = useState("");
	const [matches, setMatches] = useState([]);
	const [error, setError] = useState("");
	const [flagG, setFlagG] = useState(true);
	const [flagI, setFlagI] = useState(false);
	const [flagM, setFlagM] = useState(false);

	const handleClear = () => {
		setPattern("");
		setInput("");
		setError("");
		setMatches([]);
	};

	const handleTest = () => {
		let flags = "";
		if (flagG) flags += "g";
		if (flagI) flags += "i";
		if (flagM) flags += "m";
		try {
			const regex = new RegExp(pattern, flags);
			const results = [...input.matchAll(regex)];
			const matchTexts = results.map((match) => match[0]);
			setMatches(matchTexts);
			setError("");
		} catch (error) {
			setError("Invalid Regex Pattern: " + error.message);
			setMatches([]);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="text-center mb-8">
					<div className="flex items-center justify-center gap-3 mb-2">
						<Search size={40} className="text-purple-400" />
						<h1 className="text-4xl md:text-5xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
							Regex Tester
						</h1>
					</div>
					<p className="text-slate-400 text-sm md:text-base">Test your regular expressions instantly</p>
				</div>

				{/* Main Card */}
				<div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden">
					{/* Pattern Input */}
					<div className="p-4 md:p-6 border-b border-slate-700">
						<label className="block mb-3 text-slate-300 font-semibold text-sm flex items-center gap-2">
							<FileSearch size={18} />
							Regular Expression Pattern
						</label>
						<input
							type="text"
							placeholder="\w+@\w+\.\w+"
							className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-200 font-mono text-sm"
							value={pattern}
							onChange={(e) => setPattern(e.target.value)}
						/>
					</div>

					{/* Test String Input */}
					<div className="p-4 md:p-6">
						<label className="block mb-3 text-slate-300 font-semibold text-sm flex items-center gap-2">
							<Search size={18} />
							Test String
						</label>
						<textarea
							placeholder="Enter text to test against your regex pattern..."
							className="w-full h-48 md:h-64 px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-200 font-mono text-sm resize-none"
							value={input}
							onChange={(e) => setInput(e.target.value)}
						/>
					</div>

					{/* Flags and Actions */}
					<div className="px-4 md:px-6 pb-4">
						<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
							{/* Flags */}
							<div className="flex flex-wrap gap-4">
								<label className="flex items-center gap-2 text-slate-300 cursor-pointer hover:text-white transition-colors">
									<input
										type="checkbox"
										className="w-5 h-5 rounded accent-purple-600 cursor-pointer"
										checked={flagG}
										onChange={(e) => setFlagG(e.target.checked)}
									/>
									<span className="font-mono text-sm">global (g)</span>
								</label>
								<label className="flex items-center gap-2 text-slate-300 cursor-pointer hover:text-white transition-colors">
									<input
										type="checkbox"
										className="w-5 h-5 rounded accent-purple-600 cursor-pointer"
										checked={flagI}
										onChange={(e) => setFlagI(e.target.checked)}
									/>
									<span className="font-mono text-sm">ignore case (i)</span>
								</label>
								<label className="flex items-center gap-2 text-slate-300 cursor-pointer hover:text-white transition-colors">
									<input
										type="checkbox"
										className="w-5 h-5 rounded accent-purple-600 cursor-pointer"
										checked={flagM}
										onChange={(e) => setFlagM(e.target.checked)}
									/>
									<span className="font-mono text-sm">multiline (m)</span>
								</label>
							</div>

							{/* Action Buttons */}
							<div className="flex gap-3 w-full md:w-auto">
								<button
									className="flex-1 md:flex-none px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
									onClick={handleTest}
								>
									<Play size={20} />
									Test
								</button>
								<button
									className="px-6 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
									onClick={handleClear}
								>
									<Trash2 size={20} />
									Clear
								</button>
							</div>
						</div>

						{/* Error Display */}
						{error && (
							<div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/50 text-red-400 text-sm flex items-start gap-3">
								<span className="text-red-500 font-bold text-lg">⚠</span>
								<p>{error}</p>
							</div>
						)}
					</div>

					{/* Matches Section */}
					<div className="border-t border-slate-700 bg-slate-900/50 p-4 md:p-6">
						<div className="flex justify-between items-center mb-3">
							<label className="text-slate-300 font-semibold text-sm flex items-center gap-2">
								<Search size={18} />
								Matches {matches.length > 0 && <span className="text-green-400">({matches.length} found)</span>}
							</label>
						</div>
						<textarea
							placeholder="Matches will appear here..."
							readOnly
							className="w-full h-48 md:h-56 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-green-400 placeholder-slate-500 outline-none font-mono text-sm resize-none"
							value={matches.join("\n")}
						/>
					</div>
				</div>

			</div>
		</div>
	);
}