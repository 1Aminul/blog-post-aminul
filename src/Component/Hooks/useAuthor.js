import React, { useEffect, useState } from 'react';

const useAuthor = (email) => {
    const [isAuthor, setIsAuthor] = useState("")
    const [isAuthorLoading, setIsAuthorLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/user/${email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setIsAuthor(data?.role);
                    setIsAuthorLoading(false);
                })
        }
    }, [email, setIsAuthor])
    return [isAuthor, isAuthorLoading]
};

export default useAuthor;