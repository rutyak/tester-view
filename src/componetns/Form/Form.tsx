import '../Image/Image.css'
import './Form.css'
import Common from '../Common/Common'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { set } from 'mongoose'
const BaseUrl = 'http://localhost:5000'
let i=0;

const Form = () => {

  // let arrayAns = useRef<any>([]);
  const param = useParams();
  const formId = param.formId;
  const id = param.id;
  console.log("formId&id: ",formId, id);

  const navigate = useNavigate();

  const [name, setName] = useState<string>('');

  type ansType = {
    que: string,
    ans: any
  } 
  const [answer, setAnswer] = useState<ansType[]>([
    { que: '', ans: null}
  ]);
  
  type answerType = {
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    quef: string,
    ansf: string,
    // checkIndex : number
  }

  function handleAnswer({ e, index, quef, ansf}: answerType) {

    const _answer = [...answer];
    console.log("answer:",_answer[index])
    if(e.target.type === 'checkbox'){
      if(e.target.checked){
        if(!_answer[index]){
          _answer[index]= { que : quef , ans : [ansf]} 
        }
        else{
          _answer[index]= { que : quef , ans : [..._answer[index].ans, ansf]} 
        }
      }else{
        _answer[index]= {que : quef , ans : _answer[index].ans?.filter((single : any)=> single !== ansf)}
      }
    }

    else{
      _answer[index] = { que: quef, ans: ansf }
    }
    setAnswer([..._answer])
  }

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
  
  console.log("answer", answer);
  console.log("formData", form);


  async function handleFormSubmit(title: string) {
     
    //status updated
    axios.put(`${BaseUrl}/updateForm/${id}`,{status: "Answered"}).then(res => console.log("updatedRes: ",res))
      
    const postForm = {
      name,
      title,
      answer
    };
    console.log(postForm);

      try {
         const res = await axios.post(`${BaseUrl}/formAns`,postForm);
         if(res.status===200){
          toast.success('Response recorded successfully !!')
          console.log(res.data);
         }
      } catch (error) {
        console.log(error);
      }
  }
 
  
  

  return (
    <div className='image-video-container'>
      <Common />
      <div className="noti">
        <p style={{ color: "green" }}>Please fill the form !!</p>
      </div>
      <div className='form-container' data-testid='form-container'>
        <input type="text" className='name' placeholder='Enter your name' onChange={(e)=>setName(e.target.value)} />
        {
          form?.map((ques: formType, i: number) => (
            formId === ques.title ? (
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
                                <input type='checkbox' onChange={(e) => handleAnswer({ e, index: j-1, quef: que.question , ansf: que.options[0]})} />
                                <label htmlFor="opt1">{que.options[0]}</label>
                              </div>
                              <div className='opt2'>
                                <input type='checkbox' onChange={(e) => handleAnswer({ e, index: j-1 , quef: que.question , ansf: que.options[1] })} />
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
                  { name? <button onClick={() => handleFormSubmit(formId)}>SUBMIT</button>: <p style={{color: "red"}}>Please add YOUR NAME</p>}
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
