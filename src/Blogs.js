import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
const Blogs = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const success = localStorage.getItem('success');
    if (!success) {
      navigate('/');
    }
  }, [navigate]);

  const handleBlogs = async (e) => {
    e.preventDefault();
    try {
      if (!title.trim() || !description.trim()) {
        alert('Please fill in both the title and description.');
        return;
      }
      const newNewsItem = { title, description };
      await axios.post('https://apitest.reachstar.io/blog/add', newNewsItem);
      navigate('/Home');

    } catch (error) {
      console.error('Error adding news:', error);
      alert('Failed to add news. Please try again later.');
    }
  };

  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <h2 className="text-center pt-4">Add News</h2>
          <form onSubmit={handleBlogs}>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                className="form-control"
                id="titleAdd"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                className="form-control"
                id="descriptionAdd"
                rows="5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="d-flex justify-content-center gap-4 pb-5 pt-3">
              <button type="submit" className="btn" style={{ width: '150px' }}>Add News</button>
              <Link to="/Home" className="btn" style={{ width: '150px' }}>Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
