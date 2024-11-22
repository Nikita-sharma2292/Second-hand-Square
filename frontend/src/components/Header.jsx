import { Link, useNavigate } from "react-router-dom";

function Header(props) {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    const handleAdd = () => {
        if (localStorage.getItem('token'))
            navigate('/addProduct')
        else
            navigate('/login')
    }

    const handleCartClick = () => {
        if (localStorage.getItem('token'))
            navigate('/Cart')
        else
            navigate('/login')
    }

    return (
        <header class='border-b bg-white font-sans min-h-[60px] px-10 py-3 relative'>
            <div class='flex flex-wrap items-center max-lg:gap-y-6 max-sm:gap-x-4'>
                
                <div class='flex items-center ml-auto lg:order-1' onClick={handleCartClick}>
                    <span class="relative mr-8">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px"
                            class="cursor-pointer fill-[#000] hover:fill-[#007bff] inline-block mt-4" viewBox="0 0 512 512">
                            <path
                                d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0"
                                data-original="#000000"></path>
                        </svg>
                    </span>
                </div>
                <ul id="collapseMenu"
                    class='lg:!flex flex flex-row max-lg:hidden max-lg:w-full lg:space-x-10 max-lg:space-y-3 lg:absolute lg:left-1/2 lg:-translate-x-1/2'>
                    <li class='max-lg:border-b max-lg:py-2'>
                        <Link to='/' className="hover:text-[#007bff] text-gray-600 font-bold text-[15px] lg:hover:fill-[#007bff] block"> Home </Link>
                    </li>
                    <li class='group max-lg:border-b max-lg:py-2 relative'>

                        {!localStorage.getItem('token') ?
                            <Link to='/login' className="hover:text-[#007bff] text-gray-600 font-bold text-[15px] lg:hover:fill-[#007bff] block"> Login </Link> :
                            <button className="hover:text-[#007bff] text-gray-600 font-bold text-[15px] lg:hover:fill-[#007bff] block" onClick={handleLogout}> Logout </button>}
                    </li>
                    <li class='group max-lg:border-b max-lg:py-2 relative'>
                    <Link to='/signup' className="hover:text-[#007bff] text-gray-600 font-bold text-[15px] lg:hover:fill-[#007bff] block"> Signup </Link>
                    </li>
                </ul>

                <div class='max-lg:border-b ml-10 max-lg:py-2'><a
                    class='hover:bg-slate-600 border border-slate-700 p-3 rounded-2xl bg-slate-700 text-white text-gray-600 font-bold text-[15px] block'
                    onClick={handleAdd}>Post Add</a>
                </div>
            </div>
            <div
                class="bg-gray-200 border border-gray-300 hover:border-gray-500 focus-within:border-blue-500 flex px-6 rounded-full h-9 lg:w-2/4 mt-3 mx-auto max-lg:mt-6">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px"
                    class="fill-gray-600 mr-3 rotate-90" onClick={() => props.handleClick && props.handleClick()}>
                    <path
                        d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
                    </path>
                </svg>
                <input type="text"
                        value={props && props.search}
                        onChange={(e) => props.handlesearch && props.handlesearch(e.target.value)} placeholder='Search...'
                    class="w-full outline-none bg-transparent text-gray-600 font-semibold text-[15px]" />
            </div>
        </header>
    )
}

export default Header;