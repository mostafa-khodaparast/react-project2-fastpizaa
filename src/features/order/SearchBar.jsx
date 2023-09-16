import { useState } from "react"
import { useNavigate } from "react-router-dom"

const SearchBar = () => {
    const [query, setQuery] = useState("")
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        navigate(`/order/${query}`)
        setQuery("")
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search order by ID"
                className="bg-yellow-100 rounded-full text-sm px-3 py-2 w-40 placeholder:text-stone-400
                              transition-all duration-1000 outline-none
                             focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-1"
            />
        </form>
    )
}

export default SearchBar