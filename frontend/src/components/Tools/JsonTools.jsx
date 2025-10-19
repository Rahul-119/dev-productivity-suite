import { useState } from "react";
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
      setMessage("✅ JSON formatted successfully!");
      setMessageType("success");
    } catch (error) {
      setMessage("Error in Input String");
      setMessageType("error");
    }
  };

  const handleValidate = () => {
    try {
      const parsed = JSON.parse(input);
      setMessage("✅ JSON format is correct!");
      setMessageType("success");
    } catch (error) {
      setMessage("Error in Input String");
      setMessageType("error");
    }
  };

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(input);
      const jsonString = JSON.stringify(parsed);
      setOutput(jsonString);
      setMessage("✅ JSON minified successfully!");
      setMessageType("success");
    } catch (error) {
      setMessage("Error in Input String");
      setMessageType("error");
    }
  };

  return (
    <div className="p-8">
      <div>
        <textarea
          name="input"
          id=""
          placeholder="Enter String"
          className="w-full h-64 rounded-lg border-2 border-blue-400 text-sm font-mono p-4 "
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
      </div>

      <div className="flex gap-3 justify-center">
        <button
          className="px-10 py-2 m-3 rounded-lg bg-blue-600  hover:text-white hover transition-transform hover:scale-105 active:scale-95"
          onClick={handleValidate}
        >
          Validate
        </button>
        <button
          className="px-10 py-2 m-3 rounded-lg bg-blue-600 hover:text-white transition-transform hover:scale-105 active:scale-95"
          onClick={handleFormat}
        >
          Format
        </button>
        <button
          className="px-10 py-2 m-3 rounded-lg bg-blue-600  hover:text-white transition-transform hover:scale-105 active:scale-95"
          onClick={handleMinify}
        >
          Minify
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
          name="output"
          id=""
          placeholder="Output"
          readOnly
          className="w-full h-64 rounded-lg border-2 border-blue-400 text-sm font-mono p-4"
          value={output}
        ></textarea>
      </div>
    </div>
  );
}
