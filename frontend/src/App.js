import { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");

  const askFarmer = async () => {
    const res = await fetch("https://your-backend-url.onrender.com/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: query }),
    });
    const data = await res.json();
    setAnswer(data.answer);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>🌱 किसान सहाय्यक</h1>
      <input
        type="text"
        style={{ width: "300px", padding: "8px" }}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="आपला प्रश्न लिहा..."
      />
      <button onClick={askFarmer} style={{ marginLeft: "10px", padding: "8px" }}>
        विचारा
      </button>
      <p style={{ marginTop: "20px" }}>👉 उत्तर: {answer}</p>
    </div>
  );
}

export default App;
