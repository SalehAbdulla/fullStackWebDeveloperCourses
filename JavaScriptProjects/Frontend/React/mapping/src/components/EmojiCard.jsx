import React from "react";
import "../public/styles.css";

function EmojiCard(prop) {
  return (
    <div>

      <h1>
        <span>emojipedia</span>
      </h1>

      <dl className="dictionary">

        <div className="term">
          <dt>
            <span className="emoji" role="img" aria-label="Tense Biceps">
              {prop.emoji}
            </span>
            <span>{prop.name}</span>
          </dt>
          <dd>
            {prop.meaning}
          </dd>
        </div>

      </dl>
    </div>
  );
}

export default EmojiCard;
