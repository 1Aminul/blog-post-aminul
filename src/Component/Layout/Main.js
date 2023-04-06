import React, { useContext } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';

const Main = () => {
    const { LogOut, user } = useContext(AuthContext)
    const navigate = useNavigate()
    const handleLogOut = () => {
        LogOut()
        navigate('/login')
    }
    return (
        <div className='mx-10 my-10'>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col px-10">
                    {/* <!-- Page content here --> */}
                    <Outlet />
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content border-2">
                        {/* <!-- Sidebar content here --> */}
                        <div className='flex items-center justify-between'>
                            <img src={user?.photoURL} alt='' className='w-20 h-20 rounded-full' />
                            <h2 className='text-xl font-medium text-accent'>{user?.displayName}</h2>
                        </div>
                        <li className='text-xl font-bold text-accent'><Link to='/'>Home</Link></li>
                        <li className='text-xl font-bold text-accent'><Link to='/createpost'>Create Post</Link></li>
                        {
                            user?.email ?
                                <li className='text-xl font-bold text-accent'><span onClick={() => handleLogOut()}>Log Out</span></li> :
                                <> <li className='text-xl font-bold text-accent'><Link to='/login'>Login</Link></li>
                                    <li className='text-xl font-bold text-accent'><Link to='/register'>Register</Link></li></>

                        }
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Main;