import { useState, useEffect } from 'react'

let cache = null

export function useSiteData() {
  const [data, setData] = useState(cache)
  const [loading, setLoading] = useState(!cache)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (cache) return
    fetch('/site.json')
      .then(r => r.json())
      .then(json => { cache = json; setData(json); setLoading(false) })
      .catch(err => { setError(err); setLoading(false) })
  }, [])

  return { data, loading, error }
}
