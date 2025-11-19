import taylorThinking from '../assets/taylor.gif';
import taylorWise from '../assets/taylorwise.gif';
const Results = ({answer, loading}) => {
    return (
        <div className="results">
            <h2>Taylor says:</h2>
            <p>{loading ? "Hold on..." : answer}</p>
            {loading && <img src={taylorThinking} alt="Taylor thinking" className="textbox-image" />}
            {answer == "" && !loading && <img src={taylorWise} alt="Taylor wise" className="textbox-image"   />}
            
        </div>
    )
}
export default Results