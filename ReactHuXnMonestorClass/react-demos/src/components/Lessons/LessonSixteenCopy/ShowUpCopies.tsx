import { Link } from "react-router-dom";
import { createPortal } from "react-dom";

type ShowUpCopiesProp = {
  isCopied: boolean;
};

const ShowUpCopies = ({ isCopied }: ShowUpCopiesProp) => {
  const portal = document.querySelector("#saleh-abdulla");
  if (!portal) return null;

  return createPortal(
    <div>
      {isCopied && <h1>Copyied Successfully</h1>}
      <Link to={"/"}>Back To Home</Link>
    </div>,
    portal
  );
};

export default ShowUpCopies;
