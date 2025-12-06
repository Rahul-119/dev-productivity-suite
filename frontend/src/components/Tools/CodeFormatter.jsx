import { useState } from "react";
import { Code2, Trash2, Wand2, Copy, Check } from "lucide-react";
import * as prettier from "prettier/standalone";
import * as parserBabel from "prettier/parser-babel";
import * as parserHtml from "prettier/parser-html";
import * as parserPostCss from "prettier/parser-postcss";
import * as parserEstree from "prettier/plugins/estree";
import CopyButton from "../common/CopyButton";

export default function CodeFormatter() {
	const [input, setInput] = useState("");
	const [output, setOutput] = useState("");
	const [language, setLanguage] = useState("javascript");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [copied, setCopied] = useState(false);

	const handleClear = () => {
		setInput("");
		setOutput("");
		setError("");
	};

	const handleFormat = async () => {
		if (!input.trim()) {
			setError("Please enter some code to format");
			setOutput("");
			return;
		}

		const parserMap = {
			javascript: "babel",
			json: "json",
			html: "html",
			css: "css",
		};

		const parser = parserMap[language];

		if (!parser) {
			setError("Unknown language selected");
			return;
		}

		setLoading(true);

		try {
			const formatted = await prettier.format(input, {
				parser: parser,
				plugins: [parserBabel, parserHtml, parserPostCss, parserEstree],
			});

			setOutput(formatted);
			setError("");
		} catch (error) {
			setError("Formatting Error: " + error.message);
			setOutput("");
		} finally {
			setLoading(false);
		}
	};

	const languageColors = {
		javascript: "from-yellow-500 to-orange-500",
		json: "from-green-500 to-emerald-500",
		html: "from-orange-500 to-red-500",
		css: "from-blue-500 to-cyan-500",
	};

	const languageIcons = {
		javascript: "JS",
		json: "{}",
		html: "<>",
		css: "#",
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="text-center mb-8">
					<div className="flex items-center justify-center gap-3 mb-2">
						<Code2 size={40} className="text-purple-400" />
						<h1 className="text-4xl md:text-5xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
							Code Formatter
						</h1>
					</div>
					<p className="text-slate-400 text-sm md:text-base">
						Beautify your code instantly
					</p>
				</div>

				{/* Main Card */}
				<div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden">
					{/* Language Selector */}
					<div className="p-4 md:p-6 border-b border-slate-700">
						<div className="flex flex-col md:flex-row md:items-center gap-4">
							<label className="text-slate-300 font-semibold text-sm md:text-base flex items-center gap-2">
								<Code2 size={20} />
								Language:
							</label>
							<div className="flex gap-2 flex-wrap">
								{Object.keys(languageColors).map((lang) => (
									<button
										key={lang}
										className={`px-4 py-2 rounded-xl font-bold text-sm transition-all duration-200 ${
											language === lang
												? `bg-gradient-to-r ${languageColors[lang]} text-white shadow-lg scale-105`
												: "bg-slate-700/50 text-slate-300 hover:bg-slate-700"
										}`}
										onClick={() => setLanguage(lang)}
									>
										<span className="mr-2">
											{languageIcons[lang]}
										</span>
										{lang.charAt(0).toUpperCase() +
											lang.slice(1)}
									</button>
								))}
							</div>
						</div>
					</div>

					{/* Input Section */}
					<div className="p-4 md:p-6">
						<label className="block mb-3 text-slate-300 font-semibold text-sm flex items-center gap-2">
							<Code2 size={18} />
							Input Code
						</label>
						<textarea
							placeholder="Paste your messy code here..."
							className="w-full h-64 md:h-80 px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-200 font-mono text-sm resize-none"
							value={input}
							onChange={(e) => setInput(e.target.value)}
						/>
					</div>

					{/* Action Buttons */}
					<div className="px-4 md:px-6 pb-4 flex flex-col sm:flex-row gap-3">
						<button
							className={`flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 ${
								loading ? "opacity-50 cursor-not-allowed" : ""
							}`}
							onClick={handleFormat}
							disabled={loading}
						>
							{loading ? (
								<>
									<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
									Formatting...
								</>
							) : (
								<>
									<Wand2 size={20} />
									Format Code
								</>
							)}
						</button>
						<button
							className="px-6 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
							onClick={handleClear}
						>
							<Trash2 size={20} />
							Clear All
						</button>
					</div>

					{/* Error Display */}
					{error && (
						<div className="mx-4 md:mx-6 mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/50 text-red-400 text-sm flex items-start gap-3">
							<span className="text-red-500 font-bold text-lg">
								⚠
							</span>
							<p>{error}</p>
						</div>
					)}

					{/* Output Section */}
					<div className="border-t border-slate-700 bg-slate-900/50 p-4 md:p-6">
						<div className="flex justify-between items-center mb-3">
							<label className="text-slate-300 font-semibold text-sm flex items-center gap-2">
								<Code2 size={18} />
								Formatted Output
							</label>
						</div>
						<div className="relative">
							<CopyButton
								text={output}
								className="absolute right-1 top-1 px-0.1 py-0.1 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium text-sm transition-all duration-200"
							/>
							<textarea
								placeholder="Formatted code will appear here..."
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
