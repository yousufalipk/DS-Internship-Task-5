import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext(createContext);

export const useUser = () => useContext(UserContext);

export const UserProvider = (props) => {
    const [isAuth, setAuth] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [fetching, setFetching] = useState();
    const [viewBlog, setViewBlog] = useState();

    const apiUrl = import.meta.env.VITE_APP_URL;

    const getBase64 = async (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                resolve(reader.result)
            }
            reader.onerror = reject
        })
    }

    useEffect(() => {
        const refreshAuth = async () => {
            try {
                setLoading(true);
                const originalRefreshToken = localStorage.getItem('refereshToken');
                if (originalRefreshToken) {
                    const response = await axios.post(`${apiUrl}/user/referesh`, {
                        originalRefereshToken: originalRefreshToken,
                    });
                    if (response.data.status === 'success') {
                        localStorage.setItem('accessToken', response.data.accessToken);
                        localStorage.setItem('refereshToken', response.data.refershToken);
                        setUser(response.data.user);
                        setAuth(true);
                    } else {
                        return ({ success: false, mess: response.data.message });
                    }
                }
            } catch (error) {
                console.log('Internal Server Error', error);
                return ({ success: false, mess: 'Internal Server Error!' });
            } finally {
                setLoading(false);
            }
        }

        refreshAuth();
    }, [])

    const loginUser = async (values) => {
        try {
            const response = await axios.post(`${apiUrl}/user/login`, {
                email: values.email,
                password: values.password
            });

            if (response.data.status === 'success') {
                setAuth(true);
                setUser(response.data.user);
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refereshToken', response.data.refershToken);
                return ({ success: true, mess: 'Logged In Successfully!' });
            } else {
                return ({ success: false, mess: response.data.message });
            }
        } catch (error) {
            console.log("Internal Server Error", error);
            return ({ success: false, mess: 'Internal Server Error!' })
        }
    }

    const registerUser = async (values) => {
        try {
            const response = await axios.post(`${apiUrl}/user/register`, {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password
            })
            if (response.data.status === 'success') {
                return ({ success: true, mess: 'User registration successful!, Pending Approval!' });
            } else {
                return ({ success: false, mess: response.data.message });
            }
        } catch (error) {
            console.log("Internal Server Error", error);
            return ({ success: false, mess: 'Internal Server Error' });
        }
    }

    const logOutUser = async () => {
        try {
            if (user?._id) {
                const response = await axios.post(`${apiUrl}/user/logout`, {
                    userId: user._id
                });
                if (response.data.status === 'success') {
                    localStorage.setItem('accessToken', '');
                    localStorage.setItem('refereshToken', '');
                    setAuth(false);
                    setUser(response.data.user);
                    return ({ success: true, mess: 'Logged Out Successfully!' });
                } else {
                    return ({ success: false, mess: response.data.message });
                }
            }
        } catch (error) {
            console.log("Internal Server Erorr", error);
            return ({ success: false, mess: 'Internal Server Error' })
        }
    }

    const createBlog = async (values) => {
        try {
            const formData = new FormData();
            formData.append('userId', user._id);
            formData.append('title', values.title);
            formData.append('content', values.content);
            formData.append('photo', values.photo);

            const response = await axios.post(`${apiUrl}/blog/create`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.status === 'success') {
                setBlogs(prevBlogs => [...prevBlogs, response.data.blog])
                return ({ success: true, mess: 'Blog created succesfully!' })
            } else {
                return ({ success: false, mess: 'Error creating blog!' })
            }
        } catch (error) {
            console.log("Internal Server Error", error);
            return ({ success: false, mess: 'Internal Server Error!' })
        }
    }

    const updateBlog = async (values, blogId) => {
        try {
            const formData = new FormData();
            formData.append('userId', user._id);
            formData.append('blogId', blogId);
            formData.append('newBlogTitle', values.title);
            formData.append('newBlogContent', values.content);
            formData.append('photo', values.photo);

            const response = await axios.post(`${apiUrl}/blog/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.status === 'success') {
                setBlogs((prevBlogs) =>
                    prevBlogs.map((blog) =>
                        blog._id === blogId ? { ...blog, ...response.data.newBlog } : blog
                    )
                );
                return ({ success: true, mess: 'Blog updated succesfully!' })
            } else {
                return ({ success: false, mess: 'Error updating blog!' })
            }
        } catch (error) {
            console.log("Internal Server Error", error);
            return ({ success: false, mess: 'Internal Server Error!' })
        }
    }

    const fetchBlogs = async () => {
        setFetching(true);
        try {
            const response = await axios.get(`${apiUrl}/blog/fetch`);
            if (response.data.status === 'success') {
                setBlogs(response.data.blogs);
            } else {
                console.log(response.data.message);
            }
        } catch (error) {
            console.log("Internal Server Error", error)
        } finally {
            setFetching(false);
        }
    }


    return <UserContext.Provider
        value={{
            logOutUser,
            loginUser,
            registerUser,
            createBlog,
            updateBlog,
            setFetching,
            fetchBlogs,
            setBlogs,
            isAuth,
            loading,
            user,
            blogs,
            fetching,
            viewBlog,
            setViewBlog
        }}
    >
        {props.children}
    </UserContext.Provider>
}