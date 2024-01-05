import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Tester.css'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { videoSurvey } from '../Redux/videoSlice'
import { imageSurvey } from '../Redux/imageSlice'
import { formSurvey } from '../Redux/formSlice'

const Tester = () => {
  
  const [video, setVideo] = useState<any>();
  const [form,setForm] = useState<any>();
  const [image,setImage] = useState<any>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
   ( async function fetchData(){
      const res = await axios.get('http://localhost:5000/videoData');
      setVideo(res.data.data)
      dispatch(videoSurvey(res.data.data));

      const res2 = await axios.get('http://localhost:5000/imageData');
      setImage(res2.data.data)
      dispatch(imageSurvey(res2.data.data));

      const res3 = await axios.get('http://localhost:5000/formData');
      setForm(res3.data.data)
      dispatch(formSurvey(res3.data.data));
    })()
  },[])

  // console.log("vInfo",video);
  // console.log("iInfo",image);
  // console.log("fInfo",form);

  
  return (
    <div className='tester-container'>
      <div className="title">
        <h3>Survey</h3>
      </div>
      <div className="survey-container">
        {
          video?.map((ele: any, i: number)=>(
            <div className="survey-block" onClick={()=>navigate('/video')}>
              <div className="type-tit-desc">
                <div className="type">
                <p style={{background:"#d4b0b0"}}>{ele.type}</p>
                </div>
                <p>Title: {ele.title}</p>
                <p>Description: {ele.desc}</p>
              </div>
            </div>
          ))
        }
        {
          image?.map((ele: any, i: number)=>(
            <div className="survey-block" onClick={()=>navigate('/image')}>
              <div className="type-tit-desc">
                <div className="type">
                <p style={{background: "#e55b5b"}}>{ele.type}</p>
                </div>
                <p>Title: {ele.title}</p>
                <p>Description: {ele.desc}</p>
              </div>
            </div>
          ))
        }
        {
          form?.map((ele: any, i: number)=>(
            <div className="survey-block" onClick={()=>navigate('/form')}>
              <div className="type-tit-desc">
                <div className="type">
                <p style={{background:"#755fb7"}}>{ele.type}</p>
                </div>
                <p>Title: {ele.title}</p>
                <p>Description: {ele.desc}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Tester
