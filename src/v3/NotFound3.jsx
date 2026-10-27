import React from 'react';

/* v3 404 */
export default function NotFound3() {
  return (
    <main className="x-404">
      <div className="x-wrap">
        <span className="x-mono x-404-code">Error 404</span>
        <div className="x-404-n">404</div>
        <h1 className="x-h2">We could not find that page.</h1>
        <p className="x-lead">The page you are looking for may have moved or no longer exists.</p>
        <a href="/" className="x-btn x-btn--dark">Back to home</a>
      </div>
    </main>
  );
}
