import React from 'react'
import Menu from '../components/Menu'

const Inscription = () => {
  return (
    
    <div>
        <Menu/>
        <div className="">
            <form>
                <input placeholder="nom" type="text" className=""/>
                <input placeholder="prénom" type="text" className=""/>
                <input placeholder="mail" type="text" className=""/>
                <input placeholder="mot de passe" type="text" className=""/>
                <input placeholder="confirmer mot de passe" type="text" className=""/>
                <button> Create</button>
            </form>
        </div>
    </div>
  )
}

export default Inscription
