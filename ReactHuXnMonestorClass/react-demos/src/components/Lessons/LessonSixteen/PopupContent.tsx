import { createPortal } from "react-dom";

type PopupContentProp = {
  copied: boolean;
};

const PopupContent = ({ copied }: PopupContentProp) => {

  const portalElement = document.querySelector("#popup-content");
  if (!portalElement) return null;

  return  createPortal(
    <section>
      
      <div style={{position:"absolute", bottom: "3rem"}}>
      {copied && <h1>Copied to Clipboard</h1>}
      </div>

    </section>,
    portalElement
  );
};

export default PopupContent;
