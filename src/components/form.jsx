import { useState } from "react"
import "../App.css"

const Form = ({ setQuery, fetchAnswer, clearAnswer, loading, setLoading }) => {
    const [question, setQuestion] = useState("")


    return (
        <div className="form">
        <form
            className="form"
            onSubmit={async (e) => {
                e.preventDefault()
                if (!question) return;
                setLoading(true);
                setQuery(question)
                try {
                    await fetchAnswer(question)
                } finally {
                    setQuestion("")
                    setLoading(false);
                }
            }}
        >
            <textarea
                placeholder="Ask your question here..."
                className="textarea"
                value={question}
                name="question"
                rows={4}
                onChange={(e) => {
                    setQuestion(e.target.value);
                    clearAnswer();
                }}
            />
            <button type="submit" disabled={loading} className="submit-button">
                {loading ? "Taylor is thinking. Please wait a minute. It might take a while." : "Ask"}
            </button>
        </form>
        </div>
    )
}

export default Form