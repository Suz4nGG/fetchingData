import { API_URL } from './constants'
// import { useFetch } from './hooks/useFetch'
// import { useFetchController } from './hooks/useFetchController'
import { fetchData } from './hooks/fetchData'
import { Suspense } from 'react'
import './App.css'
const apiData = fetchData(API_URL)

const Placeholder = () => {
  return <div className='placeholder'>Loading...</div>
}

function App () {
  // const APIData = useFetchController(API_URL)
  // const { data, loading, error, handleCancelRequest } = useFetchController(API_URL)
  // const dataRead = APIData.read()
  console.log('APIO', apiData)
  const data = apiData.read()
  return (
    <div className='App'>
      <h1>Fetching Data</h1>
      {/* <button onClick={handleCancelRequest}>Cancel Request</button>
      {error && <li>Error: {error}</li>}
      {loading && <li>Loading...</li>}
      {data && data?.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))} */}
      <Suspense fallback={<Placeholder />}>
        <ul className='card'>
          {data && data?.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      </Suspense>
    </div>
  )
}

export default App
