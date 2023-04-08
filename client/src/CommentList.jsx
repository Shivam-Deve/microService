import React from 'react'
function CommentList({ comments }) {
    return (
        <div className='d-flex flex-row flex-wrap justify-content-betwwen'>
            {
                comments.map(comment => {
                    const { id, status, content } = comment;
                    if (status === 'approved')
                        return <li style={{ color: 'green' }} key={id}>{content}</li>
                    if (status === 'rejected')
                        return <li style={{ color: 'red' }} key={id}>Comment is rejected</li>
                    return <li key={id}>Comment is pending moderation</li>
                })
            }
        </div>
    )
}

export default CommentList