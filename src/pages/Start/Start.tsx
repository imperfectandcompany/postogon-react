import React from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link, Redirect } from "react-router-dom";

export interface LoginState {
  email?: string;
  password?: string;
  loading?: boolean;
  result?: string;
  success?: boolean;
}

export class Start extends React.Component<{}, LoginState> {
  //set username and password to empty by default. We set loading as false since we aren't processing anything immediately.
  constructor(props: string) {
    super(props);
    this.state = {
      email: "",
      password: "",
      success: false,
      loading: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //we call this function everytime and input is changed to update the state. In this case, we are updating username and password
  handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
  }
  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    this.setState({
      loading: true,
      result: "",
    });
    axios
      .post("https://api.postogon.com/register", {
        email: this.state.email,
        password: this.state.password,
      })
      .then((response) => {
        this.setState({
          loading: false,
          success: true,
          result: JSON.stringify(response.data),
        });
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

  render() {
    return (
      <div className="max-w-md p-8 mx-auto bg-white rounded md:p-12 md:my-10 lg:shadow-2xl md:shadow-lg sm:shadow-sm">
        {this.state.success ? <Redirect to="/continue" /> : null}

        <form className="flex flex-col" onSubmit={this.handleSubmit.bind(this)}>
          <div className="mb-4">
            <label className="block mb-2 font-light text-md" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              disabled={this.state.loading}
              value={this.state.email}
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
            <Link to="/continue">
              <div className="inline-block text-sm font-light text-indigo-600 align-baseline hover:text-indigo-500">
                Already have an account?
              </div>
            </Link>
            <motion.button
              whileHover={{ scale: 0.98 }}
              disabled={this.state.loading}
              whileTap={{ scale: 0.9 }}
              style={{}}
              type="submit"
              className="flex-initial px-6 py-2 font-semibold text-white bg-indigo-600 rounded justify-items-start hover:bg-indigo-700 focus:outline-none focus:shadow-outline"
            >
              {this.state.loading ? "Loading" : "Start"}
            </motion.button>
          </div>
        </form>
        <div className="text-center break-words">{this.state.result}</div>
      </div>
    );
  }
}

export default Start;
