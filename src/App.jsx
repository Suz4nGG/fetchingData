import { API_URL } from './constants'
import { useFetch } from './hooks/useFetch'
// import { useFetchController } from './hooks/useFetchController'
// import { Suspense } from 'react'

function App () {
  // const APIData = useFetchController(API_URL)
  const { data, loading, error, handleCancelRequest } = useFetch(API_URL)
  // const dataRead = APIData.read()

  return (
    <div className='App'>
      <h1>Fetching Data</h1>
      <button onClick={handleCancelRequest}>Cancel Request</button>
      {error && <li>Error: {error}</li>}
      {loading && <li>Loading...</li>}
      {data && data?.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
      {/* <Suspense fallback={<div>Loading...</div>}>
        <ul className='card'>
          {dataRead?.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      </Suspense> */}
    </div>
  )
}

export default App
