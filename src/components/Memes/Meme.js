//temporary to display post
import React from "react";
import {Link} from "react-router-dom";
import MemeDTO from "../../DTO/MemeDTO";

const Meme = props => {
    //Way of assigning data to postDTO class
    var post = new MemeDTO(props.data.id, props.data.title, props.data.description, props.data.imageUrl);
    return (
        <div className="ui card">
            <div className="image">
                <img src={post.imageUrl} alt="image url"/>
            </div>
            <div className="content">
                <div className="ui header">{post.title}</div>
                <div className="ui description">{post.description}</div>
            </div>
            <div className="extra content">
                <div className="ui icon buttons">

                    <Link
                        to={`/posts/edit/${post.id}`}
                        className="ui button">
                        <i className="edit outline icon"></i>
                    </Link>
                    <Link
                        className="ui button"
                        to={`/posts/delete/${post.id}`}>
                        <i className="trash alternate outline icon"></i>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default React.memo(Meme);
