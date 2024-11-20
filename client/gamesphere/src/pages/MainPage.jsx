import React, { useEffect, useState } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import './MainPage.css'
import Footer from '../Components/Footer'
import logo from '../Components/transperantlogo.png'
import img1 from '../Components/cargame.png'
import img2 from '../Components/FPSlogo.png'
import ssImages from '../Components/screenshots'; // Assuming ss1 - ss8 images imported here.
import Beats from '../Components/Beats';
import { Link, useParams } from 'react-router-dom'
import CarGame from './My Car.apk'
import Loading from './Loading';
import GameSphere from '../Components/GameSphere';
import axios from 'axios';
import Navbar from '../Components/Navbar';

const MainPage = () => {

  const { id } = useParams();
  const URL = 'http://localhost:3000';

  useEffect(() => {
    AOS.init({
      duration: 900,
      offset: 300,
    });
  }, []);

  const [userName, setUserName] = useState();
  const [error, setError] = useState(null);


  useEffect(() => {
    if (id) {
      axios
        .get(`${URL}/getUser/${id}`)
        .then(res => {
          if (res.data) {
            setUserName(res.data);
          } else {
            console.log(res)
            setError('User not found.');
          }
        })
        .catch(err => {
          console.error(err);
          setError('An error occurred while fetching user data.');
        });
    } else {
      setError('Invalid user ID.');
    }
  }, [id, URL]);


  if (error) {
    return (
      <div className="error-page">
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!userName) {
    return <Loading />;
  }

  return (
    <>
      <Navbar logo={logo} />
          <GameSphere />
          <div className="logo-body">
            <div className="intro-text" data-aos="fade-up" data-aos-anchor-placement="center-bottom">
              <h1 className='hey' data-aos="zoom-in-right">Hey! {userName.username}</h1>
              <h5 data-aos="zoom-in-left">Welcome to GameSphere, your ultimate destination for immersive gaming experiences!</h5>
            </div>
          </div>
          <div className="main-body">
            {/* Game 1 Card */}
            <div className="game-card" data-aos="fade-up-right">
              <h1 className="title">My Car</h1>
              <img src={img1} className='car-img' alt="My Car game preview" />
              <div className="desc">My Car is an open-world car controller mobile game. Explore the city and enjoy the game.</div>
              <a download href={CarGame}><button className="see-more btn1 fa fa-download">Get</button></a>
            </div>

            {/* Carousel Component */}
            <Carousel images={ssImages.slice(0, 6)} />

            {/* Game 2 Card */}
            <div className="game-card" data-aos="fade-up-left">
              <h1 className="title">Urban Chaos</h1>
              <img src={img2} className='fps-img' alt="Urban Chaos game preview" />
              <div className="desc">Step into the chaotic world of Urban Chaos, an immersive first-person shooter.</div>
              <button className="see-more btn2">Coming Soon</button>
            </div>

            {/* Second Carousel */}
            <Carousel images={ssImages.slice(6, 8)} />

            <Beats className='beats' />
          </div>
          <Footer />
    </>

  )
};

const Carousel = ({ images }) => (
  <div id="carouselExample" className="carousel slide slider1" data-aos="zoom-in-up">
    <div className="carousel-indicators">
      {images.map((_, index) => (
        <button
          key={index}
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide-to={index}
          className={index === 0 ? "active" : ""}
          aria-current={index === 0 ? "true" : "false"}
          aria-label={`Slide ${index + 1}`}
        ></button>
      ))}
    </div>
    <div className="carousel-inner">
      {images.map((imgSrc, index) => (
        <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
          <img src={imgSrc} className="d-block w-100" alt={`Screenshot ${index + 1}`} />
        </div>
      ))}
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
);

export default MainPage
