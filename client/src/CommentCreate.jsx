import React, { useState } from 'react';
import axios from 'axios'


function CommentCreate({ postId }) {
    const [comment, setComment] = useState('');
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:5000/posts/${postId}/comments`, {
                content: comment
            })
        } catch (error) {
            console.log(error);
        } finally {
            setComment('');
        }
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="">New Comment</label>
                    <input type="text" className="form-control" value={comment} onChange={e => setComment(e.target.value)} />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default CommentCreate