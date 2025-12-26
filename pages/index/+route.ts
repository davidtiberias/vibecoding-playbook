// pages/index/+route.ts
import type { PageContext } from 'vike/types'

export default function route(pageContext: PageContext) {
  const { urlPathname } = pageContext
  
  // 1. Handle the Root URL '/'
  // We map it to 'workflow-map' so the App component defaults to the workflow view.
  if (urlPathname === '/') {
    return { routeParams: { view: 'workflow-map' } }
  }

  // 2. Define allowed top-level views
  const validViews = [
    'workflow-map', 
    'invariants', 
    'analysis', 
    'strategy', 
    'articles'
  ]
  
  // 3. Extract the view slug (remove leading slash)
  const viewSlug = urlPathname.slice(1)

  // 4. Check if the URL matches one of our valid views
  if (validViews.includes(viewSlug)) {
    return { routeParams: { view: viewSlug } }
  }

  // 5. Return false for everything else (e.g., /articles/some-id)
  // This allows Vike to fall through to the filesystem routes for specific articles.
  return false
}