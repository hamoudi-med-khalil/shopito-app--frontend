import React, { useEffect, useState } from 'react'
import './Profile.scss'
import PageMenu from '../../components/pageMenu/PageMenu'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../../components/card/Card'
import Loader from '../../components/loader/Loader'
import { getUser, updatePhoto, updateUser } from '../../redux/features/auth/authSlice'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { shortenText } from '../../utils'


const cloud_name = process.env.REACT_APP_CLOUD_NAME;
const upload_preset = process.env.REACT_APP_UPLOAD_PRESET;
console.log(cloud_name);



const Profile = () => {
    const url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`
    const { isLoading, user } = useSelector((state) => state.auth);


    const initialState = {
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        photo: user?.photo || '',
        role: user?.role || '',
        address: {
            address: user?.address?.address || '',
            state: user?.address?.state || '',
            country: user?.address?.country || '',
        },
    }

    const [profile, setProfile] = useState(initialState);
    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const dispatch = useDispatch()


    useEffect(() => {
        if (user === null) {
            dispatch(getUser())
        }
    }, [dispatch, user])




    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value })
    }


    useEffect(() => {

        if (user) {
            setProfile({
                name: user?.name || '',
                email: user?.email || '',
                phone: user?.phone || '',
                photo: user?.photo || '',
                role: user?.role || '',
                address: {
                    address: user?.address?.address || '',
                    state: user?.address?.state || '',
                    country: user?.address?.country || '',

                },
            })
        }

    }, [user])

    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]))
    }

    const saveProfile = async (e) => {
        e.preventDefault()

        const userData = {
            name: profile.name,
            phone: profile.phone,
            photo: profile.photo,
            address: {
                address: profile.address.address,
                state: profile.address.state,
                country: profile.address.country,
            }
        }
        console.log(userData)
        await dispatch(updateUser(userData))
    }


    const savePhoto = async (e) => {
        e.preventDefault()

        let imageURL;

        try {
            if (
                profileImage !== null &&
                (profileImage.type === 'image/jpeg' || profileImage.type === 'image/png' ||
                    profileImage.type === 'image/jpg')
            ) {
                const image = new FormData()
                image.append('file', profileImage)
                image.append('cloud_name', cloud_name)
                image.append('upload_preset', upload_preset)
                console.log(1)
                const response = await fetch(url,
                    { method: 'post', body: image }, { mode: 'no-cors' })
                console.log(2)
                const imgData = await response.json()
                console.log(imgData)

                imageURL = imgData.url.toString()
            }
            const userData = {
                photo: profileImage ? imageURL : profile.photo
            }
            await dispatch(updatePhoto(userData))
            setImagePreview(null)

        } catch (error) {
            toast.error(error.message)
        }

    }



    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            <section>
                <div className='container'>
                    <PageMenu />
                    <h2> Profile </h2>
                    <div className='--flex-start profile'>
                        <Card cardClass={'card'}>

                            {!isLoading && (
                                <>
                                    <div className='profile-photo'>
                                        <div>
                                            <img src={imagePreview === null ? user?.photo : imagePreview}
                                                alt='profile'
                                            />
                                            <h3>Role {profile.role}</h3>

                                            {imagePreview !== null && (
                                                <div className='--center-all'>
                                                    <button className='--btn --btn-secondary'
                                                        onClick={savePhoto}
                                                    >
                                                        <AiOutlineCloudUpload size={18} />
                                                        Upload Photo
                                                    </button>
                                                </div>
                                            )}

                                        </div>

                                    </div>
                                    <form onSubmit={saveProfile}>
                                        <p>
                                            <label> Change Photo </label>
                                            <input
                                                type='file'
                                                accept='image/*'
                                                name='image'
                                                onChange={handleImageChange}


                                            />
                                        </p>
                                        <p>
                                            <label>Name :</label>
                                            <input
                                                type='text'
                                                placeholder='Name'
                                                value={profile?.name}
                                                name="name"
                                                onChange={handleInputChange}

                                            />
                                        </p>
                                        <p>
                                            <label>Email :</label>
                                            <input
                                                type='email'
                                                placeholder='Email'
                                                value={profile?.email}
                                                name="email"
                                                onChange={handleInputChange}


                                            />
                                        </p>

                                        <p>
                                            <label>Phone :</label>
                                            <input
                                                type='text'
                                                placeholder='Phone'
                                                value={profile?.phone}
                                                name="phone"
                                                onChange={handleInputChange}

                                            />
                                        </p>

                                        <p>
                                            <label>address :</label>
                                            <input
                                                type='text'
                                                placeholder='address'
                                                value={profile?.address?.address}
                                                name="address"
                                                onChange={handleInputChange}

                                            />
                                        </p>
                                        <p>
                                            <label>State :</label>
                                            <input
                                                type='text'
                                                placeholder='State'
                                                value={profile?.address?.state}
                                                name="state"
                                                onChange={handleInputChange}

                                            />
                                        </p>
                                        <p>
                                            <label>Country :</label>
                                            <input
                                                type='text'
                                                placeholder='Country'
                                                value={profile?.address?.country}
                                                name="country"
                                                onChange={handleInputChange}

                                            />
                                        </p>

                                        <button className='--btn --btn-primary  --btn-block'>
                                            Update Profile
                                        </button>

                                    </form>

                                </>
                            )}

                        </Card>

                    </div>
                </div>
            </section>
        </>
    )

};

export const UserName = () => {
    const { user } = useSelector((state) => state.auth)
    const userName = user?.name || '...'

    return (
        <span style={{ color: '#ff7722' }}>Hi {shortenText(userName, 5)}    </span>
    )

}

export default Profile
