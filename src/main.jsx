import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import ErrorBoundary from './components/common/ErrorBoundary.jsx'
import './index.css'
import App from './App.jsx'

/**
 * Hydrate if the page was prerendered (every route gets a static
 * dist/{route}/index.html via scripts/prerender.mjs at build time);
 * otherwise create-and-render (dev mode, or any route that wasn't
 * prerendered for some reason).
 *
 * Detection: the prerendered HTML contains real React-rendered content
 * inside #root. The dev/SPA-fallback shell ships an empty #root. If
 * #root has any children, we hydrate.
 *
 * onRecoverableError swallows non-fatal hydration mismatches so users
 * never see a console error. A mismatch will still trigger a fresh
 * render, just without the noisy warning. Production-only — dev mode
 * keeps the warnings so we can fix them.
 */
const root = document.getElementById('root');
const tree = (
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);

if (root.hasChildNodes()) {
  hydrateRoot(root, tree, {
    onRecoverableError: import.meta.env.DEV
      ? undefined // Keep dev warnings visible
      : () => {}, // Suppress in production
  });
} else {
  createRoot(root).render(tree);
}
