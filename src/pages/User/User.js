import './User.scss';
import React from 'react';
import { useHistory } from "react-router-dom";
import PageLayoutComponent from '../../components/PageLayout/PageLayout';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const UserPage = () => {

    const history = useHistory();
    const user = history.location.state.user;

    const useStyles = makeStyles({
        largeAvatar: {
            width: '100%',
            height: '240px',
        }
    });

    const classes = useStyles();

    return (
        <>
            <PageLayoutComponent title={`${user.firstName} ${user.lastName}`}>
                <div className="user">
                    <div className="user__row">
                        <div className="user__row-col avatar">
                            <div className="avatar-container">
                                <Avatar src={user.bigAvatar} className={classes.largeAvatar} />
                            </div>
                        </div>
                        <div className="user__row-col">
                            <ul className="user-details">
                                <li className="user-details__elem">
                                    <h4 className="">First name: <span>{user.firstName}</span></h4>
                                </li>
                                <li className="user-details__elem">
                                    <h4 className="">Last name: <span>{user.lastName}</span></h4>
                                </li>
                                <li className="user-details__elem">
                                    <h4 className="">Gender: <span>{user.gender}</span></h4>
                                </li>
                                <li className="user-details__elem">
                                    <h4 className="">Email: <span>{user.email}</span></h4>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </PageLayoutComponent>
        </>
    )

}

export default UserPage;