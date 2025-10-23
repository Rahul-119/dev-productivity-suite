import { useState } from "react";
import * as prettier from "prettier/standalone";
import * as parserBabel from "prettier/parser-babel";
import * as parserHtml from "prettier/parser-html";
import * as parserPostCss from "prettier/parser-postcss";
import * as parserEstree from "prettier/plugins/estree";  

export default function CodeFormatter() {
	const [input, setInput] = useState("");
	const [output, setOutput] = useState("");
	const [language, setLanguage] = useState("javascript");
	const [error, setError] = useState("");

	const handleClear = () => {
		setInput("");
		setOutput("");
		setError("");
	};

	const handleFormat = async () => {

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
		}
	};
	return (
		<div className="p-4 ">
			<div className="flex items-center m-2">
				<label className="mr-3 font-mono" htmlFor="language">
					Choose a language:
				</label>
				<select
					name="dropdown"
					id="language"
					className="p-2 rounded-md text-sm font-semibold gap-x-1.5 w-30 inline-flex justify-center font-mono outline-1"
					value={language}
					onChange={(e) => setLanguage(e.target.value)}
				>
					<option value="javascript">JavaScript</option>
					<option value="json">Json</option>
					<option value="html">HTML</option>
					<option value="css">CSS</option>
				</select>
			</div>
			<div className="flex flex-col">
				<label
					className="block mb-2 font-semibold font-mono"
					htmlFor="input"
				>
					Input Code:
				</label>
				<textarea
					name="input"
					id="input"
					placeholder="Enter String"
					className="w-full h-64 rounded-lg border-2 border-blue-400 text-sm font-mono p-4 "
					value={input}
					onChange={(e) => setInput(e.target.value)}
				></textarea>
			</div>
			<div>
				<button
					className="px-10 py-2 m-3 rounded-lg bg-blue-600  hover:text-white transition-transform hover:scale-105 active:scale-95"
					onClick={handleFormat}
				>
					Format
				</button>
				<button
					className="px-10 py-2 m-3 rounded-lg bg-blue-600  hover:text-white transition-transform hover:scale-105 active:scale-95"
					onClick={handleClear}
				>
					Clear
				</button>
			</div>
			<div>
				<textarea
					name="input"
					id=""
					placeholder="Formatted output will appear here..."
					className="w-full h-64 rounded-lg border-2 border-blue-400 text-sm font-mono p-4 bg-gray-50"
					readOnly
					value={output}
				></textarea>
			</div>
			{error && (
				<div className="mt-3 p-3 bg-red-50 border-2 border-red-400 rounded-lg">
					<p className="text-red-700">{error}</p>
				</div>
			)}
		</div>
	);
}
