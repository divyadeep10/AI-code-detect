import { useState } from "react";

const App = () => {
  const [code, setCode] = useState("");
  const [action, setAction] = useState("detect-language");
  const [output, setOutput] = useState("");

  const actions = [
    { id: "detect-language", label: "Language Detection" },
    { id: "explain-code", label: "Code Explanation" },
    { id: "refactor-code", label: "Code Refactoring" },
    { id: "suggest-optimizations", label: "Optimization Suggestions" },
    { id: "generate-comments", label: "Generate Comments" },
    { id: "debug-code", label: "Debug Code" },
    { id: "check-code-style", label: "Check Code Style" },
    { id: "best-practices", label: "Best Practices" },
  ];

  const handleSubmit = async () => {
    if (!code.trim()) {
      alert("Please enter some code before submitting.");
      return;
    }

    const urlMap = {
      "detect-language": "/detect-language",
      "explain-code": "/explain-code",
      "refactor-code": "/refactor-code",
      "suggest-optimizations": "/suggest-optimizations",
      "generate-comments": "/generate-comments",
      "debug-code": "/debug-code",
      "check-code-style": "/check-code-style",
      "best-practices": "/best-practices",
    };

    const payload = { code };
    if (action === "check-code-style") payload.style_guide = "PEP 8";
    if (action === "best-practices") payload.language = "Python";

    setOutput("Processing your request...");

    try {
      const response = await fetch(`https://ai-detect-backend-2h6392xmc-divyadeep10s-projects.vercel.app${urlMap[action]}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      setOutput(data.language || data.explanation || data.output || data.message || data.optimizations || data.comments || data.debug_suggestions || data.style_violations || data.best_practices);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gray-800 py-4 shadow-md">
        <h1 className="text-center text-3xl font-bold">Code Analysis Tool</h1>
      </header>

      {/* Section 1: Grid of Actions */}
      <section className="max-w-5xl mx-auto p-6 mt-8">
        <h2 className="text-2xl font-semibold mb-6">Select an Action</h2>
        <div className="grid grid-cols-3 gap-6">
          {actions.map(({ id, label }) => (
            <div
              key={id}
              className={`p-4 rounded-lg border ${
                action === id
                  ? "bg-green-600 border-green-400"
                  : "bg-gray-800 border-gray-700"
              } cursor-pointer hover:bg-green-700 transition`}
              onClick={() => setAction(id)}
            >
              <h3 className="text-lg font-medium text-center">{label}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Code Submission */}
      <section className="max-w-5xl mx-auto p-6 bg-gray-800 rounded-lg shadow-md mt-8">
        <h2 className="text-2xl font-semibold mb-4">
          Action: {actions.find((a) => a.id === action)?.label}
        </h2>
        <textarea
          className="w-full h-40 p-3 rounded-lg bg-gray-900 text-gray-100 border border-gray-700 focus:ring focus:ring-green-500 mb-4"
          placeholder="Paste your code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
        ></textarea>
        <button
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </section>

      {/* Section 3: Output */}
      <section className="max-w-5xl mx-auto p-6 bg-gray-800 rounded-lg shadow-md mt-8">
        <h2 className="text-2xl font-semibold mb-4">Output</h2>
        <div className="p-4 bg-gray-900 rounded-lg border border-gray-700 overflow-x-auto">
          <pre className="whitespace-pre-wrap">{output}</pre>
        </div>
      </section>
    </div>
  );
};

export default App;
