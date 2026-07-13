/**
 * Blocking theme-init script.
 *
 * Rendered in <head> so it runs *before* first paint, applying the persisted
 * theme (or the dark default) to <html> to avoid a flash of the wrong theme.
 * The dark theme is the brand's primary, so it is the default when no explicit
 * "light" preference has been stored.
 *
 * SECURITY NOTE: `__html` below is a build-time constant string literal — it
 * contains no user, network, or runtime input, so there is no XSS surface.
 * This is the same technique `next-themes` uses to prevent theme flashing.
 */
const THEME_INIT_SCRIPT =
  "(function(){try{var t=localStorage.getItem('theme');var d=document.documentElement;if(t==='light'){d.classList.remove('dark')}else{d.classList.add('dark')}}catch(e){}})();";

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />;
}
