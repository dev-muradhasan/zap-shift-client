import { Link } from 'react-router';
import logo from '../../assets/logo.png'

const Logo = () => {
    return (
        <Link to={'/'} className='flex items-end'>
            <img src={logo} alt="" />
            <h3 className='text-3xl font-bold tracking-tight text-[#303030] -ms-3'>ZapShift</h3>
        </Link>
    );
};

export default Logo;