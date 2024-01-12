import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Tester.css'
import axios from 'axios'
const BaseUrl = 'http://localhost:5000'

const Tester = () => {
  
  type questionType ={
    options: string[],
    question: string,
    type: string
  }

  type formType={
    desc: string,
    title: string,
    type: string,
    _id: string,
    stage: string,
    questions: questionType
  }

  type videoType={
    desc: string,
    title: string,
    type: string,
    videoType: string,
    videoUrl: string,
    _id: string,
    stage: string,
  }

  type imageType={
    desc: string,
    title: string,
    type: string,
    imageFile: string[],
    _id: string,
    stage: string,
  }
  const [video, setVideo] = useState<videoType[]>();
  const [image, setImage] = useState<imageType[]>();
  const [form, setForm] = useState<formType[]>();

  const navigate = useNavigate();

  useEffect( ()=>{
     axios.get(`${BaseUrl}/videoData`).then(response => setVideo(response.data.data))
     axios.get(`${BaseUrl}/imageData`).then((response)=> setImage(response.data.data))
     axios.get(`${BaseUrl}/formData`).then((response) => setForm(response.data.data))
  },[])

  console.log("vInfo",video);
  console.log("iInfo",image);
  console.log("fInfo",form);

  
  return (
    <div className='tester-container'>
      <div className="title">
        <h3>Survey</h3>
      </div>
      <div className="survey-container">
        {
          video?.map((video: videoType, i: number)=>(
            video.stage === 'published'? (
              <div className="survey-block" onClick={()=>navigate(`/video/${video.title}`)}>
              <div className="type-tit-desc">
                <div className="type">
                <p style={{background:"#d4b0b0"}}>{video.type}</p>
                </div>
                <p>Title: {video.title}</p>
                <p>Description: {video.desc}</p>
              </div>
            </div>
            ): ''
          ))
        }
        {
          image?.map((image: imageType, i: number)=>(
            image.stage === 'published'? (
              <div className="survey-block" onClick={()=>navigate(`/image/${image.title}`)}>
              <div className="type-tit-desc">
                <div className="type">
                <p style={{background: "#e55b5b"}}>{image.type}</p>
                </div>
                <p>Title: {image.title}</p>
                <p>Description: {image.desc}</p>
              </div>
            </div>
            ): ''
          ))
        }
        {
          form?.map((form: formType, i: number)=>(
            form.stage === 'published'? (
              <div className="survey-block" onClick={()=>navigate(`/form/${form.title}`)}>
              <div className="type-tit-desc">
                <div className="type">
                <p style={{background:"#755fb7"}}>{form.type}</p>
                </div>
                <p>Title: {form.title}</p>
                <p>Description: {form.desc}</p>
              </div>
            </div>
            ): ''
          ))
        }
      </div>
    </div>
  )
}

export default Tester
