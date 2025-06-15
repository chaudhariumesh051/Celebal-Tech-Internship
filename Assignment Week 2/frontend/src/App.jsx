import { useState } from 'react';
import './App.css';

const API = 'http://localhost:5000';

function App() {
  const [filename, setFilename] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleCreate = async () => {
    const res = await fetch(`${API}/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename, content }),
    });
    const data = await res.json();
    setMessage(data.message);
  };

  const handleRead = async () => {
    const res = await fetch(`${API}/read?filename=${filename}`);
    const data = await res.json();
    setMessage(data.content);
  };

  const handleDelete = async () => {
    const res = await fetch(`${API}/delete?filename=${filename}`, { method: 'DELETE' });
    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className="container">
      <h1>📁 File Manager</h1>
      <input
        type="text"
        placeholder="Filename"
        value={filename}
        onChange={e => setFilename(e.target.value)}
      />
      <textarea
        rows="5"
        placeholder="Content"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <div className="buttons">
        <button onClick={handleCreate}>Create</button>
        <button onClick={handleRead}>Read</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
      <p className="output">{message}</p>
    </div>
  );
}

export default App;
