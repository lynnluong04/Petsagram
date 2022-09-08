import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkEditUser, thunkLoadUsers, uploadProfilePhoto } from "../store/user";


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

    console.log("SETTING FILE TO IMAGE?", image)

  }



  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);

  }

  if (user) {
    return (
      <div>
        <form className="edit-user-container" onSubmit={onSubmit} >
          <div className="edit-user-head">Edit Profile</div>
          <div className='edit-user error-container'>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className="edit-user-upper">
            <img className="edit-user-pic" src={user.photo_url} />
            <div className="edit-user-info">
              <div className="edit-user-username">{user.username}</div>
              <label className='upload-profile-pic'>
                Change profile photo
                <input className='upload-profile-pic' type="file" accept="image/*" onChange={updateImage} />
              </label>
            </div>
          </div>

          <div className="edit-user-inputs">
            <label className='edit-profile'>Name
              <input
                type='text' placeholder='Full Name'
                className='edit-profile' name='name'
                onChange={updateName} value={name}>
              </input>
            </label>

            <label className='edit-profile'> Username
              <input
                className='edit-profile' placeholder='Username'
                type='text' name='username'
                onChange={updateUsername} value={username}>
              </input>
            </label>

            <label className='edit-profile'>Bio
              <textarea
                name='bio' value={bio}
                className='edit-profile'
                onChange={updateBio}>
              </textarea>
            </label>

            <label className='edit-profile'>Email
              <input
                type='text' placeholder='Email'
                className='edit-profile' name='email'
                onChange={updateEmail} value={email}>
              </input>
            </label>
          </div>

          <button className="edit-user">Submit</button>
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
