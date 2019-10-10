import * as React from 'react';
import * as PropTypes from 'prop-types';

// Utils
import {
    formatToDateString,
    formatToTimeString
} from '../../../../lib/utils/index';

// Components
import Spinner from '../Spinner';

// @types

type Props = {
    authorAvatar?: string
    authorName?: string
    memberSince: string
    type: string
    lastReply: string
}

export default class UserView extends React.PureComponent<Props, {}> {
    public static propTypes = {
        authorAvatar: PropTypes.string,
        authorName: PropTypes.string,
        memberSince: PropTypes.number,
        type: PropTypes.string,
        lastReply: PropTypes.number,
    };

    render() {
        const {
            authorAvatar,
            authorName,
            memberSince,
            type,
            lastReply
        } = this.props;
        const date = formatToDateString(memberSince);

        if (!authorName || !authorAvatar) {
            return (
                <Spinner screenWidth={false}/>
            )
        }

        return type === 'last' ? (
            <table>
                <tbody>
                <tr>
                    <th
                        style={{
                            textAlign: 'right',
                            fontWeight: 600,
                            fontSize: '1.1em'
                        }}
                    >
                        Most Recent
                    </th>
                    <th
                        rowSpan={3}
                        style={{ width: '50px' }}
                    >
                        <img src={authorAvatar} alt=""/>
                    </th>
                </tr>
                <tr>
                    <td style={{ textAlign: 'right' }}>
                        <span className="theme-color_txt">By:</span>
                        <span
                            style={{
                                textAlign: 'right',
                                fontWeight: 600
                            }}
                        >
                            {authorName}
                        </span>
                    </td>
                </tr>
                <tr>
                    <td style={{ textAlign: 'right' }}>
                        {`${formatToDateString(lastReply)} ${formatToTimeString(lastReply)}`}
                    </td>
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