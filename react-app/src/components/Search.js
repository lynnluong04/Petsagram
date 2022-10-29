import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const SearchBar = () => {
    const [searchResults, setSearchResults] = useState([])
    const [users, setUsers] = useState([]);
    const [searchDrop, setSearchDrop] = useState(false)
    const [searchInput, setSearchInput] = useState('')
    let searchValues = [];

    // console.log("SEARCH RESULTS", searchResults)
    // console.log("SEARCHDROP??", searchDrop)
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
        setSearchResults([])
        setSearchInput("")
    }




    return (
        <div>
            <div className="search">
                <svg aria-label="Search" className="_ab6-" color="#8e8e8e" fill="#8e8e8e" height="16" role="img" viewBox="0 0 24 24" width="16"><path d="M19 10.5A8.5 8.5 0 1110.5 2a8.5 8.5 0 018.5 8.5z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="16.511" x2="22" y1="16.511" y2="22"></line></svg>
                <input onChange={searchForResults} value={searchInput} className="search" id={"search-input"} type="text" placeholder="Search" >
                </input>
                <i onClick={() => closeDropdown()} id={searchDrop ? "search-close" : "hidden-close"} className="fa-sharp fa-solid fa-circle-xmark"></i>
            </div>

            {searchDrop && (
                <div className="results-container">
                    {searchResults && searchResults.map(user => {
                        return (
                            <Link onClick={()=> closeDropdown()} className="search link container" to={`/${user.id}`}>
                                <img className="search icon" src={user.photo_url ? user.photo_url : "https://cdn140.picsart.com/297361716279211.png?to=crop&type=webp&r=1456x1388&q=85"} />
                                <div className="search-names">
                                    <div className="search-username">{user.username} </div>
                                    <div className="search-name">{user.name}</div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default SearchBar;
