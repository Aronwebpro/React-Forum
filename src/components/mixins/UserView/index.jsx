import React from 'react';
import PropTypes from 'prop-types';
import {formatToDateString, formatToTimeString} from "../../../utils";



export default class UserView extends React.PureComponent {
    render() {
        const {authorAvatar, authorName, memberSince, type, lastReply} = this.props;
        const date = formatToDateString(memberSince);
        return type === 'last' ? (
            <table>
                <tbody>
                <tr>
                    <th style={{
                        textAlign: 'right',
                        fontWeight: '600',
                        fontSize: '1.1em'
                    }}>Most Recent
                    </th>
                    <th rowSpan="3" width="50px">
                        <img src={authorAvatar} alt=""/>
                    </th>
                </tr>
                <tr>
                    <td style={{textAlign: 'right'}}><span
                        className="theme-color_txt">By:</span> <span style={{
                        textAlign: 'right',
                        fontWeight: '600'
                    }}>{authorName}</span></td>
                </tr>
                <tr>
                    <td style={{textAlign: 'right'}}>{`${formatToDateString(lastReply)} ${formatToTimeString(lastReply)}`}</td>
                </tr>
                </tbody>
            </table>
        ) : (
            <div>
                <div className="author-avatar">
                    <img src={authorAvatar} alt="Author Avatar"/>
                </div>
                <div className="topic-meta theme-color_txt">
                    <p>
                        By: <span className="author">{authorName} </span>
                    </p>
                    <p>
                        Member Since: <span className="date">{date}</span>
                    </p>
                </div>
            </div>
        )
    }
}

UserView.propTypes = {
    authorAvatar: PropTypes.string.isRequired,
    authorName: PropTypes.string.isRequired,
    memberSince: PropTypes.number,
    type: PropTypes.string,
    lastReply: PropTypes.number,
};