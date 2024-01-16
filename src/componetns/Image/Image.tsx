import './Image.css'
import Common from '../Common/Common'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
const BaseUrl = 'http://localhost:5000'

const Image = () => {

  const param = useParams();
  const imageId = param.imageId;
  const navigate = useNavigate();
  type imgType ={
    img1: string,
    img2: string
  }
  const [ans, setAns] = useState<imgType>({
      img1: '',
      img2: ''
  })

  function handleImg(url: string){

    
      console.log("Image clicked")
      setAns({
        ...ans, 
        img1: ans.img1 === ''? url: ans.img1,
        img2: ans.img1 !== ''? url: ans.img2
      })
    
   }
  

  type imageType={
    desc: string,
    title: string,
    type: string,
    imageFile: string[],
    _id: string,
    stage: string,
    answer: string[]
  }
  const [image, setImage] = useState<imageType[]>();

  useEffect(() => {
    axios.get(`${BaseUrl}/imageData`).then(response => setImage(response.data.data))
  }, [])
  console.log("ImageData: ",image);
  console.log("Answer: ",ans);

  function handleImgSubmit(id: string){
 
    console.log("id: ",id)
    axios.put(`${BaseUrl}/updateImage/${id}`,{answer:ans}).then(res =>{
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
        image?.map((img: imageType, i: number) => {
          if (imageId === img.title) {
            return <div className='image-container' key={i}>
              <Common />
              <div className="noti">
                <h2>Please select any two images !!</h2>
              </div>
              <div className='img-section'>
                <div className='img-flex'>
                { img.imageFile?.map((img: string, i: number)=>(
                    <div className='images'>
                    <img src={img} alt="img" className={ans.img1 === img|| ans.img2 === img ? 'select': ''} onClick={()=>handleImg(img)}/>
                    </div>
                ))
                }
                </div>
              <div className='btn-images'>
                  <button className='img-submit' onClick={()=>handleImgSubmit(img._id)}>Submit</button>
              </div>
              </div>
            </div>
          }
        })
      }
    </div>
  )
}

export default Image
