import { Fragment } from "react";

// Renders a translated string, painting any [[bracketed]] fragment with the
// brand gradient. Keeping the accent inside the string lets each language put
// it on the part of the sentence that actually carries the meaning.
export default function Highlight({ text }: { text: string }) {
  const parts = text.split(/\[\[(.+?)\]\]/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="grad-text">
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
