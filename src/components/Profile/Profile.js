import React from "react";
import MemeList from '../Memes/MemeList'
import Meme from "../Memes/Meme";


class Profile extends  React.Component {

    state = {
        activeTabIndex: 0
    };

    tabItems = [
        {
            tabName: "Memy",
            tabIndex: 0},
        {
            tabName: "Zaproszenia do znajomych",
            tabIndex: 1
        }
    ];

    renderUserData = () => {
        return (
            <div className="ui internally celled grid">
                <div className="six wide column">
                    <div className="ui medium circular image">
                        <img src="https://www.national-geographic.pl/media/cache/default_view/uploads/media/default/0012/70/nie-uwierzysz-jak-powstalo-najslynniejsze-zdjecie-einsteina-przeczytaj-historie.jpeg" alt="image url"/>
                    </div>
                </div>
                <div className="ten wide column">
                    <div style={{margin: "auto"}}>
                        <div className="row" style={{textAlign: 'center',  display: 'flex', justifyContent: 'space-between'}}>
                            Username
                            <button className="ui button">Edytuj profil</button>
                            <button className="circular ui icon button">
                                <i className="icon settings"></i>
                            </button></div>
                        <div className="row"  style={{textAlign: 'center'}}>Posty:0 Liczba znajomych 0</div>
                        <div className="row"  style={{textAlign: 'center'}}>Imie i nazwisko</div>
                    </div>
                </div>
            </div>
        );
    };

    activateItemOnClick = id => {
        this.setState({activeTabIndex: id})
    }

    renderMenu = () => {
        return (
            <div className="ui two item menu">
                {this.tabItems.map((item, idx) => (
                    <a className={`item${idx === this.state.activeTabIndex ? " active" : ""}`}
                     onClick={() => this.activateItemOnClick(item.tabIndex)} key={idx}>
                        {item.tabName}
                    </a>))
                }
            </div>
        );
    };

    renderData = () => {
        if(this.state.activeTabIndex === 0) {
            //memes
            return <MemeList/>
        }
        else if (this.state.activeTabIndex === 1) {
            //friends requests TEMPORARY TODO
            return (<div className="ui cards">
                <div className="card">
                    <div className="content">
                        <img className="right floated mini ui image" src=""/>
                            <div className="header">
                                Elliot Fu
                            </div>
                            <div className="meta">
                                Friends of Veronika
                            </div>
                            <div className="description">
                                Elliot requested permission to view your contact details
                            </div>
                        </div>
                    <div className="extra content">
                        <div className="ui two buttons">
                            <div className="ui basic green button">Approve</div>
                            <div className="ui basic red button">Decline</div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="content">
                        <img className="right floated mini ui image" src=""/>
                            <div className="header">
                                Jenny Hess
                            </div>
                            <div className="meta">
                                New Member
                            </div>
                            <div className="description">
                                Jenny wants to add you to the group <b>best friends</b>
                            </div>
                    </div>
                    <div className="extra content">
                        <div className="ui two buttons">
                            <div className="ui basic green button">Approve</div>
                            <div className="ui basic red button">Decline</div>
                        </div>
                    </div>
                </div>
            </div>)
        }
    }

    render() {
        return (<div>
                {this.renderUserData()}
                <div className="ui divider"/>
                {this.renderMenu()}
                {this.renderData()}
            </div>
        );
    }
}

export default Profile;