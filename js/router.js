/**
 * MEUW ACADEMY — router.js
 * Hash-based SPA router
 */

const _routes = new Map();
let _currentRoute = null;
let _beforeEach = null;
let _afterEach = null;
let _notFound = null;

// ============================================
// ROUTE REGISTRATION
// ============================================

/**
 * Register a route handler
 * @param {string} pattern - e.g. '/lesson/:dayId/:moduleId'
 * @param {Function} handler - receives (params, query) => void
 */
function on(pattern, handler) {
  _routes.set(pattern, handler);
}

/**
 * Register global before-navigation hook
 * Return false to cancel navigation
 */
function beforeEach(fn) {
  _beforeEach = fn;
}

/**
 * Register global after-navigation hook
 */
function afterEach(fn) {
  _afterEach = fn;
}

/**
 * Register 404 / not found handler
 */
function notFound(fn) {
  _notFound = fn;
}

// ============================================
// NAVIGATION
// ============================================

/**
 * Navigate to a route (push to history)
 * @param {string} route - e.g. '/lesson/1/m1-math'
 */
function navigate(route) {
  window.location.hash = route;
}

/**
 * Replace current history entry (no back)
 */
function replace(route) {
  const url = new URL(window.location.href);
  url.hash = route;
  window.history.replaceState(null, '', url.toString());
  _dispatch(route);
}

/**
 * Go back in history
 */
function back() {
  window.history.back();
}

/**
 * Get current route string
 */
function currentRoute() {
  return _currentRoute;
}

// ============================================
// INTERNAL DISPATCH
// ============================================

function _parseRoute(hash) {
  // hash = '#/lesson/1/m1-math?foo=bar'
  const raw = hash.startsWith('#') ? hash.slice(1) : hash;
  const [pathPart, queryPart] = raw.split('?');
  const path = pathPart || '/';

  // Parse query string
  const query = {};
  if (queryPart) {
    queryPart.split('&').forEach(part => {
      const [k, v] = part.split('=');
      if (k) query[decodeURIComponent(k)] = decodeURIComponent(v || '');
    });
  }

  return { path, query };
}

function _matchRoute(path, pattern) {
  // Convert pattern like '/lesson/:dayId/:moduleId' to regex
  const params = {};
  const patternParts = pattern.split('/');
  const pathParts = path.split('/');

  if (patternParts.length !== pathParts.length) return null;

  for (let i = 0; i < patternParts.length; i++) {
    const pp = patternParts[i];
    const part = pathParts[i];
    if (pp.startsWith(':')) {
      params[pp.slice(1)] = decodeURIComponent(part);
    } else if (pp !== part) {
      return null;
    }
  }

  return params;
}

function _dispatch(hash) {
  const { path, query } = _parseRoute(hash);
  _currentRoute = path;

  // Run before hook
  if (_beforeEach) {
    const result = _beforeEach(path, query);
    if (result === false) return;
  }

  let matched = false;

  for (const [pattern, handler] of _routes) {
    const params = _matchRoute(path, pattern);
    if (params !== null) {
      matched = true;
      handler(params, query);
      break;
    }
  }

  if (!matched) {
    if (_notFound) {
      _notFound(path, query);
    } else {
      console.warn('[Router] No route matched:', path);
      navigate('/');
    }
  }

  // Run after hook
  if (_afterEach) {
    _afterEach(path, query);
  }

  // Scroll to top on navigation
  window.scrollTo(0, 0);
}

// ============================================
// INITIALIZATION
// ============================================

function init() {
  window.addEventListener('hashchange', () => {
    _dispatch(window.location.hash || '#/');
  });

  // Handle initial load
  const initialHash = window.location.hash || '#/';
  _dispatch(initialHash);
}

// ============================================
// QUERY STRING BUILDER
// ============================================

/**
 * Build a route string with optional query params
 * @example buildRoute('/lesson/1/m1-math', { from: 'dashboard' })
 */
function buildRoute(path, params = {}) {
  const query = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');
  return query ? `${path}?${query}` : path;
}

// ============================================
// EXPORT
// ============================================

export const Router = {
  on,
  beforeEach,
  afterEach,
  notFound,
  navigate,
  replace,
  back,
  currentRoute,
  buildRoute,
  init,
};

export default Router;
