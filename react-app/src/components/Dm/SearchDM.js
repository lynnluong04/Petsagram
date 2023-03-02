import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';

import '../css/dm.css'

const SearchDm = ({setRecipient, setShowModal}) => {
    const [searchResults, setSearchResults] = useState([])
    const [users, setUsers] = useState([]);
    const [searchDrop, setSearchDrop] = useState(false)
    const [searchInput, setSearchInput] = useState('')
    const [selectedUser, setSelectedUser] = useState(null)
    let searchValues = [];
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users.filter((user) => user.id !== sessionUser.id));
        }
        fetchData();


    }, []);


    const searchForResults = (e) => {
        setSearchInput(e.target.value)
        searchValues = users?.filter(user => {
            if (user.name.toLowerCase().includes(e.target.value.toLowerCase()) || user.username.toLowerCase().includes(e.target.value.toLowerCase())) {
                return true
            } else {
                return false
            }
        })
        setSearchResults(searchValues)

        if (searchResults && e.target.value) {
            setSearchDrop(true)
        } else {
            setSearchDrop(false)
        }
    }

    const clearSearch = () => {
        setSelectedUser(null)
        setSearchInput('')
        setSearchDrop(null)
        setSearchResults([])
    }

    const clickNext = () => {
        if (selectedUser) {
            setRecipient(selectedUser)
            setSelectedUser(null)
            setSearchInput('')
            setSearchDrop(null)
            setSearchResults([])
            setShowModal(false)
        }
    }




    return (
        <div>
            <div className="search-dm container">
                <div className="search-dm top">
                    <svg aria-label="Close" className="top-left" class="_ab6-" color="rgb(38, 38, 38)" fill="rgb(38, 38, 38)" height="18" role="img" viewBox="0 0 24 24" width="18"><polyline fill="none" points="20.643 3.357 12 12 3.353 20.647" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></polyline><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" x1="20.649" x2="3.354" y1="20.649" y2="3.354"></line></svg>
                    <div className="top-middle">New Message</div>
                    <div className="top-right" onClick={() => clickNext()} >Next</div>
                </div>
                <div className="dm-searchbox">
                    <div className="search-to">To:</div>
                    <input onChange={searchForResults} value={searchInput} className={selectedUser ? "hide" : "search-dm"} id={"search-input"} type="text" placeholder="Search..." >
                    </input>
                    {selectedUser && (
                        <div className="dm-selected-user">
                            <div className="selected-username"> {selectedUser.username} </div>
                            <div onClick={() => clearSearch()}>
                                <svg class="_ab6-" color="rgb(0, 149, 246)" fill="rgb(0, 149, 246)" height="12" role="img" viewBox="0 0 24 24" width="12"><polyline fill="none" points="20.643 3.357 12 12 3.353 20.647" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></polyline><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" x1="20.649" x2="3.354" y1="20.649" y2="3.354"></line></svg>
                            </div>
                        </div>
                    )}
                </div>

                {searchDrop && (
                    <div className="dm-search-results-container">
                        {searchResults && searchResults.map(user => {
                            return (
                                <div onClick={() => {
                                    setSelectedUser(user)
                                    setSearchDrop(null)
                                }} className="dm-search-link-container" >
                                    <img className="dm-search icon" src={user.photo_url ? user.photo_url : "https://cdn140.picsart.com/297361716279211.png?to=crop&type=webp&r=1456x1388&q=85"} alt="search icon" />
                                    <div className="dm search-names">
                                        <div className="search-username">{user.username} </div>
                                        <div className="search-name">{user.name}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>

        </div>
    )
}

export default SearchDm;
