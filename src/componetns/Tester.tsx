import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Tester.css'
import axios from 'axios'

const Tester = () => {

  const BaseUrl = process.env.REACT_APP_API_KEY
  
  type opt = {
    id: number,
    text: string
  }

  type queType = {
    id: number,
    type: string,
    questions: string,
    options: opt[]
  }

  type surveyType = {
    title: string,
    desc: string,
    questions: queType[]
  }

  type formType = {
    _id: string,
    type:string,
    formsurvey: surveyType,
  }
  
  const [form, setForm] = useState<formType[]>();

  const navigate = useNavigate();

  async function fetch() {
    try {
      const res = await axios.get(`${BaseUrl}/formData`);
      console.log(res);
      setForm(res.data.data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetch()
  }, [])


  return (
    <div className='tester-container'>
      <div className="title">
        <h3>Survey</h3>
      </div>
      <div className="survey-container">
        {
          form?.map((form: formType, i: number) => (
            <div className="survey-block" onClick={() => navigate(`/form/${form._id}`)}>
              <div className="type-tit-desc">
                <div className="type">
                  <p style={{ background: "#755fb7" }}>{form.type}</p>
                </div>
                <p>Title: {form.formsurvey.title}</p>
                <p>Description: {form.formsurvey.desc}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Tester
