import React from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { PostData } from "../../services/PostData";

export interface LoginState {
  username?: string;
  password?: string;
  loading?: boolean;
  result?: string;
  success?: boolean;
}

export class Continue extends React.Component<{}, LoginState> {
  
  //set username and password to empty by default. We set loading as false since we aren't processing anything immediately.
  constructor(props: string) {
    super(props);
    this.state = {
      username: "",
      password: "",
      success: false,
      loading: false,
    };
    this.login = this.login.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }



  //we call this function everytime and input is changed to update the state. In this case, we are updating username and password
  handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  async handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    this.setState({
      loading: true,
      result: "",
    });
    axios
      .post("https://api.postogon.com/auth", {
        username: this.state.username,
        password: this.state.password,
      })
      .then((response) => {
        this.setState({
          loading: false,
          success: true,
        });
        this.setToken(response.data);
      })
      .catch((error) => {
        if (error.response) {
          this.setState({
            loading: false,
            result: error.response.data,
          });
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
    event.preventDefault();
  }

  
  //store login token inside clients browser as a cookie
  setToken(data: object) {
    if (data && this.state.success) {
      const d = new Date();
      d.setTime(d.getTime() + 7 * 24 * 60 * 60 * 1000);
      let expires = "expires=" + d.toUTCString();
      document.cookie =
        "POSTOGONID=" + Object.values(data) + ";" + expires + ";path=/";
      document.cookie = "POSTOGONID_=1;" + expires + ";path=/";
    }
  }

  login() {
    if(this.state.username && this.state.password){
      PostData('auth',this.state).then((result) => {
       let responseJson:any = result;
console.log(responseJson);
       
      });
    }
    
   }

  render() {
    return (
      <div className="max-w-md p-8 mx-auto bg-white rounded md:p-12 md:my-10 lg:shadow-2xl md:shadow-lg sm:shadow-sm">
        <form className="flex flex-col" onSubmit={this.login.bind(this)}>
          <div className="mb-4">
            <label className="block mb-2 font-light text-md" htmlFor="username">
              Email Or Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              disabled={this.state.loading}
              value={this.state.username}
              onChange={this.handleInputChange}
              autoComplete="off"
              className="w-full p-4 font-light leading-tight border border-gray-500 appearance-none bg-drabya-gray focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-light text-md" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              disabled={this.state.loading}
              value={this.state.password}
              onChange={this.handleInputChange}
              autoComplete="off"
              className="w-full p-4 font-light leading-tight border border-gray-500 appearance-none bg-drabya-gray focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between mb-5">
            <div className="inline-block text-sm font-light text-indigo-600 align-baseline hover:text-indigo-500">
              Forgot Password?
            </div>
            <motion.button
              whileHover={{ scale: 0.98 }}
              disabled={this.state.loading}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.5 }}
              type="submit"
              className="flex-initial px-6 py-2 font-semibold text-white bg-indigo-600 rounded justify-items-start hover:bg-indigo-700 focus:outline-none focus:shadow-outline"
            >
              {this.state.loading ? "Loading" : "Continue"}
            </motion.button>
          </div>
        </form>
        <div className="text-center break-words">{this.state.result}</div>
      </div>
    );
  }
}

export default Continue;
