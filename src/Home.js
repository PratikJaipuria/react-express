import React, { Component } from 'react';
import {BrowserRouter as Router,Route, Link } from 'react-router-dom';
import { browserHistory} from 'react-router';
import axios from 'axios';
import {App} from "./App";
import CommentForm from './CommentForm';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {data: []};
        this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    }


    loadCommentsFromServer() {
        axios.get(this.props.url)
            .then(res => {
                this.setState({ data: res.data });
                console.log(res.data);
            })
    }

    handleCommentSubmit(player) {
        let players = this.state.data;

        player.id = Date.now();
        let newComments = players.concat([player]);
        // console.log("HOME js",newComments);
        // console.log("URL ", this.props.url);

        this.setState({ data: newComments });
        // console.log("HOME js",comment);
        axios.post(this.props.url, player)
            .then(() => browserHistory.push("/play"))
            .catch(err => {
                console.error(err);
                this.setState({ data: players });
            });
    }

    componentDidMount() {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    }

    render(){
        return(
            <Router>
            <div>

                <h1>HOME PAGE</h1>
                <CommentForm onCommentSubmit={ this.handleCommentSubmit }/>
                    {/*<Link to="/play">Play the GAME</Link>*/}
                    <Route path={"/play"} component={App}> </Route>

            </div>
            </Router>

        )
    }
}

export default Home;