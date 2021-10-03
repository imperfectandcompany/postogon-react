import { removeLoginSession } from "../Utils/Common";

const Logout = (props: { history: string[]; }) => {
    removeLoginSession();
    props.history.push('/login');
}

export default Logout;