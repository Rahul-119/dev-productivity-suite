import { useState } from "react";
import { Hash, Key, Lock, Copy, Check, Sparkles } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import CopyButton from "../common/CopyButton";

export default function HashGenerator() {
	const [uuidResult, setUuidResult] = useState("");
	const [hashInput, setHashInput] = useState("");
	const [hashResult, setHashResult] = useState("");
	const [base64Input, setBase64Input] = useState("");
	const [base64Result, setBase64Result] = useState("");
	const [copiedUuid, setCopiedUuid] = useState(false);
	const [copiedHash, setCopiedHash] = useState(false);
	const [copiedBase64, setCopiedBase64] = useState(false);

	const handleUUID = () => {
		setUuidResult(uuidv4());
	};

	const handleGenerateSHA = async (algorithm) => {
		const encoder = new TextEncoder();
		const data = encoder.encode(hashInput);
		const hashBuffer = await crypto.subtle.digest(algorithm, data);

		const hashArray = Array.from(new Uint8Array(hashBuffer));
		const hashHex = hashArray
			.map((b) => b.toString(16).padStart(2, "0"))
			.join("");

		setHashResult(hashHex);
	};

	const handleEncoding = () => {
		try {
			const encodedVal = btoa(base64Input);
			setBase64Result(encodedVal);
		} catch (error) {
			setBase64Result("Error:" + error.message);
		}
	};

	const handleDecoding = () => {
		try {
			const decodedVal = atob(base64Input);
			setBase64Result(decodedVal);
		} catch (error) {
			setBase64Result("Error: Invalid Base64");
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
			<div className="max-w-6xl mx-auto">
				{/* Header */}
				<div className="text-center mb-8">
					<div className="flex items-center justify-center gap-3 mb-2">
						<Hash size={40} className="text-purple-400" />
						<h1 className="text-4xl md:text-5xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
							Hash Generator
						</h1>
					</div>
					<p className="text-slate-400 text-sm md:text-base">Generate UUIDs, hashes, and encode/decode Base64</p>
				</div>

				{/* UUID Generator Section */}
				<div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden mb-6">
					<div className="p-4 md:p-6 border-b border-slate-700">
						<h2 className="text-2xl font-bold text-white flex items-center gap-3">
							<Key size={28} className="text-cyan-400" />
							UUID Generator
						</h2>
					</div>
					<div className="p-4 md:p-6">
						<button
							className="w-full md:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
							onClick={handleUUID}
						>
							<Sparkles size={20} />
							Generate UUID
						</button>
						<div className="relative mt-4">
							<CopyButton text={uuidResult} className="absolute right-1 top-1 px-0.1 py-0.1 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium text-sm transition-all duration-200" />
							<textarea
								readOnly
								placeholder="Your UUID will appear here..."
								className="w-full h-24 px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600 text-green-400 placeholder-slate-500 outline-none font-mono text-sm resize-none"
								value={uuidResult}
							/>
						</div>
					</div>
				</div>

				{/* Hash Generator Section */}
				<div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden mb-6">
					<div className="p-4 md:p-6 border-b border-slate-700">
						<h2 className="text-2xl font-bold text-white flex items-center gap-3">
							<Hash size={28} className="text-purple-400" />
							Hash Generator
						</h2>
					</div>
					<div className="p-4 md:p-6">
						<label className="block mb-3 text-slate-300 font-semibold text-sm">
							Input Text
						</label>
						<input
							type="text"
							placeholder="Type or paste text here..."
							className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-200 font-mono text-sm mb-4"
							value={hashInput}
							onChange={(e) => setHashInput(e.target.value)}
						/>
						<div className="flex flex-col sm:flex-row gap-3 mb-4">
							<button
								className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
								onClick={() => handleGenerateSHA("SHA-1")}
							>
								SHA-1
							</button>
							<button
								className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
								onClick={() => handleGenerateSHA("SHA-256")}
							>
								SHA-256
							</button>
						</div>
						<div className="relative">
							<CopyButton text={hashResult} className="absolute right-1 top-1 px-0.1 py-0.1 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium text-sm transition-all duration-200" />
							<textarea
								readOnly
								placeholder="Hash will appear here..."
								className="w-full h-32 px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600 text-green-400 placeholder-slate-500 outline-none font-mono text-sm resize-none"
								value={hashResult}
							/>
						</div>
					</div>
				</div>

				{/* Base64 Encoder/Decoder Section */}
				<div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden">
					<div className="p-4 md:p-6 border-b border-slate-700">
						<h2 className="text-2xl font-bold text-white flex items-center gap-3">
							<Lock size={28} className="text-pink-400" />
							Base64 Encoder/Decoder
						</h2>
					</div>
					<div className="p-4 md:p-6">
						<label className="block mb-3 text-slate-300 font-semibold text-sm">
							Input Text
						</label>
						<input
							type="text"
							placeholder="Type or paste text here..."
							className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-200 font-mono text-sm mb-4"
							value={base64Input}
							onChange={(e) => setBase64Input(e.target.value)}
						/>
						<div className="flex flex-col sm:flex-row gap-3 mb-4">
							<button
								className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
								onClick={handleEncoding}
							>
								Encode
							</button>
							<button
								className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
								onClick={handleDecoding}
							>
								Decode
							</button>
						</div>
						<div className="relative">
							<CopyButton text={base64Result} className="absolute right-1 top-1 px-0.1 py-0.1 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium text-sm transition-all duration-200" />
							<textarea
								readOnly
								placeholder="Result will appear here..."
								className="w-full h-32 px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600 text-green-400 placeholder-slate-500 outline-none font-mono text-sm resize-none"
								value={base64Result}
							/>
						</div>
					</div>
				</div>

			</div>
		</div>
	);
}