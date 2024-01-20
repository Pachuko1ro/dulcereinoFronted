import './NavSerch.css'

import { NavLink } from 'react-router-dom'


export const NavSerch = () =>{

      return(
            <div className='NavSerch'>
                <nav className="navbar">
                  <NavLink className="navbar-brand" to="/inicio"><img src="https://pachuko.000webhostapp.com/img/logo.png" className="logo" alt="..."></img></NavLink>
                    <form className="form-inline">
                      <input className="" type="search" placeholder="Buscar" aria-label="Buscar">
                      </input>
                      <button className="btn btn btn-primary my-2 my-sm-0" type="submit"></button>
                    </form>
                </nav>
              </div>

      )
}