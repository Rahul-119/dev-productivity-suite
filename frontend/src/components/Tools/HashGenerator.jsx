import MainWorkspace from "../Layout/MainWorkspace";
import CopyButton from "../common/CopyButton";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function HashGenerator() {
	const [uuidResult, setUuidResult] = useState("");
	const [hashInput, setHashInput] = useState("");
	const [hashResult, setHashResult] = useState("");
	const [base64Input, setBase64Input] = useState("");
	const [base64Result, setBase64Result] = useState("");

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
		<MainWorkspace title="Hash Generator">
			<div className="p-4">
				<div className="mb-8">
					<h1 className="text-2xl mb-4 font-bold">UUID Generator</h1>
					<button
						className="px-10 py-2 m-3 rounded-lg bg-blue-600  hover:text-white hover transition-transform hover:scale-105 active:scale-95"
						onClick={handleUUID}
					>
						Generate UUID
					</button>
					<div className="relative mt-4">
						<CopyButton text={uuidResult} className="absolute right-0.5 top-0.3"></CopyButton>
						<textarea
							name="uuid"
							id=""
							readOnly
							className="border-2 rounded-lg p-4 w-full border-gray-300"
							value={uuidResult}
						></textarea>
					</div>
				</div>

				<div className="mb-8 flex flex-col">
					<h1 className="text-2xl mb-4 font-bold">Hash Generator</h1>
					<label
						htmlFor="base64"
						className="flex font-semibold text-lg"
					>
						Input:{" "}
					</label>
					<input
						type="text"
						name=""
						id="base64"
						placeholder="Type (or paste) here"
						className="border-2 rounded-lg p-4 h-15 font-mono border-gray-300"
						value={hashInput}
						onChange={(e) => setHashInput(e.target.value)}
					/>
					<div className="flex justify-center gap-3">
						<button
							className="px-10 py-2 m-3 rounded-lg bg-blue-600  hover:text-white hover transition-transform hover:scale-105 active:scale-95"
							onClick={() => handleGenerateSHA("SHA-1")}
						>
							SHA-1
						</button>
						<button
							className="px-10 py-2 m-3 rounded-lg bg-blue-600  hover:text-white hover transition-transform hover:scale-105 active:scale-95"
							onClick={() => handleGenerateSHA("SHA-256")}
						>
							SHA-256
						</button>
					</div>
					<div className="relative">
						<CopyButton text={hashResult} className="absolute right-1 top-1"></CopyButton>	
						<textarea
							name="hashresult"
							id=""
							readOnly
							className="border-2 border-gray-300 h-32 rounded-lg p-4 w-full"
							value={hashResult}
						></textarea>
					</div>
				</div>

				<div className="flex flex-col mb-8">
					<h1 className="text-2xl mb-4 font-bold">
						Base64 Encoder/Decoder
					</h1>
					<label
						htmlFor="base64"
						className="flex font-semibold text-lg"
					>
						Input:{" "}
					</label>
					<input
						type="text"
						name=""
						id="base64"
						placeholder="Type (or paste) here"
						className="border-2 rounded-lg p-4 h-15 font-mono border-gray-300"
						value={base64Input}
						onChange={(e) => setBase64Input(e.target.value)}
					/>

					<div className="flex justify-center gap-3">
						<button
							className="px-10 py-2 m-3 rounded-lg bg-blue-600  hover:text-white hover transition-transform hover:scale-105 active:scale-95"
							onClick={handleEncoding}
						>
							Encode
						</button>
						<button
							className="px-10 py-2 m-3 rounded-lg bg-blue-600  hover:text-white hover transition-transform hover:scale-105 active:scale-95"
							onClick={handleDecoding}
						>
							Decode
						</button>
					</div>

					<div className="relative">
						<CopyButton text={base64Result} className="absolute right-1 top-1"></CopyButton>	
						<textarea
						name=""
						id=""
						readOnly
						className="border-2 h-32 rounded-lg p-4 border-gray-300 w-full"
						value={base64Result}
					></textarea>
					</div>
					
				</div>
			</div>
		</MainWorkspace>
	);
}
