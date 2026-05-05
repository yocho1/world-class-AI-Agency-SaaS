## Lighthouse Findings (Desktop & Mobile)

Summary of the automated Lighthouse runs saved in `lighthouse.html` (desktop) and `lighthouse-mobile.html` (mobile).

Top actionable items (prioritized):

- **Reduce unused CSS**: Significant unused styles increase CSS payload and parsing cost. Audit Tailwind usage and remove unused utility bundles or enable purge/unused removal in the build pipeline.
- **Reduce unused JavaScript / duplicate modules**: Split bundles, remove duplicate/shared modules, and adopt dynamic imports for non‑critical code.
- **Preload LCP image**: Identify the Largest Contentful Paint image and add a `link rel="preload" as="image"` for it.
- **Serve images in next‑gen formats & properly size**: Convert heavy images to WebP/AVIF and ensure `width`/`height` and responsive `srcset` are used.
- **Eliminate render‑blocking resources**: Defer non-critical CSS/JS and inline minimal critical CSS for above-the-fold content.
- **Enable text compression & cache policy**: Ensure server and assets use gzip/ brotli and long cache TTLs for static assets.
- **Minimize main-thread work**: Reduce heavy JS, defer long tasks, and audit third-party scripts.

Next steps I can take (pick any):

- Create a PR with focused changes for: CSS purge + updating image formats.
- Add `preload` for the LCP image and test impact.
- Split out non-critical JS with dynamic imports and test build size.
- Run deeper accessibility checks (axe) and create an a11y issue list.

Artifacts:

- Desktop report: `lighthouse.html`
- Mobile report: `lighthouse-mobile.html`

If you want, I will open a PR with these artifacts and the recommended fixes applied incrementally. Otherwise tell me which items to prioritize.

— Automated report generated on host
