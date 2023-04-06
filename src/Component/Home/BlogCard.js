import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
    console.log(blog)
    const { title, imgURL, time, name, photoURL, content, category, _id } = blog;
   

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    }
    return (
        <div className="card w-88 bg-base-100 shadow-xl">
            <figure><img className='w-full h-48' src={imgURL} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p className='text-justify'>{getText(content).slice(0, 200)}....</p>
                <div className="card-actions flex justify-between items-center mt-2">
                    <div className='flex justify-center items-center gap-2'>
                        <img className='w-12 h-12 rounded-full' src={photoURL} alt='' />
                        <div>
                            <h3 className='text-md'>{name}</h3>
                            <p className='text-sm'>{time}</p>
                        </div>
                    </div>
                    <Link to={`/postpage/${_id}`}><button className="btn btn-accent rounded-sm text-white">See more</button></Link>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;