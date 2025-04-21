import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { blogSchema } from '../../../schemas/blogSchema';
import { useUser } from '../../../context';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';

const CreateOrUpdateBlog = () => {
    const { createBlog, updateBlog, blogs } = useUser();
    const { id } = useParams();

    const TINYMCE_API_KEY = import.meta.env.VITE_APP_TINYMCE_API_KEY;

    const isValidMongoId = (value) => /^[a-f\d]{24}$/i.test(value);
    const blogId = isValidMongoId(id) ? id : null;

    const { values, errors, touched, handleChange, handleBlur, handleSubmit, handleReset, setFieldValue, setValues } = useFormik({
        initialValues: {
            title: '',
            content: '',
            photo: ''
        },
        validationSchema: blogSchema,
        onSubmit: async (values) => {
            const res = blogId
                ? await updateBlog(values, blogId)
                : await createBlog(values);

            if (res.success) {
                handleReset
                toast.success(`Blog ${blogId ? 'updated' : 'created'} successfully!`);
            } else {
                toast.error(`Error ${blogId ? 'updating' : 'creating'} blog!`);
            }
        }
    });

    useEffect(() => {
        const fetchBlogData = async () => {
            if (!blogId) return;

            const blog = blogs.find((b) => b._id === blogId);
            if (blog) {
                try {
                    const response = await fetch(blog.photoPath);
                    const blob = await response.blob();
                    const filename = blog.photoPath.split('/').pop() || 'image.jpg';
                    const file = new File([blob], filename, { type: blob.type });

                    setValues({
                        title: blog.title || '',
                        content: blog.content || '',
                        photo: file
                    });
                } catch (error) {
                    console.error("Error loading image:", error);
                }
            }
        };

        fetchBlogData();
    }, [blogId, blogs, setValues]);

    return (
        <form onSubmit={handleSubmit} className='w-full max-w-2xl px-4 sm:px-6 lg:px-8 mx-auto flex flex-col justify-center items-center gap-5'>
            <div className='w-full flex flex-col justify-center items-center gap-2'>
                <h1 className='text-xl sm:text-2xl text-green-500 font-bold text-center'>
                    {blogId ? 'Update Blog' : 'Add New Blog'}
                </h1>
                <hr className='w-full border-green-500' />
            </div>

            <input
                type="text"
                id="title"
                name="title"
                placeholder="Title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                className='w-full p-2 rounded-md shadow-md bg-white text-gray-500 placeholder:text-gray-500 outline-0'
            />
            {errors.title && touched.title && (
                <p className='text-center text-red-500'>{errors.title}</p>
            )}

            <div className="w-full">
                <Editor
                    apiKey={TINYMCE_API_KEY}
                    value={values.content}
                    init={{
                        height: 300,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar:
                            'undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help'
                    }}
                    onEditorChange={(content) => setFieldValue('content', content)}
                    onBlur={handleBlur}
                />
                {errors.content && touched.content && (
                    <p className='text-center text-red-500 mt-2'>{errors.content}</p>
                )}
            </div>

            <input
                type="file"
                id="photo"
                accept="image/jpg, image/png, image/jpeg"
                name="photo"
                onChange={(event) => setFieldValue('photo', event.currentTarget.files[0])}
                onBlur={handleBlur}
                className='w-full p-2 rounded-md shadow-md bg-white text-gray-500 outline-0'
            />
            {errors.photo && touched.photo && (
                <p className='text-center text-red-500'>{errors.photo}</p>
            )}

            <button
                type="submit"
                className='w-full p-2 bg-green-500 hover:bg-green-600 transition-all duration-300 text-white font-bold rounded-md'
            >
                {blogId ? 'Update Blog' : 'Create Blog'}
            </button>
        </form>
    );
};

export default CreateOrUpdateBlog;
