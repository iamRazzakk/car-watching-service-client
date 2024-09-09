import logo from '../assets/logo.png'

const Navbar = () => {
  return (
   <div className='px-4'>
    <div className='flex items-center justify-between'>
        <img className='w-8 h-6 object-cover' src={logo} alt="" />
        <ul className='flex  items-center gap-4'>
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
