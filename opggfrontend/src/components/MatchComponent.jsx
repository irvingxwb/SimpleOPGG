import React, {Component} from "react";
import {InputGroup, FormControl, Button, ListGroup} from "react-bootstrap";
import axios from "axios";
import "./Login.css";
import config from "../Config/server.json";

import MatchRecord from "./MatchRecordComponent";

/* eslint-disable */

class Match extends Component {
    state = {
        summonerid: React.createRef(),
        match_data: [],
        display_data: [],
        ShowRecord: false,
        idx_cnt: 0,
    };


    render() {
        return (
            <div>
                <div>{this.getSearchblock()}</div>
                <div className="MatchList">{this.getMatchList()}/></div>
                <div className="MatchIndex">{this.getIndex(this.state.idx_cnt)}</div>
            </div>
        );
    }

    getIndex = (idx_count) => {
        var index = (
            <ListGroup horizontal>
                {[...Array(idx_count).keys()].map(value => <ListGroup.Item action OnClick={this.handleSwitching(value)}>value</ListGroup.Item>)}
            </ListGroup>)
    }

    getSearchblock() {
        const search = (
            <InputGroup className="search">
                <FormControl ref={this.state.summonerid} type="text"/>
                <InputGroup.Append>
                    <Button variant="primary" onClick={this.handleSearch}>
                        Search
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        );
        return search;
    }

    getMatchList() {
        const MatchList = (
            <ul>
                {this.state.ShowRecord && this.state.display_data.map(record => {
                        const ret = <MatchRecord key={record.gameDuration} data={record}
                                                 playerid={this.state.summonerid.current.value}/>
                        return ret
                    }
                )}
            </ul>
        );
        return MatchList
    }

    handleSwitching = (idx) => {
        this.setState({display_data: match_data.slice(idx * 5, idx * 5 + 1)})
    }

    handleSearch = async () => {
        let url = config.server + config.matchdata
        let params = new URLSearchParams()
        params.append('summonername', this.state.summonerid.current.value)
        params.append('region', 'na1')

        let response = await axios.post(url, params)
        this.setState({match_data: response.data.data})
        this.setState({display_data: response.data.data.slice(0, 5)})
        this.setState({ShowRecord: true})
        this.setState({idx_cnt: Math.ceil(response.data.data.length / 5)})
    }

}

export default Match;
