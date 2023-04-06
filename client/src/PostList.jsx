import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';
function PostList() {
    const [posts, setPosts] = useState({});
    const fetchPost = async () => {
        try {
            const res = await axios.get('http://localhost:7000/posts');
            setPosts(res.data);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchPost()
    }, [])
    return (
        <div className='d-flex flex-row flex-wrap justify-content-betwwen'>
            {
                Object.values(posts).map(post => (
                    <div className="card" key={post.id} style={{ width: '30%', marginBottom: '20px' }}>
                        <div className="card-header">
                            <h3>{post.title}</h3>
                        </div>
                        <div className="card-body">
                            <CommentList comments={post.comments} />
                        </div>
                        <div className="card-footer">
                            <CommentCreate postId={post.id} />
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default PostList