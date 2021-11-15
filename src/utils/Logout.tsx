import { RouteComponentProps } from "react-router";
import { getToken, removeLoginSession } from "./Common";

function Logout(props: { history: string[]; }) {
    removeLoginSession();
    const token = getToken();
    if(!token){
        props.history.push('/signin');
    }
    return (
    <></>
        )
}

export default Logout;