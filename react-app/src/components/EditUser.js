import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { thunkEditUser, thunkLoadUsers } from "../store/user";
import { Modal } from "../context/Modal";
import { uploadProfilePhoto } from "../store/session";


const EditUserForm = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const numberId = Number(userId)
  const sessionUser = useSelector(state => state.session.user);
  const user = useSelector(state => state.user[numberId])
  const history = useHistory()
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState(user?.username);
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [bio, setBio] = useState(user?.bio);
  const [hasSubmitted, setHasSubmitted] = useState(false)
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

    const editedUser = await dispatch(thunkEditUser(payload))

    if (editedUser) {
      setErrors(editedUser)
    } else {
      setHasSubmitted(true)
      history.goBack();
    }
    // setTimeout(()=> {
    //   setHasSubmitted(false)
    // }, 5000)
  }



  const updateImage = async (e) => {

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    await dispatch(uploadProfilePhoto(formData))
    // setImage(file);
  }

  if (user) {
    return (
      <div className="edit-user-container">
        <div className="edit-user-head">Edit Profile</div>
        {hasSubmitted && <div className="success-msg">Profile updated successfully.</div>}
        <div className='edit-user error-container'>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className="edit-user-upper">
          <img className="edit-user-pic" src={sessionUser.photo_url} />
          <div className="edit-user-info">
            <div className="edit-user-username">{user?.username}</div>
            <form>
              <label className='upload-profile-pic'>
                Change profile photo
                <input className='upload-profile-pic' type="file" accept="image/*" onChange={updateImage} />
              </label>
            </form>
          </div>
        </div>

        <form className="edit-user-bottom" onSubmit={onSubmit} >
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
