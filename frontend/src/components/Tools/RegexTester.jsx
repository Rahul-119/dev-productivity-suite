import { useState } from "react";
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
      setError("Invalid Regex Pattern : " + error.message);
      setMatches([]);
    }
  };
  return (
    <div className="p-4">
      <div className="flex items-center">
        <label htmlFor="pattern" className="font-mono font-bold text-xl">
          Expression
        </label>
        <input
          type="text"
          id="pattern"
          name="pattern"
          placeholder="\w+@\w+\.\w+"
          className="p-2 rounded-lg m-3 flex-1 border-2 border-blue-400 font-mono"
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
        />
      </div>

      <div>
        <textarea
          name="input"
          id=""
          placeholder="Enter Text"
          className="w-full h-64 rounded-lg border-2 border-blue-400 text-sm font-mono p-4"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              name=""
              id="global"
              className="w-4 h-4 accent-blue-600"
              checked={flagG}
              onChange={(e) => setFlagG(e.target.checked)}
            />
            <label htmlFor="global" className="font-mono">
              global (g)
            </label>
          </div>
          <div className="flex items-center gap-1 ">
            <input
              type="checkbox"
              name=""
              id="insensitive"
              className="w-4 h-4 accent-blue-600"
              checked={flagI}
              onChange={(e) => setFlagI(e.target.checked)}
            />
            <label htmlFor="insensitive" className="font-mono">ignore (i)</label>
          </div>
          <div className="flex items-center gap-1 ">
            <input
              type="checkbox"
              name=""
              id="multi"
              className="w-4 h-4 accent-blue-600"
              checked={flagM}
              onChange={(e) => setFlagM(e.target.checked)}
            />
            <label htmlFor="multi" className="font-mono">multiline (m)</label>
          </div>
        </div>

        <div>
          <button
            className="px-10 py-2 m-3 rounded-lg bg-blue-600  hover:text-white hover transition-transform hover:scale-105 active:scale-95"
            onClick={handleTest}
          >
            Test
          </button>
          <button
            className="px-10 py-2 m-3 rounded-lg bg-blue-600  hover:text-white hover transition-transform hover:scale-105 active:scale-95"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>

      <div>
        <textarea
          name="matches"
          id=""
          placeholder="Matches"
          readOnly
          className="w-full h-32 rounded-lg border-2 border-blue-400 text-sm font-mono p-4 "
          value={matches.join("\n")}
        ></textarea>
      </div>
    </div>
  );
}
