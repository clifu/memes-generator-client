import React from "react";
import {Link} from "react-router-dom";
import MemeDTO from "../../DTO/MemeDTO";
import LazyLoad from 'react-lazy-load';

const Meme = props => {
    //Way of assigning data to postDTO class
    var post = new MemeDTO(props.data.id, props.data.name, props.data.name, props.data.url);
    return (
        <div className="ui centered card">
            <div className="image">
                <img src={post.imageUrl} alt="image url"/>
            </div>

            <div className="content">
                <div className="ui right floated icon buttons">
                    <Link
                        to={`/list/edit/${post.id}`}
                        className="ui button">
                        <i className="edit outline icon"></i>
                    </Link>
                    <Link
                        className="ui button"
                        to={`/list/delete/${post.id}`}>
                        <i className="trash alternate outline icon"></i>
                    </Link>
                </div>
                {/*<span className="right floated"><i className="thumbs up outline icon"></i>17</span>*/}
                {/*<span className="right floated"><i className="thumbs down outline icon"></i>3</span>*/}

                <LazyLoad
                    debounce={false}
                    throttle={250}
                    >
                    <img className="ui avatar image" src={post.imageUrl} alt="image"/>
                </LazyLoad>


                loginUzytkownika
            </div>
            <div className="content">
                <div className="ui description">
                    {post.description.length > 150 ? post.description.substring(0, 150) + " ..." : post.description}
                </div>
            </div>

            <div className="ui two bottom attached buttons">
                <div className="ui labeled green icon button">

                    <i className="thumbs up icon"/> 17
                </div>
                <div className="ui right labeled red icon button">

                    <i className="thumbs down icon"/>
                    2
                </div>
            </div>
        </div>
    );
};

export default React.memo(Meme);
