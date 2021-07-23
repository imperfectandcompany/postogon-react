import React from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

export interface LoginState {
    username?: string,
    password?: string,
    loading?: boolean,
    result?: string
}


export class Continue extends React.Component<{}, LoginState>{
    constructor(props:string) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loading: false,
          };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
        handleInputChange(event:React.ChangeEvent<HTMLInputElement>) {
            const name = event.target.name;
            this.setState({[name]: event.target.value});
          }
        
    
      handleSubmit(event:React.FormEvent<HTMLFormElement>) {
          this.setState({
              loading: true
          })
        axios.post('https://api.postogon.com/auth',{
            username: this.state.username,
            password: this.state.password,
        })
        .then( (response) =>  {
            this.setState({
                loading: false,
                result: JSON.stringify(response.data)
            })            
        })
        .catch( (response) => {
            this.setState({
                loading: false,
                result: JSON.stringify(response.data)
            })               
        });
        event.preventDefault();
      }

    render(){
        return(<div className="max-w-md p-8 mx-auto bg-white rounded md:p-12 md:my-10 lg:shadow-2xl md:shadow-lg sm:shadow-sm">
            <form className="flex flex-col" onSubmit={this.handleSubmit.bind(this)}>



  <div className="mb-4">
    <label className="block mb-2 font-light text-md" htmlFor="email1">Email Or Username</label>
    <input type="text" name="username" id="username" disabled={this.state.loading}  value={this.state.username} onChange={this.handleInputChange} autoComplete="off" className="w-full p-4 font-light leading-tight border border-gray-500 appearance-none bg-drabya-gray focus:outline-none focus:shadow-outline"/>
  </div>
  <div className="mb-4">
    <label className="block mb-2 font-light text-md" htmlFor="password">Password</label>
    <input type="password" name="password" id="password" disabled={this.state.loading}  value={this.state.password} onChange={this.handleInputChange} autoComplete="off" className="w-full p-4 font-light leading-tight border border-gray-500 appearance-none bg-drabya-gray focus:outline-none focus:shadow-outline"/>
  </div>
  <div className="flex items-center justify-between mb-5">
  <div className="inline-block text-sm font-light text-indigo-600 align-baseline hover:text-indigo-500" >
      Forgot Password?
    </div>      
    <motion.button whileHover={{ scale: 0.98 }} disabled={this.state.loading} whileTap={{ scale: 0.9 }} transition={{ duration: 0.5 }} type="submit" className="flex-initial px-6 py-2 font-semibold text-white bg-indigo-600 rounded justify-items-start hover:bg-indigo-700 focus:outline-none focus:shadow-outline">
      {this.state.loading ? 'Loading...' : 'Continue'}
    </motion.button>
  </div>
            </form>
            <div className="text-center break-words">{this.state.result}</div>
        </div>);
    }
}

export default Continue;