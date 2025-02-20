import React from 'react'
import Hero from '../components/Hero'
import Biography from '../components/Biography'
import Departments from '../components/Departments'
import MessageForm from '../components/MessageForm'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import GoogleLoginButton from '../components/Googlelogin'
import UserProfile from '../components/Usr'

function Home() {
  return (
   <div>
  <Navbar/>
    <Hero  title={
          "Welcome to ZeeCare Medical Institute | Your Trusted Healthcare Provider"
        }
        imageUrl={"/hero.png"}
        />
    <Biography imageUrl={"/about.png"}/>
    <Departments/>
    <MessageForm/>
    {/* <GoogleLoginButton/> */}
    <UserProfile/>
    <Footer/>
   </div>
  )
}

export default Home
