import { useState, useEffect, useRef, useCallback } from 'react'
import debounce from 'just-debounce-it'
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies'
import './App.css'

function useSearch() {
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  const isInitialSearch = useRef(true)

  useEffect(() => {
    if (isInitialSearch.current) {
      isInitialSearch.current = (search === '')
      return
    }
    if (search.trim() === '') {
      setError('It is not possible to search for an empty movie')
      return
    }
    if (search.match(/^\d+$/)) {
      setError('It is not possible search a movie by number')
      return
    }
    if (search.length < 3) {
      setError('Search must have at least 3 characters')
      return
    }

    setError(null)
  }, [search])

  return { search, setSearch, error}
}

function App() {
  const [sort, setSort] = useState(false)
  const { search, setSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(
    debounce(search => {
      console.log(search, 'search');
      getMovies({ search })
    }, 300)
  , [getMovies]
  )

  const handleSort = () => {
    setSort(!sort)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // JS way
    // const fields = Object.fromEntries(new window.FormData(event.target))
    // console.log(fields); // => {movie:matrix}
    getMovies({ search })
    
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    setSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  return (
    <div className='page'>
      <header>
        <h1>Movie finder</h1>
        <form className='form' onSubmit={handleSubmit}>
          <label htmlFor="query">Enter the movie to search</label>
          <input onChange={handleChange} value={search} type="text" name="query" id="query" placeholder='Avengers, Oppenheimer, Batman...' />
          <input type="checkbox" onChange={handleSort} checked={sort} name="sortMovies" id="sortMovies" />
          <button type='submit'>Search</button>
        </form>
        { error && <p style={{ color:'red' }}> {error} </p>}
      </header>
      <main>
        {
          loading ? <p>Loading...</p> : <Movies movies={movies} />
        }
      </main>
    </div>
  )
}

export default App
