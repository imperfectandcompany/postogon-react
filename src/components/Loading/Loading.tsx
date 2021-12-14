import React from "react";

export class Loading extends React.Component {

  render() {
    const logoColor = {
        filter: 'brightness(0.1)',
      };

    return (
<div>
      <div
           className="fixed inset-0 z-50 flex items-center justify-center w-full text-3xl font-bold bg-white"
           >
        <img
             className="w-32 h-32 mx-auto motion-reduce:animate-spin" 
             style={logoColor}
             src={process.env.PUBLIC_URL + '/assets/icon/icon.svg'}
             alt="postogon logo"/>
        <div className="flex items-center h-16 mx-auto text-black">Loading.....
        </div>
    </div>
</div>
    );
  }
}

export default Loading;