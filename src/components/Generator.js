import React, { useEffect, useState } from 'react';
import '../styles/Generator.css';

function Generator() {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('buzz'); // ID of a default meme template
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.memegen.link/templates/')
      .then((response) => response.json())
      .then((data) => {
        setTemplates(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching templates:', error);
        setError('Failed to load templates');
        setLoading(false);
      });
  }, []);

  const url = `https://api.memegen.link/images/${selectedTemplate}/${encodeURIComponent(
    topText || '_',
  )}/${encodeURIComponent(bottomText || '_')}.png`;

  if (loading) return <div>Loading templates...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="generator-container">
      <form className="generator-form">
        <label>
          Select a template:
          <select
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
          >
            {templates.map((template, index) => (
              <option key={index} value={template.id}>
                {template.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Top Text:
          <input
            type="text"
            value={topText}
            onChange={(e) => setTopText(e.target.value)}
            placeholder="Enter top text"
          />
        </label>

        <label>
          Bottom Text:
          <input
            type="text"
            value={bottomText}
            onChange={(e) => setBottomText(e.target.value)}
            placeholder="Enter bottom text"
          />
        </label>
      </form>

      <div className="generator-meme">
        <img src={url} alt="Generated Meme" />
        <a href={url} download="meme.png">
          <button className="download-btn">Download</button>
        </a>
      </div>
    </div>
  );
}

export default Generator;
