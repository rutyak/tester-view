import axios from 'axios';
import './Image.css'
import React, { useEffect, useState } from 'react'
import img1 from '../../Asset/add-image.png'
import img2 from '../../Asset/icons8-plus-64.png'
import img3 from '../../Asset/customer-survey-outline-icon-vector-manager-paperwork-team-graphic-design-logo-web-site-social-media-mobile-app-ui-183379636.jpg'
import img4 from '../../Asset/plus.png'
import arrow from '../../Asset/left-arrow (1).png'

const Image = () => {

  return (
    <div className='image-container'>
      <div className='home'><img src={arrow} alt="arrow-icon"/><p>Home</p></div>
      <div className="noti">
        <h2>Please select any two images !!</h2>    
      </div>
      <div className='img-section'>
        <div>
          <img src={img1} alt="img" />
          <img src={img2} alt="img" />
          <img src={img3} alt="img" />
          <img src={img4} alt="img" />
        </div>
        <div>
          <button className='img-submit'>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default Image
