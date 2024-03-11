import './Form.css'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { Button } from '@chakra-ui/react'
import Back from '../Common/Backbutton/Back'
const BaseUrl = 'http://localhost:5000'

const Form = () => {

  const navigate = useNavigate()
  const param = useParams();
  const formId = param.formid || '';

  const [name, setName] = useState<string>('');

  type ansType = {
    que: string,
    ans: any
  }
  const [answer, setAnswer] = useState<ansType[]>([]);


  function handleAnswer(e: React.ChangeEvent<HTMLInputElement>, index: number, quef: string, ansf: string) {

    const updatedAnswers = [...answer];

    if(e.target.type === 'checkbox'){
      if(e.target.checked){
        if(!updatedAnswers[index]){
          updatedAnswers[index] = { que: quef, ans: [ansf]};
        }
        else{
          updatedAnswers[index] = { que: quef, ans: [...updatedAnswers[index].ans, ansf]};
        }
      }
      else{
        updatedAnswers[index] = { que: quef, ans: updatedAnswers[index].ans?.filter((unchecked: any)=> unchecked !== ansf)}
      }
    }
    else{
      updatedAnswers[index] = { que: quef, ans: ansf };
    }
    setAnswer(updatedAnswers);
  }

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
    type: string,
    formsurvey: surveyType,
  }

  const [form, setForm] = useState<formType[]>();

  useEffect(() => {
    (async function fetch() {
      try {
        const res = await axios.get(`${BaseUrl}/formData`);
        console.log(res);
        setForm(res.data.data);
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  async function handleFormSubmit(title: string) {

    const postForm = {
      name,
      title,
      answer
    };

    try {
      const res = await axios.post(`${BaseUrl}/formAns`, postForm);
      if (res.status === 200) {
        toast.success('Response recorded successfully !!')
        navigate('/thanks')
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='image-video-container' data-testid='image-video-container'>
      <Back/>
      <div className="noti">
        <p style={{ color: "green" }}>Please fill the form !!</p>
      </div>
      <div className='form-container' data-testid='form-container'>
        <input type="text" className='name' placeholder='Enter your name' onChange={(e) => setName(e.target.value)} />
        {
          form?.map((ques: formType, i: number) => {
            if (formId === ques._id) {
              return (
                <div key={ques._id} >
                  {ques.formsurvey?.questions?.map((que: queType, j: number) => (
                    <div className="form-ques" key={que.id}>
                      {j > 0 &&
                        <div className="que-array">
                            <div className="que">
                              <p>{j}. {que.questions}</p>
                              {que.type === 'Input' && 
                              <input type='text' 
                              id={que.id.toString()} 
                              placeholder='Answer' 
                              onChange={(e)=>handleAnswer(e, j, que.questions, e.target.value)}
                              />
                              }
                            </div>
                          <div className="options-radio-checkbox">
                            {que.options?.map((opt: opt) => (
                              <div key={opt.id} className='question-hcheck-radio'>
                                <input 
                                type={que.type.toLowerCase()} 
                                id={opt.id.toString()} 
                                name='same' 
                                onChange={(e)=>handleAnswer(e, j, que.questions, opt.text)}
                                />
                                <label htmlFor={opt.id.toString()}>{opt.text}</label>
                              </div>
                            ))
                            }
                          </div>
                        </div>
                      }
                    </div>
                  ))}
                  <div className="submit-form-btn">
                    <Button 
                    onClick={() => handleFormSubmit(ques.formsurvey?.title)} 
                    colorScheme='blue' 
                    isDisabled={ques.formsurvey?.questions?.length !== answer.length || name.trim()===''}>
                      SUBMIT
                    </Button>
                  </div>
                </div>
              )
            }
          })
        }
      </div>
    </div>
  )
}

export default Form


