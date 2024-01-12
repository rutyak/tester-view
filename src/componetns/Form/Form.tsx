import '../Image/Image.css'
import './Form.css'
import Common from '../Common/Common'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
const BaseUrl = 'http://localhost:5000'

const Form = () => {

  const param = useParams();
  const id = param.formId;
  console.log("formId: ", id);
  console.log("param: ", param);

  type questionType = {
    options: string[],
    question: string,
    type: string
  }

  type formType = {
    desc: string,
    title: string,
    type: string,
    _id: string,
    stage: string,
    questions: questionType[]
  }
  const [form, setForm] = useState<formType[]>();

  useEffect(() => {
    axios.get(`${BaseUrl}/formData`).then(response => setForm(response.data.data))
  }, [])

  console.log("formData", form);

  return (
    <div className='image-video-container'>
      <Common />
      <div className="noti">
        <p style={{ color: "green" }}>Please fill the form !!</p>
      </div>
      <div className='form-container'>
        {
          form?.map((ques: formType, i: number) => (
            id === ques.title ? (
              ques.questions?.map((que: questionType, j: number) => (
                <div className="form-ques" key={j}>
                  {j > 0 &&
                    <div className="que-array">
                      <div className="que">
                        <p>{j}. {que.question}</p>
                      </div>
                      <div className="options-radio-checkbox">
                        {que.type === 'checkbox' &&
                          <div className="options">
                            <div className='opt1'>
                              <input type='checkbox' />
                              <label htmlFor="opt1">{que.options[0]}</label>
                            </div>
                            <div className='opt2'>
                              <input type='checkbox' />
                              <label htmlFor="opt2">{que.options[1]}</label>
                            </div>
                          </div>
                        }
                        {que.type === 'radio' &&
                          <div className="options">
                            <div className='opt1'>
                              <input type='radio' />
                              <label htmlFor="opt1">{que.options[0]}</label>
                            </div>
                            <div className='opt2'>
                              <input type='radio' />
                              <label htmlFor="opt2">{que.options[1]}</label>
                            </div>
                          </div>
                        }
                        { que.type === 'single' &&
                          <div className="input-ans">
                            <input type="text" placeholder='Add your answer'/>
                          </div>
                        }
                      </div>
                    </div>
                  }
                </div>
              ))
            ) : ''
          )
          )
        }
      </div>
      <div className="submit-form-btn">
        <button>SUBMIT</button>
      </div>
    </div>

  )
}

export default Form
