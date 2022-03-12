import React, { useEffect, useState } from "react"
import "../../assets/css/Modal.css"
import { useSelector } from 'react-redux';
import { selectConnectedUser } from '../../Redux/slices/sessionSlice';
import { queryApi } from "../../utils/queryApi"
import { chnageConenctedUser } from '../../Redux/slices/sessionSlice';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { chnageConenctedUserImage } from '../../Redux/slices/sessionSlice';
export default function UpdateUser({ closeModal }) {
    const [uploadImage, setUploadImage] = useState({
        image: ""
    })
    const onChangeFile = (e) => {
        setUploadImage({ ...uploadImage, image: e.target.files[0] })
        //updateImage()
    }
    /*const updateImage = async () => {
        console.log("entered")
        const [result, err] = await queryApi('user/uploadPicture/' + connectedUser.id, uploadImage, "PUT", true, connectedUser.token)
        dispatch(chnageConenctedUserImage(result))
        setUploadImage({ ...uploadImage, image: "" })
    }*/
    /*useEffect(() => {
        if (uploadImage.image != "") {
            updateImage()
        }
    }, [uploadImage.image])*/
    const dispatch = useDispatch();
    var connectedUser = useSelector(selectConnectedUser);
    const [formErrors, setFormErrors] = useState({})
    const [birthdate, setBirthdate] = useState(new Date(connectedUser.birthDate))

    const [formData, setFormData] = useState({
        id: connectedUser.id,
        name: connectedUser.name,
        lastname: connectedUser.lastName,
        birthDate: birthdate,
        phone: connectedUser.phone,

    })

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })

    }

    const onSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formData))

    }

    const validate = (values) => {
        const errors = {};
        let err = false;
        if (!values.name) {
            errors.name = "Name is required";
            err = true;
        }
        if (!values.lastname) {
            errors.lastname = "Last Name is required";
            err = true;
        }
        if (!values.birthDate) {
            errors.birthDate = "Birthdate is required";
            err = true;
        }
        if (!values.phone) {
            errors.phone = "Phone Number is required";
            err = true;
        }
        if (err) {
            console.log("error")
        } else {
            console.log("sent")
            updateUser()
        }
        return errors;
    }
    const updateUser = async () => {

        if (uploadImage.image != "") {
            const [, err] = await queryApi('user/uploadPicture/' + connectedUser.id, uploadImage, "PUT", true, connectedUser.token)
        }
        const [result, err2] = await queryApi('user/update', formData, "PUT", false, connectedUser.token)
        if (!err2) {
            let userResult = { id: result._id, email: result.email, type: result.typeUser, name: result.name, lastName: result.lastName, phone: result.phone, birthDate: result.birthDate, image: result.image, token: result.token }
            dispatch(chnageConenctedUser(userResult))
            closeModal(false)
        }
    }
    return (

        <div className="modalBackground ">
            <div className="modalContainer col-sm-10 offset-md-1 my-5">
                <div className="title">
                    <h1>Profile Update</h1>
                </div>
                <div className="body row">
                    <div className="col-md-6">
                        <form class="w-75 mx-auto" onSubmit={onSubmit}>
                            <div class="form-group">
                                <label for="name" style={{ float: "left" }}><h5>Name : </h5></label>
                                <input type="text" class="form-control" id="name" name="name" placeholder="Enter Name" value={formData.name} onChange={(e) => onChange(e)} />
                            </div>
                            <h5 style={{ color: "red" }}>{formErrors.name}</h5>

                            <div class="form-group">
                                <label for="name" style={{ float: "left" }}><h5>Last Name : </h5></label>
                                <input type="text" class="form-control" id="lname" name="lastname" placeholder="Enter Last Name" value={formData.lastname} onChange={(e) => onChange(e)} />
                            </div>
                            <h5 style={{ color: "red" }}>{formErrors.lastname}</h5>

                            <div class="form-group">
                                <label for="name" style={{ float: "left" }}><h5>Birth Date : </h5></label>
                                <input type="date" class="form-control" id="bdate" name="birthDate" value={formData.birthDate} onChange={(e) => onChange(e)} />
                            </div>
                            <h5 style={{ color: "red" }}>{formErrors.birthDate}</h5>

                            <div class="form-group">
                                <label for="name" style={{ float: "left" }}><h5>Phone : </h5></label>
                                <input type="text" class="form-control" id="phone" name="phone" placeholder="Enter Phone Number" value={formData.phone} onChange={(e) => onChange(e)} />
                            </div>
                            <h5 style={{ color: "red" }}>{formErrors.phone}</h5>


                            <div className="mt-5">
                                <button onClick={() => closeModal(false)} className="btn get-started-btn" id="cancelBtn">Cancel</button>
                                <button type="submit" className="btn get-started-btn" >Submit</button>
                            </div>

                        </form >
                    </div>

                    <div className="col-md-6">
                        <div className="d-flex flex-column align-items-center text-center">
                            <div>
                                <img src={require('../../assets/uploads/user/' + connectedUser.image)} alt="Admin" className="rounded-circle"
                                    width="200" />
                                <input type="file" id="profilepicture" name='image' onChange={(e) => onChangeFile(e)} />
                                <label for="profilepicture" id="uploadPhotoBtn"><FontAwesomeIcon icon={faImage}></FontAwesomeIcon></label>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    );
}