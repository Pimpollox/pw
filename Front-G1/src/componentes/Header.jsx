import React from 'react';
import '../componentes/Header.css'
import { Link} from 'react-router-dom';

function Header(){
    return(
        <div className='header'>
            <div className='header-text'>
                <h1><Link to="/">TIENDA</Link></h1>
            </div>
        </div>
    )
}

export default Header