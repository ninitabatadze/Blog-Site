import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
const data = [
  {
    image: require('./images/blog-exposure.jpg'),
    caption: "WHAT DOES YOUR PET REALLY THINK ABOUT YOU?",
    description: "By Maddison Barnett / In Culture / 2 Comment"
  },
  {
    image: require('./images/Artboard 3.webp'),
    caption: "Coffee may be served in a variety of ways",
    description: "By Maddison Barnett / In Politics / Add comment"
  },
  {
    image: require('./images/pexels-pixabay-206359.jpg'),
    caption: "What could possibly go wrong?",
    description: "By Maddison Barnett / In Humans / 3 Comments"
  }
];

function HomeCarousel() {
  const [index, setIndex] = useState(0);
  const [blogPosts, setBlogPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const success = localStorage.getItem('success');
    if (!success) {
      navigate('/');
    } else {
      fetchBlogPosts();
    }
  }, [navigate]);

  const fetchBlogPosts = () => {
    fetch('https://apitest.reachstar.io/blog/list')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setBlogPosts(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  const handleReadNow = (id) => {
    console.log(`Reading post with ID ${id} now...`);
    window.location.href = `/blog/get/${id}`;
  };
  const handleReadLater = (id) => {
    console.log(`Saving post with ID ${id} for later reading...`);
  };

  return (
    <div>
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        style={{ height: '100%', width: '100%' }}
      >
        {data.map((slide, i) => (
          <Carousel.Item key={i}>
            <img
              className="d-block w-100"
              src={slide.image}
              alt="slider image"
              style={{ maxHeight: 'calc(100vh - 120px)', objectFit: 'cover' }}
            />
            <Carousel.Caption style={{ top: '50%', transform: 'translateY(-50%)', textAlign: 'center' }}>
              <h3 className='title-1' style={{ fontSize: '3rem', textTransform: 'uppercase' }}>{slide.caption}</h3>
              <p>{slide.description}</p>
              <div style={{ gap: '10px', display: 'flex', justifyContent: 'center', }}>
                <button className="button1" type="button" onClick={() => handleReadNow(slide.id)}>READ ON</button>
                <button className="button2" type="button" onClick={() => handleReadLater(slide.id)}>READ LATER</button>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      <div className="App" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1>Blog Posts</h1>
        <div className="blog-list">
          {blogPosts.map(post => (
            <div className="blog-post" style={{ marginBottom: '20px' }} key={post.id}>
              <h2 style={{ fontSize: '4rem', color: '#930587' }}>{post.title}</h2>
              <p style={{ fontSize: '2rem' }}>{post.description}</p>
              <div style={{ gap: '10px', display: 'flex', }}>
                <button className="button1" type="button" onClick={() => handleReadNow(post.id)}>More Details</button>
                <button className="button2" type="button" onClick={() => handleReadLater(post.id)}>READ LATER</button>
              </div>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeCarousel;
