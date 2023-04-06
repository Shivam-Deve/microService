import React from 'react'
function CommentList({ comments }) {

    return (
        <div className='d-flex flex-row flex-wrap justify-content-betwwen'>
            {
                comments.map(comment => (
                    <li key={comment.id}>{comment.content}</li>
                ))
            }
        </div>
    )
}

export default CommentList