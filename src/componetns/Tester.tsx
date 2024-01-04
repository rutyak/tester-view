import { useEffect, useState } from 'react'
import './Tester.css'
import axios from 'axios'

const Tester = () => {
  
  const [data, setData] = useState<any>();
  const [form,setForm] = useState<any>();
  const [image,setImage] = useState<any>();

  useEffect(()=>{
   ( async function fetchData(){
      const res = await axios.get('http://localhost:5000/videoData');
      console.log(res.data.data)
      setData(res.data.data)

      const res2 = await axios.get('http://localhost:5000/imageData');
      console.log(res2.data.data)
      setImage(res2.data.data)

      const res3 = await axios.get('http://localhost:5000/formData');
      console.log(res3.data.data)
      setForm(res3.data.data)
    })()
  },[])
  console.log("useState",data);
  // console.log("dataOfData", data);

  return (
    <div className='tester-container'>
      <div className="title">
        <h3>Survey</h3>
      </div>
      <div className="survey-container">
        {
          data?.map((ele: any, i: number)=>(
            <div className="survey-block">
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
            <div className="survey-block">
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
            <div className="survey-block">
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
