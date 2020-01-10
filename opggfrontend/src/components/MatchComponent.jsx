import React, { Component } from "react";
import {InputGroup, FormControl, Button} from "react-bootstrap";
import axios from "axios";
import "./Login.css";
import config from "../Config/server.json";

import MatchRecord from "./MatchRecordComponent";

/* eslint-disable */

class Match extends Component {
  state = {
    summonerid: 'ezrealiar',
    matchdata_list: [],
    isShowrecord: false
  };

  async componentDidMount() {
    let url = config.server + config.matchdata
    let params = new URLSearchParams()
    params.append('summonername', this.state.summonerid)
    params.append('region', 'na1')

    let response = await axios.post(url, params)
    this.setState({matchdata_list: response.data.data})
  }

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
        {this.state.matchdata_list.map(record =>
        {
          const ret = <MatchRecord key={record.gameDuration} data={record}/>
          return ret
        }
        )}
      </ul>
    );

    return MatchList
  }
/* deprecated 

  handleSearch = async () => {
    var Url =
      "https://" +
      config["region"] +
      config["summonerid_url"] +
      this.state.summonerid.current.value +
      config["api_key"];

    let result = await axios(Url);

    Url =
      "https://" +
      config["region"] +
      config["matchlist_url"] +
      result.data.accountId +
      config["api_key"];

    result = await axios(Url);
    this.setState({
      matchlist: result.data.matches,
      isShowrecord: true,
      submatchlist: result.data.matches.slice(0, 10)
    });
    console.log(this.state.submatchlist);
  };
*/
}

export default Match;
