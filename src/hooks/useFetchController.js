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

/*
! Documentación
* Este código es un hook personalizado de React llamado useFetchController. El propósito de este hook es realizar una solicitud HTTP y gestionar su estado, permitiendo también la cancelación de la solicitud.

* El hook utiliza cuatro estados de React: isLoading, data, error y controller. isLoading indica si la solicitud está actualmente en curso. data almacena los datos devueltos por la solicitud, y error almacena cualquier error que ocurra durante la solicitud. controller es una instancia de AbortController que se utiliza para cancelar la solicitud.

// La función useEffect es donde ocurre la mayor parte del trabajo. Primero, crea una instancia de AbortController y la almacena en el estado controller. Luego, realiza la solicitud HTTP utilizando fetch. Si la solicitud tiene éxito, los datos se almacenan en el estado data. Si hay un error, se comprueba si el tipo de error es AbortError. Si es así, se considera que la solicitud fue cancelada y se imprime un mensaje en la consola. De lo contrario, el error se almacena en el estado error. Finalmente, se establece el estado isLoading en true.

& El hook también define una función llamada handleCancelRequest que se utiliza para cancelar la solicitud HTTP y establecer el estado error en 'Cancelled Request'.

& En resumen, este hook es útil para realizar solicitudes HTTP en React y gestionar su estado, lo que permite la cancelación de la solicitud si es necesario.
*/
