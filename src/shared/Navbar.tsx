import logo from '../assets/logo.png'
const Navbar = () => {
  return (
   <div>
    <div className='flex items-center justify-between'>
        <img src={logo} alt="" />
        <ul>
            <li>Service</li>
            <li>Login</li>
            <li>Dashboard</li>
            <li>About Us</li>
            <li>Contact Us</li>
        </ul>
    </div>
   </div>
  )
}

export default Navbar
