import { useState } from "react";

function App() {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Form submitted: ${name}`);
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Simple Form</h2>

      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;