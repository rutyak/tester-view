import '../Image/Image.css'
import './Form.css'
import Common from '../Common/Common'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
const BaseUrl = 'http://localhost:5000'

const Form = () => {

  const param = useParams();
  const id = param.formId;
  const navigate = useNavigate();

  type ansType = {
    que: string,
    ans: any
  }

  const [answer, setAnswer] = useState<ansType[]>([
    { que: '', ans: ''}
  ]);

  type answerType = {
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    quef: string,
    ansf: string
  }

  function handleAnswer({ e, index, quef, ansf }: answerType) {

    setAnswer((answer): ansType[] => {
      const copy = [...answer]; // copy
      copy[index] = { que: quef, ans: ansf }
      console.log("copy", copy);
      return copy; 
    });
  }
  console.log("Answer: ", answer);

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
    questions: questionType[],
  }
  const [form, setForm] = useState<formType[]>();

  useEffect(() => {
    axios.get(`${BaseUrl}/formData`).then(response => setForm(response.data.data))
  }, [])

  console.log("gettingForm", form);

  function handleFormSubmit(id: string) {
    console.log("id: ", id)
    axios.put(`${BaseUrl}/updateForm/${id}`, { answer: answer }).then(res => {
      if (res.status === 200) {
        toast.success("Submit Successfully!")
        setTimeout(() => {
          navigate('/thanks');
        }, 2000)
      }
    })
  }

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
              <div key={i}>
                {ques.questions?.map((que: questionType, j: number) => (
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
                                <input type='checkbox' onChange={(e) => handleAnswer({ e, index: j - 1, quef: e.target.checked ? que.question : '', ansf: e.target.checked ? que.options[0] : ''})} />
                                <label htmlFor="opt1">{que.options[0]}</label>
                              </div>
                              <div className='opt2'>
                                <input type='checkbox' onChange={(e) => handleAnswer({ e, index: j , quef: e.target.checked ? que.question : '', ansf: e.target.checked ? que.options[1] : ''})} />
                                <label htmlFor="opt2">{que.options[1]}</label>
                              </div>
                            </div>
                          }
                          {que.type === 'radio' &&
                            <div className="options">
                              <div className='opt1'>
                                <input type='radio' name='radio' onChange={(e) => handleAnswer({ e, index: j - 1, quef: que.question, ansf: que.options[0] })} />
                                <label htmlFor="opt1">{que.options[0]}</label>
                              </div>
                              <div className='opt2'>
                                <input type='radio' name='radio' onChange={(e) => handleAnswer({ e, index: j - 1, quef: que.question, ansf: que.options[1] })} />
                                <label htmlFor="opt2">{que.options[1]}</label>
                              </div>
                            </div>
                          }
                          {que.type === 'single' &&
                            <div className="input-ans">
                              <input type="text" placeholder='Add your answer' onChange={(e) => handleAnswer({ e, index: j - 1, quef: que.question, ansf: e.target.value })} />
                            </div>
                          }
                        </div>
                      </div>
                    }
                  </div>
                ))}
                <div className="submit-form-btn">
                  <button onClick={() => handleFormSubmit(ques._id)}>SUBMIT</button>
                </div>
              </div>
            ) : ''
          )
          )
        }
      </div>

    </div>

  )
}

export default Form
