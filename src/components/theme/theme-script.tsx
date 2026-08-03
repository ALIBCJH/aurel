/**
 * Blocking init script.
 *
 * Rendered in <head> so it runs *before* first paint. It does two things:
 *
 *  1. Applies the persisted theme. Light is the house default and the designed
 *     state; only an explicit stored preference of "dark" opts in.
 *  2. Marks <html> with `js`. Every entrance animation in globals.css is
 *     scoped to `.js [data-reveal]`, so without JavaScript the page renders
 *     fully composed and legible instead of waiting on an observer that will
 *     never run. Setting it here — pre-paint — means no flash of hidden copy.
 *
 * SECURITY NOTE: `__html` below is a build-time constant string literal — it
 * contains no user, network, or runtime input, so there is no XSS surface.
 * This is the same technique `next-themes` uses to prevent theme flashing.
 */
const THEME_INIT_SCRIPT =
  "(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('theme');if(t==='dark'){d.classList.add('dark')}else{d.classList.remove('dark')}}catch(e){}})();";

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />;
}
