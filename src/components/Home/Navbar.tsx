import { NavLink } from "react-router-dom";


function Navbar() {
    return(
<div className="flex flex-col bg-yellow-600 ">
   <div className="flex flex-row items-center justify-between p-5 text-yellow-100">
      <p className="flex-grow font-medium text-left text-yellow-100 sm:text-center">
         Postogon
      </p>
   </div>
   <div className="flex flex-row items-center font-medium">
   <NavLink exact to='/' activeClassName="px-6 py-3 text-yellow-600 bg-white rounded-tr-md" className="select-none px-6 py-3 text-yellow-100 transition duration-200 cursor-pointer">
         Home
      </NavLink>
      <NavLink to='/login' activeClassName="px-6 py-3 text-yellow-600 bg-white rounded-t-md" className="select-none px-6 py-3 text-yellow-100 transition duration-200 cursor-pointer">
         Login
      </NavLink>
      <NavLink to={"/join"} activeClassName="px-6 py-3 text-yellow-600 bg-white rounded-t-md" className="select-none px-6 py-3 text-yellow-100 transition duration-200 cursor-pointer">
         Join
      </NavLink>
   </div>
</div>
    );
}

export default Navbar;
