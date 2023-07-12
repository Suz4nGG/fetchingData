const getSuspender = (promise) => {
  let status = 'pending'
  let response

  const suspender = promise.then(
    (result) => {
      status = 'success'
      response = result
    },
    (error) => {
      status = 'error'
      response = error
    }
  )
  const read = () => {
    switch (status) {
      case 'pending':
        throw suspender
      case 'error':
        throw response
      default:
        return response
    }
  }
  return { read }
}

export function fetchData (url) {
  const promise = fetch(url)
    .then((response) => response.json())
    .then(json => json)
  return getSuspender(promise)
}
