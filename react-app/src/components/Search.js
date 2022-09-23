import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const SearchBar = () => {
    const [search, setSearch] = useState([])
    const [users, setUsers] = useState([]);
    const [searchDrop, setSearchDrop] = useState(false)
    const [searchInput, setSearchInput] = useState('')
    let searchValues = [];

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users');
            const responseData = await response.json();
            setUsers(responseData.users);
        }
        fetchData();
    }, []);

    const searchResult = (e) => {
        setSearchInput(e.target.value)
        searchValues = users.filter(user => {
            if (user.full_name.toLowerCase().includes(e.target.value.toLowerCase()) || user.username.toLowerCase().includes(e.target.value.toLowerCase()))
                return true
        })
        setSearch(searchValues)
        if (search && e.target.value) {
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

        </div>
    )
}
