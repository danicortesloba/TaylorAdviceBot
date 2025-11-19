import { useState } from 'react'
import Form from './components/form.jsx'
import Results from './components/results.jsx'
import './App.css'
import taylorImage from "./assets/taylor.jpg"



function App() {
  const [query, setQuery] = useState("")
  const [answer, setAnswer] = useState("")
  const [loading, setLoading] = useState(false);
const fetchAnswer = async (prompt) => {
  const userInput = prompt ?? query;
  if (!userInput) return;

  try {
    const apiUrl = import.meta.env.VITE_API_URL || '/api/responses';
    const resp = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content:
              "You are an assistant that provides advice using only Taylor Swift song lyrics. Respond to the user's questions by quoting relevant lyrics from Taylor Swift's discography.",
          },
          { role: 'user', content: userInput },
        ],
      }),
    });

    const data = await resp.json();

    let content = '';
    if (data?.choices && data.choices[0]?.message?.content) {
      content = data.choices[0].message.content;
    }

    if (!content) content = JSON.stringify(data);

    console.log(content);
    setAnswer(content);
    return content;
  } catch (err) {
    console.error(err);
    setAnswer("Sorry, Taylor can't come to the phone right now.");
    return null;
  }
};

  return (
    <div className="container">
      <h1>Ask Taylor</h1>
      <img src={taylorImage} alt="Ask Taylor Swift" className="logo" />
      <div className="subcontainer">
        <Form setQuery={setQuery} fetchAnswer={fetchAnswer} clearAnswer={() => setAnswer("")} loading={loading} setLoading={setLoading} />
        <Results answer={answer} loading={loading}/>
      </div>    
    </div>
  )
}

export default App
