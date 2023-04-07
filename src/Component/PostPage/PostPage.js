import React, { useContext } from 'react';
import { FaArrowLeft, FaRegEdit, FaTrash } from 'react-icons/fa';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import { toast } from 'react-hot-toast';

const PostPage = () => {
    const blog = useLoaderData()
    const {user, users} = useContext(AuthContext)
    // console.log(blog)
    const { title, imgURL, time, name, photoURL, content, _id } = blog;

    const blogUser = users.find(bloguser=> bloguser?.email === user?.email)
    // console.log(blogUser)

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    }

    const deleteBlog = (id)=>{
        fetch(`https://blog-server-jade.vercel.app/blog/${id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            },
           
        }).then(res=> res.json())
        .then(data=> {
            // console.log(data)
            if(data.acknowledged){
                toast.success('Blog is Deleted')
            }
        })
    }
    return (
        <div className='w-2/3 mx-auto'>
            <div className="card w-full bg-base-100 shadow-xl">
                <figure><img className='w-full h-96' src={imgURL} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{title}</h2>
                    <p>{getText(content)}</p>
                    <div className="card-actions flex justify-between items-center">
                        <div className='flex justify-center items-center gap-2'>
                            <img className='w-12 h-12 rounded-full' src={photoURL} alt='' />
                            <div>
                                <h3 className='text-xl'>{name}</h3>
                                <p>{time}</p>
                            </div>
                        </div>
                        <div>
                            {
                                ((blogUser?.role === "Author" && blog?.email === user?.email) || blogUser?.role === "Admin") ? 
                                <><Link to={`/edit/${_id}`}><button className="btn btn-accent rounded-sm text-white"><FaRegEdit className='text-lg' /></button></Link>
                                <Link to='/'><button onClick={()=> deleteBlog(_id)} className="btn btn-accent rounded-sm text-white ml-3"><FaTrash className='text-lg' /></button></Link></>
                                : <></>
                            }
                        </div>
                       
                    </div>
                    <Link to='/' className=''><FaArrowLeft className='text-2xl'/></Link>
                </div>
            </div>
        </div>
    );
};

export default PostPage;