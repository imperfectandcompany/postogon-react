import {
  HomeIcon as HomeSolid,
  UserCircleIcon as UserSolid,
} from '@heroicons/react/solid'
import { HomeIcon as HomeOutline, UserCircleIcon as UserOutline } from '@heroicons/react/outline'
import { NavLink } from 'react-router-dom'
import { getUser } from '../../Utils/Common';



function Navbar() {
   const pathname = window.location.pathname

    return(
<div className="flex flex-col bg-yellow-600 ">
   <div className="flex flex-row items-center justify-between p-5 text-yellow-100">
      <p className="flex-grow font-medium text-left text-yellow-100 sm:text-center">
         {pathname.slice(1)[0].toUpperCase()+pathname.slice(2)}
      </p>
   </div>
   <div className="flex flex-row items-center font-medium">
   <NavLink to={'/home'} activeClassName="px-6 py-4 text-yellow-100 ripple-bg-yellow-600"  className=" rounded-tr-md rounded-tl-md select-none px-6 py-3 text-white cursor-pointer">
   {pathname === '/home' ?
   <HomeSolid className="h-5 w-5 text-yellow-100"/>
   : <HomeOutline className="h-5 w-5 text-yellow-100"/>}
      </NavLink>

      <NavLink to={'/profile/'+getUser()} activeClassName="px-6 py-4 text-yellow-100 ripple-bg-yellow-600"  className=" rounded-tr-md rounded-tl-md select-none px-6 py-3 text-white cursor-pointer">
   {pathname.match('/profile') ?
   <UserSolid className="h-5 w-5 text-yellow-100"/>
   : <UserOutline className="h-5 w-5 text-yellow-100"/>}
      </NavLink>            
   </div>
</div>
    );
}

export default Navbar;
