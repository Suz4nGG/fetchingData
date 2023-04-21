import { useState, useEffect } from 'react'

export function useFetchController (url) {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [controller, setController] = useState(null)

  useEffect(() => {
    const abortController = new AbortController()
    console.log('Abort Controller', abortController)
    setController(abortController)

    fetch(url)
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => {
        if (error.name === 'AbortError') {
          console.log('Cancelled request')
        } else {
          setError(error)
        }
      })
      .finally(() => setIsLoading(true))
    return () => abortController.abort()
  }, [])
  const handleCancelRequest = () => {
    if (controller) {
      controller.abort()
      setError('Cancelled Request')
    }
  }
  return { data, isLoading, error, handleCancelRequest }
}
