import React, {Component} from "react";
import champion_table from "../../data/loldata/info/champion_table.json";
import summoner_table from "../../data/loldata/info/summoner_table.json";
import "./MatchRecord.css";

let playerMap = {};

class MatchRecord extends Component {
  state = {
    team : [],
    team_Info: []
  };

  constructor(props) {
    super(props);
    let temp_array = [];
    temp_array[0] =  props.data.participants.slice(0, 5);
    temp_array[1] =  props.data.participants.slice(5, 10);

    this.state = {
      team: props.data.participantIdentities,
      team_Info: temp_array
    };

  }

  render() {
    let list1 = this.state.team_Info[0].map(record => this.getMatchTable(record));
    let list2 = this.state.team_Info[1].map(record => this.getMatchTable(record));

    let user_id = playerMap["Ezrealiar"];
    // find search user's info
    var user_record;
    if (user_id > 4) user_record = this.state.team_Info[1][user_id - 5];
    else user_record = this.state.team_Info[0][user_id];

    return (
        <div className="MatchRecord">
          {this.getUserTable(user_record)}
          {this.getItemTable(user_record)}
          <ul className="List p1">{list1}</ul>
          <ul className="List p2">{list2}</ul>
        </div>
    );
  }

  getItemTable = user_record => {
    let itemList = [];
    let subList1 = [];
    let subList2 = [];
    let subList3 = [];
    for (var i = 0; i < 2; i++) {
      subList1.push(user_record.stats["item" + i] + ".png");
      subList2.push(user_record.stats["item" + (i + 2)] + ".png");
      subList3.push(user_record.stats["item" + (i + 4)] + ".png");
    }

    itemList.push(subList1);
    itemList.push(subList2);
    itemList.push(subList3);

    return (
      <div className="ItemList">
        {itemList.map(list => {
          const table = (
            <ul key={(Math.round(Math.random() * 1000000))} className="Item">
              {list.map(item => {
                return (
                  <li key={(Math.round(Math.random() * 1000000))}>
                    <img 
                      src={require("../../data/loldata/img/item/" + item)}
                      alt=""
                      className="Content"
                    />
                  </li>
                );
              })}
            </ul>
          );
          return table;
        })}
      </div>
    );
  };

  getUserTable = user_record => {
    let user_champion = champion_table[user_record.championId] + ".png";
    let user_spell1 = summoner_table[user_record.spell1Id] + ".png";
    let user_spell2 = summoner_table[user_record.spell2Id] + ".png";
    let user_kda =
      user_record.stats.kills +
      " / " +
      user_record.stats.deaths +
      " / " +
      user_record.stats.assists;
    let user_kda_num = (
      (user_record.stats.kills + user_record.stats.assists) /
      user_record.stats.deaths
    ).toFixed(2);

    return (
      <div className="User">
        <img
          src={require("../../data/loldata/img/champion/" + user_champion)}
          alt=""
          className="User Icon"
        />
        <img
          src={require("../../data/loldata/img/spell/" + user_spell1)}
          alt=""
          className="User Spell s1"
        />
        <img
          src={require("../../data/loldata/img/spell/" + user_spell2)}
          alt=""
          className="User Spell s2"
        />
        <div>
          <p className="User KDA p1">{user_kda}</p>
          <p className="User KDA p2">KDA:{user_kda_num}</p>
        </div>
        {this.getItemTable(user_record)}
      </div>
    );
  };

  getMatchTable = user_record => {
    let id = user_record.participantId - 1;
    let player = this.state.team[id].player.summonerName;
    let champion = champion_table[user_record.championId];
    let img = champion + ".png";

    playerMap[player] = id;

    return (
      <li key={Math.round(Math.random() * 1000000)} className="ListItem">
        <img
          src={require("../../data/loldata/img/champion/" + img)}
          alt=""
          className="championIcon"
        />
        {" " + player}
      </li>
    );
  };
}

export default MatchRecord;
