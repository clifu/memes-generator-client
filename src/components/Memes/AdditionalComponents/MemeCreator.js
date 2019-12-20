import React from "react";
import "./MemeCreator.css";
import {Slider} from "react-semantic-ui-range";

class MemeCreator extends React.Component {
    state = {
        templates: [],
        selectedTemplateUrl: null,
        value1: 4
    };

    componentDidMount() {
        // this.props.fetchMemes();
        fetch('https://api.imgflip.com/get_memes')
            .then(data => data.json())
            .then((data) => {
                this.setState({templates: data.data.memes})
            })
            .catch(console.log)
    }

    setSelectedTemplate(e) {
        this.setState({selectedTemplateUrl: e.target.src})
    }

    renderTemplate(template) {
        return (<div className="ui template-card">
            <div className="ui bordered rounded image" href="#">
                <img src={template.url} onClick={(e) => this.setSelectedTemplate(e)}/>
            </div>
        </div>)

    }

    render() {
        return (
            <div className="container">
                <div className="ui segment">
                    {this.state.templates.map((template) => this.renderTemplate(template))}
                </div>

                {this.state.selectedTemplateUrl ?
                    this.renderSelectedTemplate()

                    : null}

            </div>

        );
    }

    renderSelectedTemplate() {
        return (

            <div className="ui two column grid">
                <div className="column">

                    <div className="ui bordered centered medium rounded image">
                        <img src={this.state.selectedTemplateUrl}/>
                        <h2>A Movie in the Park:<br/>Kung Fu Panda</h2>
                    </div>
                </div>
                <div className="column">
                    <div className="ui relaxed list">
                        <div className="item">
                            <i className="large arrows alternate horizontal icon"/>
                            <div className="content">
                                <Slider
                                    inverted={false}
                                    settings={{
                                        start: this.state.value1,
                                        min: 0,
                                        max: 10,
                                        step: 1,
                                        onChange: value => {
                                            this.setState({
                                                value1: value
                                            });
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        <div className="item">
                            <i className="large text height icon"/>
                            <div className="content">
                                <Slider
                                    inverted={false}
                                    settings={{
                                        start: this.state.value1,
                                        min: 0,
                                        max: 10,
                                        step: 1,
                                        onChange: value => {
                                            this.setState({
                                                value1: value
                                            });
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div className="item">
                            <i className="large arrows alternate vertical icon"/>
                            <div className="content">
                                <Slider
                                    inverted={false}
                                    settings={{
                                        start: this.state.value1,
                                        min: 0,
                                        max: 10,
                                        step: 1,
                                        onChange: value => {
                                            this.setState({
                                                value1: value
                                            });
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div className="item">
                            <i className="large caret square down icon"/>
                            <div className="content">
                                <Slider
                                    inverted={false}
                                    settings={{
                                        start: this.state.value1,
                                        min: 0,
                                        max: 10,
                                        step: 1,
                                        onChange: value => {
                                            this.setState({
                                                value1: value
                                            });
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div className="item">
                            <i className="large caret square right icon"/>
                            <div className="content">
                                <Slider
                                    inverted={false}
                                    settings={{
                                        start: this.state.value1,
                                        min: 0,
                                        max: 10,
                                        step: 1,
                                        onChange: value => {
                                            this.setState({
                                                value1: value
                                            });
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div className="item">
                            <i className="large adjust icon"/>
                            <div className="content">
                                <div className="ui toggle checkbox">
                                    <input type="checkbox"/>
                                    <label/>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*https://codesandbox.io/s/vm7yvzm103?from-embed*/}

                </div>


            </div>

        );
    }
}

export default MemeCreator;
