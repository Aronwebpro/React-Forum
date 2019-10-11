import * as React from 'react';
import * as PropTypes from 'prop-types';

//Styles
import './profile.css';

// Utils
import { formatToDateAndTimeString } from '../../../lib/utils';

// Components
import Spinner from '../../components/common/Spinner';
import Message from '../../components/common/Message';

// Transactions
import API from '../../../api/transactions';

//Avatar Images
import face1 from '../../../img/1face.png';
import face2 from '../../../img/2face.png';
import face3 from '../../../img/3face.png';
import face4 from '../../../img/4face.png';
import face5 from '../../../img/5face.png';
import face6 from '../../../img/6face.png';
import face7 from '../../../img/7face.png';
import face8 from '../../../img/8face.png';
import face9 from '../../../img/9face.png';
import face10 from '../../../img/10face.png';
import face11 from '../../../img/11face.png';
import face12 from '../../../img/12face.png';
import face13 from '../../../img/13face.png';
import face14 from '../../../img/14face.png';
import face15 from '../../../img/15face.png';
import face16 from '../../../img/16face.png';

//Avatars Rows
const facesRow1 = [face1, face2, face3, face4, face5, face6, face7, face8];
const facesRow2 = [face9, face10, face11, face12, face13, face14, face15, face16];

// @types
type State = {
    loading: boolean
    showChangeAvatarBlock: boolean
    updateAvatarLoader: boolean
    authorAvatar: string
    authorName: string
}

type Props = {
    user: User
}

export default class Profile extends React.Component<Props, State> {
    static propTypes = {
        user: PropTypes.shape({
            uid: PropTypes.string.isRequired,
            authorName: PropTypes.string.isRequired,
            authorAvatar: PropTypes.string.isRequired,
        }),
        params: PropTypes.object
    };

    public readonly state = {
        loading: false,
        showChangeAvatarBlock: false,
        updateAvatarLoader: false,
        authorAvatar: '',
        flash: '',
        authorName: '',
    };

    public render() {
        const {
            showChangeAvatarBlock,
            updateAvatarLoader,
            authorAvatar,
            authorName
        } = this.state;
        return (
            <div className="container">
                <div className="profile-content">
                    <div className="post-title forum-header">
                        <h2>Profile</h2>
                    </div>
                    <div className="profile-info-container">
                        <div className="profile-info-wrapper">
                            <h2>User Information:</h2>
                            <div className="user-info-row">
                                <div className="user-info-left">
                                    <ul>
                                        <li>Nick Name:</li>
                                        <li>Email Address:</li>
                                        <li>Created:</li>
                                        <li>Topics Number:</li>
                                        <li>Comments Number:</li>
                                    </ul>
                                </div>
                                <div className="user-info-right">
                                    <ul>
                                        <li>{authorName}</li>
                                        <li>useremail@email.com</li>
                                        <li>{formatToDateAndTimeString(Date.now())}</li>
                                        <li>3</li>
                                        <li>4</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="edit-button-container">
                                {!showChangeAvatarBlock &&
                                <button className="btn" onClick={this.handleChangeAvatarClick}>Change Avatar</button>}
                            </div>
                        </div>
                        <div className="profile-avatar-container">
                            <div className="profile-avatar">
                                {authorAvatar ? (
                                    <img src={authorAvatar} alt=""/>
                                ) : (
                                    <Spinner screenWidth={false}/>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="fl_c"/>
                    {showChangeAvatarBlock && (
                        <div className="profile-info-container update-avatar-container">
                            <div className="profile-info-update-">
                                <div className="form-wrapper">
                                    <div className="avatar-wrapper">
                                        <div className="avatar-title"><label>Choose Your New Avatar:</label></div>
                                        <form
                                            className="register-avatar-form"
                                            ref={this.avatar}
                                        >
                                            <div className="avatar-row">
                                                {facesRow1.map((face, i) => {
                                                    return (
                                                        <div key={face} className="avatar-square">
                                                            <input type="radio" name="avatar" id={`img${i + 1}`} value={face}/>
                                                            <label id="" htmlFor={`img${i + 1}`}
                                                                   onClick={() => this.setCheckedAvatar(face)}><img src={face}
                                                                                                                    alt=""/></label>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            <div className="avatar-row">
                                                {facesRow2.map((face, i) => {
                                                    return (
                                                        <div key={face} className="avatar-square">
                                                            <input type="radio" name="avatar" id={`img${i + 9}`} value={face}/>
                                                            <label
                                                                id=""
                                                                htmlFor={`img${i + 9}`}
                                                                onClick={() => this.setCheckedAvatar(face)}
                                                            >
                                                                <img
                                                                    src={face}
                                                                    alt=""
                                                                />
                                                            </label>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="fl_c"/>
                            <div>
                                <div className="edit-button-container">
                                    <button className="btn" onClick={this.updateAvatar}>Update Avatar</button>
                                    <div className="edit-button-inner">
                                        {updateAvatarLoader && (<Spinner screenWidth={false}/>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    public isUnmount: boolean = false;

    public componentDidMount() {
        if (window) {
            window.scrollTo(0, 0);
        }
        const { user } = this.props;
        const { authorAvatar, authorName } = user || {} as {};
        this.setState({ authorAvatar, authorName });
    }

    public componentWillUnmount() {
        this.isUnmount = true;
    }

    private avatar: React.RefObject<any> = React.createRef();

    // Avatar Handlers
    private handleChangeAvatarClick = (): void => this.setState({ showChangeAvatarBlock: true });
    private setCheckedAvatar = (url: string): void => this.setState({ authorAvatar: url });

    // Handle Update Avatar
    private updateAvatar = async (): Promise<void> => {
        this.setState({ updateAvatarLoader: true });
        const { authorAvatar } = this.state;
        const { uid } = this.props.user;
        const { error, result } = await API.updateUserAvatar({ uid, authorAvatar });
        if (error) {
            Message.error(error);
            this.setState({ updateAvatarLoader: false });
        } else {
            window.scrollTo(0, 0);
            Message.success('Settings has been Updated!');

            this.setState({
                updateAvatarLoader: false,
                showChangeAvatarBlock: false,
                authorAvatar,
            });
        }
    };
}
