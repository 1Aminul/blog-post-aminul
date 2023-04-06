import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import BlogCard from './BlogCard';
import Pagination from '../Pagination/Pagination';

const Home = () => {
    const [search, setSearch] = useState("")
    // const [post, setPost] = useState(blogs)
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(6);
    const { data: blogs = [] } = useQuery({
        queryKey: ["blogs"],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/blog`)
            const data = await res.json()
            return data;
        }
    })
    if (!blogs.length) {
        return <><p>Loading</p></>
    }

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = blogs.slice(firstPostIndex, lastPostIndex);

    console.log(currentPosts)







    console.log(blogs)
    return (
        <div className='text-center'>
            <h1 className='text-center text-5xl text-accent font-extrabold'>This is Blog Website</h1>
            <div className="form-control w-1/2 mx-auto mt-10">
                <div className="input-group">
                    <input type="text" placeholder="Search…" onChange={(e) => setSearch(e.target.value)} className="input input-bordered w-96" />
                    <button className="btn btn-square">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                </div>
            </div>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-20'>
                {
                    currentPosts.filter((val) => {
                        if (search === "") {
                            return val;
                        } else if (val?.title.toLowerCase().includes(search.toLowerCase())) {
                            return val;
                        }
                    }).map(blog => <BlogCard

                        key={blog._id}
                        blog={blog}

                    />)
                }
            </div>

            <div className='mt-4'>
                <Pagination
                    totalPosts={blogs.length}
                    postsPerPage={postsPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
            </div>
        </div>
    );
};

export default Home;