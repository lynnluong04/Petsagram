import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const SearchBar = () => {
    const [searchResults, setSearchResults] = useState([])
    const [users, setUsers] = useState([]);
    const [searchDrop, setSearchDrop] = useState(false)
    const [searchInput, setSearchInput] = useState('')
    let searchValues = [];

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
        }
        fetchData();

    }, []);


    const searchForResults = (e) => {
        setSearchInput(e.target.value)
        searchValues = users?.filter(user => {
            if (user.name.toLowerCase().includes(e.target.value.toLowerCase()) || user.username.toLowerCase().includes(e.target.value.toLowerCase()))
                return true
        })
        setSearchResults(searchValues)
        if (searchResults && e.target.value) {
            setSearchDrop(true)
        } else {
            setSearchDrop(false)
        }
    }

    const closeDropdown = () => {
        setSearchDrop(false);
    }




    return (
        <div>
            <div className="search">
                <svg aria-label="Search" className="_ab6-" color="#8e8e8e" fill="#8e8e8e" height="16" role="img" viewBox="0 0 24 24" width="16"><path d="M19 10.5A8.5 8.5 0 1110.5 2a8.5 8.5 0 018.5 8.5z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="16.511" x2="22" y1="16.511" y2="22"></line></svg>
                    <input onChange={searchForResults} value={searchInput} className="search" id={"search-input"}type="text" placeholder="Search" >
                    </input>
            </div>

            {searchDrop && (
                <div className="results-container">
                    {searchResults && searchResults.map(user => {
                        <Link to={`/${user.id}`}> {user.username} </Link>
                    })}
                </div>
            )}
        </div>
    )
}

export default SearchBar;
