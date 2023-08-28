
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/search.css"

const SearchSidebar = () => {

    const [searchResults, setSearchResults] = useState([])
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
        }
        fetchData();


    }, []);

    return (
        <>
            <div className="search-sidebar-container">

            </div>
        </>
    )

}


export default SearchSidebar;
