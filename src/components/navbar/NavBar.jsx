import { Link } from "react-router-dom";

export const NavBar = () => {
    return (
        <ul className='nav'>
            <li className='nav-item'>
                <Link className='nav-link' to='/nursaries'>Nursaries</Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link' to='/distributors'>Distributors</Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link' to='/retailers'>Retailers</Link>
            </li>
        </ul>
    )
}