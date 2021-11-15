import React from "react";

export class Loading extends React.Component {

  render() {
    const logoColor = {
        filter: 'brightness(0.1)',
      };

    return (
<div>
      <div
           className="fixed inset-0 z-50 flex items-center w-full justify-center animate-pulse text-3xl font-bold bg-white"
           x-ref="loading"
           >
        <img
             className="h-32 w-32 mx-auto" 
             style={logoColor}
             src="https://postogon.com/school/public_html/assets/logo.svg"
             alt="postogon logo"/>
        <div className="h-16 flex items-center mx-auto">Loading.....
        </div>
    </div>
</div>
    );
  }
}

export default Loading;