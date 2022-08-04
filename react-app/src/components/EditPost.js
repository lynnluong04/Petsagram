import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkEditPost } from "../store/post";

const EditPostForm = () => {
    const dispatch = useDispatch();

    const [editCaption, setEditCaption] = useState()

}
