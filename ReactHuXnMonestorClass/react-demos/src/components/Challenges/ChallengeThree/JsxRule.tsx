import {Link} from "react-router-dom";

const JsxRule = () => {
  return (
    <div>
      <h1>JSX Rules</h1>
      <p>
        <ol className="li">JSX must return a single parent element</ol>
        <ol className="li">JSX elements must be properly closed</ol>
        <ol className="li">JSX attributes are written using camelCase (eg., className instead of class)</ol>
      </p>

      <h3>Let's Go Back To Home Page</h3>
      <Link to={"/"}>Home</Link>
    </div>
  )
}

export default JsxRule
