import React from 'react'
import Menu from '../components/Menu'

const home = () => {
  return (
    <div>
        <Menu/>
        Hello
        <button href="/login">
            Login
        </button>
        <button href="/inscription">
            Inscription
        </button>
        
      
    </div>
  )
}

export default home
