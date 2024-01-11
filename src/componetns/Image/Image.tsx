import './Image.css'
import Common from '../Common/Common'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const Image = () => {

  const param = useParams();
  const id = param.imageId;
  console.log("ImageId", id)

  const [image, setImage] = useState<any>();

  useEffect(() => {
    axios.get('http://localhost:5000/imageData').then(response => setImage(response.data.data))
  }, [])
  console.log("ImageData",image);

  return (
    <div className='image-video-container'>
      {
        image?.map((ele: any, i: number) => {
          if (id === ele.title) {
            return <div className='image-container' key={i}>
              <Common />
              <div className="noti">
                <h2>Please select any two images !!</h2>
              </div>
              <div className='img-section'>
                { ele.imgUrl?.map((img: any, i: number)=>(
                    <div>
                    <img src={img} alt="img" />
                  </div>
                ))
                }
                <div>
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
