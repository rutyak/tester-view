import './Thankyou.css'
import thank from '../../../Asset/Thankyou.jpg'
import Back from '../Backbutton/Back'
function Thankyou() {
  return (
    <div className='Thankyou'>
      <Back/>
      <div className='thanks-contain'>
        <img className='thanks-img' src={thank} alt="thanks" />
      </div>
    </div>
  )
}

export default Thankyou
