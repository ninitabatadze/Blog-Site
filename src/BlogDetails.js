import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
function BlogDetails() {
    const { id } = useParams();
    const [newsDetails, setNewsDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [submittingComment, setSubmittingComment] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await axios.get(`https://apitest.reachstar.io/blog/get/${id}`);
                if (response.status === 200 && response.data) {
                    setNewsDetails(response.data);
                    setEditedTitle(response.data.title);
                    setEditedDescription(response.data.description);
                    setComments(response.data.comments || []);
                } else {
                    console.error('Invalid data format in the response:', response.data);
                }
            } catch (error) {
                console.error('Error fetching news details:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);
    const handleEditNews = async () => {
        try {
            if (!editedTitle.trim() || !editedDescription.trim()) {
                alert('Please fill in both the title and description.');
                return;
            }
            const updatedNews = {
                title: editedTitle,
                description: editedDescription,
            };
            await axios.put(`https://apitest.reachstar.io/blog/edit/${id}`, updatedNews);

            setIsEditing(false)
            const response = await axios.get(`https://apitest.reachstar.io/blog/get/${id}`);
            if (response.status === 200 && response.data) {
                setNewsDetails(response.data);
                setEditedTitle(response.data.title);
                setEditedDescription(response.data.description);
            }
        } catch (error) {
            console.error('Error editing news:', error);
        }
    };
    const handleCommentSubmit = async () => {
        try {
            setSubmittingComment(true);
            if (!comment.trim()) {
                alert('Please enter a comment.');
                return;
            }
            await axios.post(`https://apitest.reachstar.io/comment/add/${id}`, { comment });
            const response = await axios.get(`https://apitest.reachstar.io/blog/get/${id}`);
            if (response.status === 200 && response.data) {
                setNewsDetails(response.data);
                setComments(response.data.comments || []);
                setComment('');
            }
        } catch (error) {
            console.error('Error submitting comment:', error);
        } finally {
            setSubmittingComment(false);
        }
    };
    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(`https://apitest.reachstar.io/comment/delete/${commentId}`);
            const updatedComments = comments.filter(comment => comment.id !== commentId);
            setComments(updatedComments);
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };
    const handleDeleteNews = async () => {
        try {
            await axios.delete(`https://apitest.reachstar.io/blog/delete/${id}`);
            navigate(`/home/${id}`);
        } catch (error) {
            console.error('Error deleting news:', error);
        }
    };

    return (
        <div className="detDiv p-0">
            <div className="container  Det p-4 mb-4 d-flex justify-content-center flex-column mt-5 px-4">
                <h2 className="text-center h2bord mb-4" style={{ color: '#b226d8', fontWeight: 'bold', fontSize: '24px' }}>
                    {loading ? 'Loading...' : newsDetails.title}
                </h2>
                {loading ? (
                    <p>Loading details...</p>
                ) : (
                    <div className='det-div d-flex justify-content-center flex-column'>
                        <div className="divB d-flex justify-content-center gap-4">
                            <button onClick={() => setIsEditing(!isEditing)} className="btn btn-danger mb-4">
                                {isEditing ? 'Cancel Edit' : 'Edit News'}
                            </button>
                            <button onClick={handleDeleteNews} className="btn btn-danger mb-4 ">Delete News</button>
                        </div>
                        {isEditing ? (
                            <div className='Edit-d d-flex justify-content-center flex-column'>
                                <input
                                    id="editedTitleInput"
                                    type="text"
                                    value={editedTitle}
                                    onChange={(e) => setEditedTitle(e.target.value)}
                                    style={{ backgroundColor: '#ffffff', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}
                                />
                                <br />
                                <textarea
                                    id="editedDescriptionInput"
                                    value={editedDescription}
                                    onChange={(e) => setEditedDescription(e.target.value)}
                                    style={{ backgroundColor: '#ffffff', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}
                                />
                                <br />
                                <button onClick={handleEditNews} className="btn btn-success " style={{ width: '240px' }}>Save Changes</button>
                            </div>
                        ) : (
                            <>
                                <div className="Edit-D d-flex justify-content-center flex-column" style={{ fontSize: '18px' }}>
                                    <p>{newsDetails.description}</p>
                                </div>
                                <div className="comment-section">
                                    <input
                                        type="text"
                                        placeholder="Add a comment..."
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        style={{ backgroundColor: '#ffffff', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}
                                    />
                                    <button className='delete' onClick={handleCommentSubmit} disabled={submittingComment}>Submit</button>
                                </div>
                                <div>
                                    <h3>Comments</h3>
                                    <ul>
                                        {comments.map(comment => (
                                            <li key={comment.id}>
                                                {comment.comment}
                                                <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default BlogDetails;
