import { useCatFact } from './hooks/useCatFact'
import { useCatImage } from './hooks/useCatImages'
import './App.css'

export function App() {
    const { fact, refreshFact } = useCatFact()
    const imageUrl = useCatImage({ fact })

    const handleClick = async() => {
        refreshFact()
    }

    return (
        <main>
            <button onClick={handleClick}>Get New Fact</button>
            <h1>Export de mininos</h1>
            {fact && <p>{fact}</p>}
            {imageUrl && <img src={`${imageUrl}`} alt={`Image extracted using the first three words for ${fact}`} />}
        </main>
    )
}
