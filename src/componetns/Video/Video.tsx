import '../Image/Image.css'
import './Video.css'
import Common from '../Common/Common'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
const BaseUrl = 'http://localhost:5000'

const Video = () => {

  const param = useParams();
  const id = param.videoId;
  console.log("Video id: ", id);

  type videoType={
    desc: string,
    title: string,
    type: string,
    videoType: string,
    videoUrl: string,
    _id: string,
    stage: string,
  }
  const [video, setVideo] = useState<videoType[]>();

  
  useEffect(()=>{
    axios.get(`${BaseUrl}/videoData`).then(response => setVideo(response.data.data))
  },[])

  console.log("videoData", video)

  return (
    <div className='image-video-container'>
      {
        video?.map((video: videoType, i: number) => {
          if (id === video.title) {
            return <div className='video-container' key={i}>
              <Common />
              <div className="noti">
                <h2>Please cut the important part of video !!</h2>
              </div>
              <div className="video-section">
                <div className='video-part'>
                  <video width="380px" height="220px" controls>
                    <source src={video.videoUrl} type={`video/${video.videoType}`} />
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
          }
        })
      }
    </div>
  )
}

export default Video
