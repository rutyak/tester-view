import '../Image/Image.css'
import './Video.css'
import Common from '../Common/Common'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
const BaseUrl = 'http://localhost:5000'

const Video = () => {

  const param = useParams();
  const videoId = param.videoId;
  const navigate = useNavigate();

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
  const [videoDuration, setVideoDuration] = useState<number>(0);

  type ansType = {
    start: string,
    end: string,
  }
  const [ans, setAns] = useState<ansType>({
    start: '',
    end: ''
  });
  
  useEffect(()=>{
    axios.get(`${BaseUrl}/videoData`).then(response => setVideo(response.data.data))
  },[])

  console.log("videoData", video)

  function handleMetadataLoad(e: React.SyntheticEvent<HTMLVideoElement>){

    const duration = (e.currentTarget as HTMLVideoElement).duration;
    setVideoDuration(duration);
  }
  console.log("Duration", videoDuration)
  console.log("ANs: ",ans)

  function handleVideoSubmit(id: string){
    console.log("id: ",id)
    axios.put(`${BaseUrl}/updateVideo/${id}`,{answer:ans}).then(res =>{
         if(res.status === 200){
          toast.success("Submit Successfully!")
          setTimeout(()=>{
            navigate('/thanks');
          },2000)
         }
        })
  } 
  return (
    <div className='image-video-container'>
      {
        video?.map((video: videoType, i: number) => {
          if (videoId === video.title) {
            return <div className='video-container' key={i}>
              <Common />
              <div className="noti">
                <h2>Please cut the important part of video !!</h2>
              </div>
              <div className="video-section">
                <div className='video-part'>
                  <video width="380px" height="220px" controls onLoadedMetadata={handleMetadataLoad}>
                    <source src={video.videoUrl} type={`video/${video.videoType}`} />
                  </video>
                </div>
                <div className='input-part'>
                  <div className='p-tag'>
                    <p>Start Time(seconds):</p>
                  </div>
                  <div className='input'>
                    <input type="text" 
                    placeholder="Seconds" 
                    onChange={(e) => setAns({
                      ...ans,
                      start: e.target.value
                    })}
                    />
                  </div>
                </div>
                <div className='input-part'>
                  <div className='p-tag'>
                    <p>End Time(seconds):</p>
                  </div>
                  <div className='input'>
                    <input type="text" 
                    placeholder="Seconds" 
                    onChange={(e)=>setAns({
                      ...ans,
                      end: e.target.value
                    })}
                    />
                  </div>
                </div>
                <div className='submit-video-btn'>
                  <div className='submit-btn'>
                    <button onClick={()=>handleVideoSubmit(video._id)}>Submit</button>
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
