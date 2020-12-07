import './Header.scss';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";

const HeaderComponent = () => {

    const history = useHistory();

    const logOut = () => {
        localStorage.removeItem('favorites');
        localStorage.removeItem('token');
        history.push("/");
    }

    return (
        <div className="header">
            <div className="header__col">
                <h2 className="title">JOOR code test</h2>
            </div>
            <div className="header__col">
                <Button color="secondary" onClick={() => logOut()}>Logout</Button>
            </div>
        </div>
    )
}

export default HeaderComponent;