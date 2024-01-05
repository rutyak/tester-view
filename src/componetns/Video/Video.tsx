import '../Image/Image.css'
import './Video.css'
import Common from '../Common/Common'
import { useSelector } from 'react-redux'

const Video = () => {
  
  const video = useSelector((state: any)=>state.video.videoInfo);
  console.log("videoData",video)
  
  return (
    <div className='image-video-container'>
      <Common/>
      <div className="noti">
        <h2>Please cut the important part of video !!</h2>
      </div><div className="video-section">
        <div className='video-part'>
          <video width="380px" height="220px" controls>
            <source src='' />
          </video>
        </div>
        <div className='input-part'>
          <div className='p-tag'>
            <p>Start Time(seconds):</p>
          </div>
          <div className='input'>
            <input type="text" placeholder="Seconds" />
          </div>
        </div>
        <div className='input-part'>
          <div className='p-tag'>
            <p>End Time(seconds):</p>
          </div>
          <div className='input'>
            <input type="text" placeholder="Seconds" />
          </div>
        </div>
        <div className='submit-video-btn'>
          <div className='submit-btn'>
            <button>Submit</button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Video
