import { useState } from "react";

export default function CopyButton({ text , className}) {
	const [copied, setCopied] = useState(false);

	const copyText = async () => {
		await navigator.clipboard.writeText(text);
		
		setCopied(true);

		setTimeout(() => {
			setCopied(false)
		}, 1500);
	};

	return (
		<div className={className}>
			<button
				className="px-0.1 py-0.1 m-3 rounded-lg hover:text-white transition-transform hover:scale-105 active:scale-95 hover:cursor-pointer"
				onClick={copyText}
			>
				{copied ?  <img src="/check.png" alt="Copy Text" className="w-4 h-4"></img> : <img src="/copy.png" alt="Copy Text" className="w-4 h-4"></img>}
			</button>
		</div>
	);
}
