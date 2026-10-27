import React from 'react';

// The site grid as faint blue lines: five on desktop, four on phones, evenly spaced on the same
// span as every section's content, with a short glow running down each line at its
// own pace. Drop it first inside any section that is position:relative and isolated.
export default function GridLines() {
  return (
    <div className="grid-lines" aria-hidden="true">
      {Array.from({ length: 5 }, (_, k) => <i key={k} style={{ '--k': k }} />)}
    </div>
  );
}
