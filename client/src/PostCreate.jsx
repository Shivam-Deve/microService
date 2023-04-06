import React, { useState } from 'react';
import axios from 'axios'


function PostCreate() {
    const [title, setTitle] = useState('');
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:4000/posts', {
                title
            })
        } catch (error) {
            console.log(error);
        } finally {
            setTitle('');
        }
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="">Title</label>
                    <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default PostCreate