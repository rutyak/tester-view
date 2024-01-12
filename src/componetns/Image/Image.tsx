import './Image.css'
import Common from '../Common/Common'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
const BaseUrl = 'http://localhost:5000'

const Image = () => {

  const param = useParams();
  const id = param.imageId;
  console.log("ImageId", id)

  type imageType={
    desc: string,
    title: string,
    type: string,
    imageFile: string[],
    _id: string,
    stage: string,
  }
  const [image, setImage] = useState<imageType[]>();

  useEffect(() => {
    axios.get(`${BaseUrl}/imageData`).then(response => setImage(response.data.data))
  }, [])
  console.log("ImageData",image);

  return (
    <div className='image-video-container'>
      {
        image?.map((img: imageType, i: number) => {
          if (id === img.title) {
            return <div className='image-container' key={i}>
              <Common />
              <div className="noti">
                <h2>Please select any two images !!</h2>
              </div>
              <div className='img-section'>
                <div className='img-flex'>
                { img.imageFile?.map((img: string, i: number)=>(
                    <div className='images'>
                    <img src={img} alt="img" />
                    </div>
                ))
                }
                </div>
              <div className='btn-images'>
                  <button className='img-submit'>Submit</button>
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
