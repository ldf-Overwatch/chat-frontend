import React, {Component} from 'react';
import {Detector} from "react-detect-offline";



class  UserList extends Component {


    render() {
            const UserList = this.props.users;
            let list;

            if(UserList && UserList.length > 0){
                list = UserList.map((user) => {
                    return <li key={user.id}>{user.username}  </li>
                });
            }
            else {
                list = '';
            }

            return (

                <aside id="messages-list">
                    <ul>
                        <Detector render={({ online }) => (
                            <div className={online ? "normal" : "warning"}>
                                {online ? "Membres Connectés" : "offline"}
                            </div>
                        )}/>
                        {list}
                    </ul>
                </aside>


            )
        };

}

export default UserList;

