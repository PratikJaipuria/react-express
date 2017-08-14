import React, { Component } from 'react';
// import {BrowserRouter as Router,Route, Link } from 'react-router-dom';
import style from './style';
// import {App} from "./App";

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = { name: '' };
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        // this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleAuthorChange(e) {
        this.setState({ name: e.target.value });
    }
    // handleTextChange(e) {
    //     this.setState({ text: e.target.value });
    // }
    handleSubmit(e) {
        e.preventDefault();
        let name = this.state.name.trim();
        // let text = this.state.text.trim();
        if ( !name) {
            return;
        }
        this.props.onCommentSubmit({ name: name });
        this.setState({ name: '' });
    }

    render() {
        return (
            <form style={ style.commentForm } onSubmit={ this.handleSubmit }>
                <input
                    type='text'
                    placeholder='Your name...'
                    style={ style.commentFormAuthor}
                    value={ this.state.name }
                    onChange={ this.handleAuthorChange } />
                {/*<input*/}
                    {/*type='text'*/}
                    {/*placeholder='Say something...'*/}
                    {/*style={ style.commentFormText}*/}
                    {/*value={ this.state.text }*/}
                    {/*onChange={ this.handleTextChange } />*/}
                    <input
                        type='submit'
                        style={ style.commentFormPost }
                        value='Play'
                    />


            </form>
        )
    }
}

export default CommentForm;
