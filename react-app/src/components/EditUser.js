import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkEditUser, thunkLoadUsers, uploadProfilePhoto } from "../store/user";
import { Modal } from "../context/Modal";


const EditUserForm = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const numberId = Number(userId)
  const sessionUser = useSelector(state => state.session.user);
  const user = useSelector(state => state.user[numberId])

  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState(sessionUser.username);
  const [name, setName] = useState(sessionUser.name);
  const [email, setEmail] = useState(sessionUser.email);
  const [bio, setBio] = useState(sessionUser.bio);
  const [image, setImage] = useState(null)


  const updateUsername = (e) => {
    setUsername(e.target.value);
  };
  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };
  const updateBio = (e) => {
    setBio(e.target.value);
  };

  useEffect(() => {
    dispatch(thunkLoadUsers())
  }, [dispatch])

  const onSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id: sessionUser.id,
      name: name,
      username: username,
      email: email,
      bio: bio
    }

    console.log("PAYLOAD FROM EDIT USER", payload)
    const editedUser = await dispatch(thunkEditUser(payload))

    const formData = new FormData();
    formData.append("image", image);
    await dispatch(uploadProfilePhoto(formData))

    if (editedUser) {
      setErrors(editedUser)
    }

  }



  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);

}

  if (user) {
    return (
      <div>
        <form onSubmit={onSubmit} >
          <div className='edit-user error-container'>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>

          <div>{user.username}</div>
          <img src={user.photo_url} />
          <label className='upload'>
            Change your profile photo
            <input className='upload' type="file" accept="image/*" onChange={updateImage} />
          </label>

          <label>Name
            <input
              type='text' placeholder='Full Name'
              className='edit-profile' name='name'
              onChange={updateName} value={name}>
            </input>
          </label>

          <label> Username
            <input
              className='edit-profile' placeholder='Username'
              type='text' name='username'
              onChange={updateUsername} value={username}>
            </input>
          </label>

          <label>Bio
            <textarea
              name='bio' value={bio}
              onChange={updateBio}>
            </textarea>
          </label>

          <label>Email
            <input
              type='text' placeholder='Email'
              className='edit-profile' name='email'
              onChange={updateEmail} value={email}>
            </input>
          </label>

          <button>Submit</button>
        </form>
      </div>
    )
  } else {
    return (
      <div>Loading...</div>
    )
  }
}


export default EditUserForm;
