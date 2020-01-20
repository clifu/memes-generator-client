import React from "react";
import {ErrorMessage, Formik} from "formik";
import MemeDTO from "../../DTO/MemeDTO";
import "./MemeCreator.css";
import {connect} from "react-redux";
import {createMemeImage} from "../../actions";

class MemeForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            templates: [],
            selectedTemplateUrl: null,
            selectedTemplateId: null,
            text0: "",
            text1: "",
            generatedMemeBase64: "",
        };

    }

    setSelectedTemplate(template) {
        this.setState({selectedTemplateUrl: template.url, selectedTemplateId: template.id});
    }

    renderTemplate(template) {
        return (<div id={template.id} className="ui template-card">
            <div className="ui bordered rounded image">
                <img src={template.url} onClick={() => this.setSelectedTemplate(template)}/>
            </div>
        </div>)
    }

    renderSelectedTemplate() {
        return (
            <div className="ui bordered centered rounded selected-template image">
                {this.getImageToPreview() ? <img src={this.getImageToPreview()} alt="preview"/> : null}
            </div>
        );
    }

    getImageToPreview() {
        if (this.props.imageUrl)
            return this.props.imageUrl;
        else
            return (this.props.initialValues && this.props.initialValues.imageUrl)
                ? this.props.initialValues.imageUrl
                : this.state.selectedTemplateUrl;
    }

    onSaveButtonClick = formikValues => {
        formikValues.imageUrl = this.props.imageUrl ? this.props.imageUrl : this.props.initialValues.imageUrl;
        formikValues.profileId = this.props.loggedUserProfileId;
        this.props.onSubmit(formikValues);
    };

    onCancelButtonClick = () => {
        this.props.onCancelButtonClick();
    };

    validateTitleAndDescription = values => {
        let errors = {};
        if (!values.title) {
            errors.title = "Title is required";
        }

        if (!values.description) {
            errors.description = "Description is required";
        }
        return errors;
    };

    componentDidMount() {
        fetch('https://api.imgflip.com/get_memes')
            .then(data => data.json())
            .then((data) => {
                this.setState({templates: data.data.memes})
            })
            .catch(console.log)
    }

    canPreview() {
        return (this.state.selectedTemplateUrl != null && this.state.text0 != null && this.state.text0.length > 0);
    }

    canSave() {
        return (this.props.imageUrl != null || (this.props.initialValues && this.props.initialValues.imageUrl != null));
    }

    renderActions(handleSubmit) {
        return (
            <React.Fragment>
                <button
                    className="ui button primary"
                    disabled={!this.canPreview()}
                    onClick={this.handlePreview}
                    type="button">
                    Podgląd
                </button>
                <button
                    className="ui button positive"
                    onClick={handleSubmit}
                    disabled={!this.canSave()}
                    type="submit">
                    Zapisz
                </button>
                <button
                    className="ui button negative"
                    onClick={this.onCancelButtonClick}
                    type="submit">
                    Anuluj
                </button>
                {this.state.generatedMemeBase64}
            </React.Fragment>
        );
    }

    render() {
        return (
            <div>
                <div className="container">
                    {this.renderTemplateSegment()}
                    <div className="ui two column grid">
                        <div className="column">
                            {this.renderSelectedTemplate()}
                        </div>
                        <div className="column">
                            <div className="segment">
                                {this.renderForm()}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        );
    }

    renderForm() {
        let post;
        if (this.props.initialValues) {
            post = new MemeDTO(null,
                this.props.initialValues.title,
                this.props.initialValues.description,
                this.props.initialValues.imageUrl,
            );
        }
        return (<Formik
            initialValues={
                {
                    title: post ? post.title : "",
                    description: post ? post.description : "",
                    text0: post ? post.text0 : "",
                    text1: post ? post.text1 : ""
                }
            }
            validate={this.validateTitleAndDescription}
            onSubmit={values => this.onSaveButtonClick(values)}>

            {({values, handleChange, handleBlur, handleSubmit}) => (
                <form className="ui form error" onSubmit={handleSubmit}>
                    <label>Tytuł</label>
                    <div className="field">
                        <input
                            type="text"
                            name="title"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.title}/>
                        <ErrorMessage
                            name="title"
                            render={msg => (<div className="ui pointing red basic label">{msg}</div>)}/>
                    </div>
                    <label>Opis</label>
                    <div className="field">
                        <textarea
                            name="description"
                            rows="2"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.description}/>
                        <ErrorMessage
                            name="description"
                            render={msg => (<div className="ui pointing red basic label">{msg}</div>)}/>
                    </div>
                    <label>Tekst 1</label>
                    <div className="field">
                        <input
                            type="text"
                            name="text0"
                            onChange={(e) => this.setState({text0: e.target.value})}
                            onBlur={handleBlur}
                            value={this.state.text0}/>
                    </div>
                    <label>Tekst 2</label>
                    <div className="field">
                        <input
                            type="text"
                            name="text1"
                            onChange={(e) => this.setState({text1: e.target.value})}
                            onBlur={handleBlur}
                            value={this.state.text1}/>
                    </div>

                    <div>
                        {this.renderActions(handleSubmit)}
                    </div>
                </form>
            )}
        </Formik>)
    }

    renderTemplateSegment() {
        return (
            <div className="ui segment template-segment">
                {this.state.templates ? this.state.templates.map((template) => this.renderTemplate(template))
                    : <div className="ui active inverted dimmer">
                        <div className="ui text loader">Loading</div>
                    </div>}
            </div>
        );
    }

    handlePreview = () => {
        this.props.createMemeImage(
            {
                templateId: this.state.selectedTemplateId,
                text0: this.state.text0,
                text1: this.state.text1
            }
        )
    };

    generateBase64(imageUrl) {
        const image2base64 = require('image-to-base64');
        image2base64(imageUrl)
            .then((response) => {
                this.setState({generatedMemeBase64: response})
            })
            .catch((error) => {
                console.log(error)
            });
    }
}

function mapStateToProps(state) {
    return {
        loggedUserProfileId: state.auth.profileId,
        imageUrl: state.generatedMeme.imageUrl
    };
}

export default connect(mapStateToProps, {createMemeImage})(MemeForm);
