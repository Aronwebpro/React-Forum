import * as React from 'react';
import * as PropTypes from 'prop-types';

// Styles
import './commentCreateForm.css';

// Components
import Spinner from '../../common/Spinner';

// @types
type Props = {
    authorAvatar: string
    authorName: string
    quoteText: string
    quoteAuthorName: string
    loading: boolean
    createComment: (text) => void
}

export default class CommentCreateForm extends React.PureComponent<Props, {}> {
    public static propTypes = {
        authorAvatar: PropTypes.string.isRequired,
        authorName: PropTypes.string.isRequired,
        quoteText: PropTypes.string,
        quoteAuthorName: PropTypes.string,
        loading: PropTypes.bool.isRequired,
        createComment: PropTypes.func
    };

    render() {
        const {
            authorAvatar,
            authorName,
            quoteText,
            quoteAuthorName,
            loading
        } = this.props;
        return (
            <div className="full-post" style={{ marginTop: '50px' }}>
                <div className="post">
                    <div className="full-post new-post-body">
                        {quoteText && (
                            <div><span className="theme-color_txt">Replying to...</span><br/>
                                <div className="quote">
                                    <p className="quote-authorName">{quoteAuthorName} said: </p>
                                    <p>"{quoteText}"</p></div>
                            </div>
                        )}
                        <form>
                            <label htmlFor=""><h2>Write a Comment:</h2></label>
                            <textarea
                                name=""
                                id=""
                                cols={30}
                                rows={10}
                                ref={this.respText}
                            />
                        </form>
                        <div>
                            <button
                                className="btn"
                                style={{ marginTop: '20px' }}
                                onClick={this.handleCreateCommentClick}
                            >
                                Post
                            </button>
                            <div className="post-loader">
                                {loading && (<Spinner size={'small'}/>)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="author-info">
                    <img src={authorAvatar} alt=""/>
                    <p>Author: {authorName}</p>
                </div>
                <div className="fl_c"/>
            </div>
        );
    }

    private respText: React.RefObject<HTMLTextAreaElement> = React.createRef();

    handleCreateCommentClick = () => {
        const { createComment } = this.props;
        const text = this.respText.current;
        createComment(text);
    }
}