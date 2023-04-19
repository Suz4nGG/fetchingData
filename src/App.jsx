import './App.css'
import { API_URL } from './constants'
import { useFetch } from './hooks/useFetch'

function App () {
  const { data } = useFetch(API_URL)
  console.log(data)
  return (
    <div div className='App'>
      {
        !data
          ? 'url'
          : data.map(item => (
            <div key={item.id}>
              * {item.title}
            </div>
          ))
      }
    </div>
  )
}

export default App
