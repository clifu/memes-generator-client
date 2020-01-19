import React from "react";
import {Link} from "react-router-dom";

const Meme = props => {
    //Way of assigning data to postDTO class
    var meme = props.data;
    const isOwner = props.loggedUserProfileId === meme.profileId;
    const profileImagePlaceholder = 'https://www.waspcom.com/wp-content/uploads/2014/10/user-placeholder-circle-1.png';

    // this.addMemeRate = function (id, positive) {
    //
    //     const rate = {
    //         profileId: this.props.loggedUserProfileId,
    //         postId: id,
    //         positiveRate: positive
    //     };
    //     return this.props.rateMeme(rate);
    // };

    function getProfileThumbnailImage() {
        return (meme.profile && meme.profile.thumbnailImageUrl) ? meme.profile.thumbnailImageUrl : profileImagePlaceholder;
    }

    return (
        <div className="ui centered card">
            <div className="image">
                <img src={meme.imageUrl} alt="image url"/>
            </div>

            <div className="content">
                {isOwner ? <div className="ui right floated icon buttons">
                    <Link
                        to={`/list/edit/${meme.id}`}
                        className="ui button">
                        <i className="edit outline icon"/>
                    </Link>
                    <Link
                        className="ui button"
                        to={`/list/delete/${meme.id}`}>
                        <i className="trash alternate outline icon"/>
                    </Link>
                </div> : null}

                <img className="ui avatar image"
                     src={getProfileThumbnailImage()}
                     alt=""/>
                {meme.profile && meme.profile.username}
            </div>
            <div className="content">
                <a className="header">{meme.title}</a>
                <div className="ui description">
                    {meme.description.length > 150 ? meme.description.substring(0, 150) + " ..." : meme.description}
                </div>
            </div>

            <div className="ui two bottom attached buttons">
                <div className="ui labeled green icon button">
                    <i className="thumbs up icon"/> {meme.positiveRates}</div>
                <div className="ui right labeled red icon button">
                    < i className="thumbs down icon"/>{meme.negativeRates}
                </div>
            </div>
        </div>
    );
};

export default React.memo(Meme);
