import React, { Component } from "react";
import {InputGroup, FormControl, Button} from "react-bootstrap";
import axios from "axios";
import "./Login.css";
import config from "../Config/server.json";

import MatchRecord from "./MatchRecordComponent";

/* eslint-disable */

class Match extends Component {
  state = {
    summonerid: React.createRef(),
    match_list: [],
    ShowRecord: false
  };

//   async componentDidMount() {
//     if (this.state.summonerid != '') {
//         let url = config.server + config.matchdata
//         let params = new URLSearchParams()
//         params.append('summonername', this.state.summonerid)
//         params.append('region', 'na1')
//
//         let response = await axios.post(url, params)
//         this.setState({match_list: response.data.data})
//         this.setState({ShowRecord: true})
//     }
//   }

  render() {
    return (
      <div>
        <div>{this.getSearchblock()}</div>
        <div className="MatchList">{this.getMatchList()}/></div>
      </div>
    );
  }

  getSearchblock() {
    const search = (
      <InputGroup className="search">
        <FormControl ref={this.state.summonerid} type="text" />
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
        {this.state.ShowRecord && this.state.match_list.map(record =>
        {
          const ret = <MatchRecord key={record.gameDuration} data={record} playerid={this.state.summonerid.current.value}/>
          return ret
        }
        )}
      </ul>
    );
    return MatchList
  }

  handleSearch = async () => {
    let url = config.server + config.matchdata
    let params = new URLSearchParams()
    params.append('summonername', this.state.summonerid.current.value)
    params.append('region', 'na1')

    let response = await axios.post(url, params)
    this.setState({match_list: response.data.data})
    this.setState({ShowRecord: true})
  }

}

export default Match;
