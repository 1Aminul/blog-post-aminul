import JoditEditor from 'jodit-react';
import React, { useContext, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../Context/AuthProvider';
import { useLoaderData } from 'react-router-dom';

const CreatePost = () => {
    const blog = useLoaderData()
    console.log(blog)

    const { user, users } = useContext(AuthContext)
    const editor = useRef(null);
    const [title, setTitle] = useState(blog?.title ? blog?.title : "")
    const [file, setFile] = useState(null)
    const [select, setSelect] = useState(blog?.category ? blog?.category : "")
    const [content, setContent] = useState(blog?.content ? blog?.content : "");

    console.log(title, file, select)

    const config = {
        placeholder: 'start typing.....'
    }
    const userAuthor = users.find(author => author?.email === user?.email)
    console.log(userAuthor)


    const now = new Date();
    const date = now.getDate()
    const withPmAm = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    });
    const nameOfMonthUS = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
        new Date(),
    );

    let time = `${date} ${nameOfMonthUS} ${withPmAm}`

    console.log(time)



    const handlerCreateBlog = () => {
        // e.preventDefault()
        const formData = new FormData();
        formData.append('image', file)
        const imghostkey = process.env.REACT_APP_image_apiKey

        fetch(`https://api.imgbb.com/1/upload?key=${imghostkey}`, {
            method: "POST",
            body: formData,
        })
            .then(res => res.json())
            .then(datas => {
                console.log(datas.data.url)
                const blog = {
                    title,
                    imgURL: datas.data.url,
                    category: select,
                    name: user?.displayName,
                    email: user?.email,
                    photoURL: user?.photoURL,
                    content,
                    time

                }
                fetch(`http://localhost:5000/blog`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(blog)
                }).then(res => res.json())
                    .then(data => {
                        if (data.acknowledged) {
                            toast.success('Your user create successfully')
                        }
                    })
            })

    }
    const updateBlogPost = (id) => {
        const updatedBlog= {
            title,
            category: select,
            content,
            time
        }
        fetch(`http://localhost:5000/blog/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(updatedBlog)
        }).then(res=> res.json())
        .then(data=> {
            console.log(data)
            if(data.acknowledged){
                toast.success('Blog is updated')
            }
        })
    }
    return (
        <div>
            {
                (userAuthor?.role === "Author" || userAuthor?.role === "Admin") ?
                    <>
                        <h1 className='text-4xl font-medium text-accent text-center my-5'>Create Your Blog Post</h1>
                        <div className='border-2 p-4'>
                            <input type='text' onChange={(e)=> setTitle(e.target.value)} value={title} className='input input-bordered w-full' placeholder='Title' />
                            <div className='mt-7'>
                                <JoditEditor
                                    ref={editor}
                                    value={content}
                                    config={config}
                                    onBlur={newContent => setContent(newContent)}
                                />
                            </div>
                            <div className='flex justify-between items-center gap-10'>
                                <div className='w-1/2'>
                                    <label className="label">
                                        <span className="label-text">Image</span>
                                    </label>
                                    <input type='file' onChange={(e)=> setFile(e.target.files[0])} className='file-input file-input-bordered file-input-accent w-full ' />
                                </div>
                                <div className='w-1/2'>
                                    <label className="label">
                                        <span className="label-text">Select Category</span>
                                    </label>
                                    <select onChange={(e)=> setSelect(e.target.value)} value={select} className="select select-bordered w-full">
                                        <option>Web Design</option>
                                        <option>Web Devlopment</option>
                                        <option>JavaScript</option>
                                        <option>HTML</option>
                                        <option>CSS</option>
                                        <option>React.js</option>
                                        <option>Node.js</option>

                                    </select>
                                </div>

                            </div>
                            {
                                blog?._id ?
                        
                                <button onClick={()=>updateBlogPost(blog?._id)} className='w-full bg-accent rounded py-3 mt-6 text-white cursor-pointer'>Update</button>
                                :
                                <button onClick={handlerCreateBlog} className='w-full bg-accent rounded py-3 mt-6 text-white cursor-pointer'>Create Post</button>
                    }
                        </div>
                    </> :
                    <p>you can not write any post</p>

            }

        </div>
    );
};

export default CreatePost;