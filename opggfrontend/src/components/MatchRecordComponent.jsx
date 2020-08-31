import React, {Component} from "react";
import champion_table from "../../data/info/champion_table.json";
import summoner_table from "../../data/info/summoner_table.json";
import "./MatchRecord.css";

class MatchRecord extends Component {
    state = {
        playerid: '',
        team: [],
        team_Info: []
    };

    constructor(props) {
        super(props)

        this.state = {
            team: props.data.participantIdentities,
            team_Info: props.data.participants,
            playerid: props.playerid
        }

        console.log(this.state)
    }

    render() {
        let list1 = this.state.team_Info.slice(0, 5).map(record => this.getMatchTable(record))
        let list2 = this.state.team_Info.slice(5, 10).map(record => this.getMatchTable(record))

        // find search user's info
        var user_record
        for (var i = 0; i < 10; i++) {
            if (this.state.team[i].player.summonerName.toLowerCase() === this.state.playerid.toLowerCase()) {
                user_record = this.state.team_Info[i]
            }
        }
        console.log(user_record)

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
            subList1.push(user_record.stats["item" + i] + ".png")
            subList2.push(user_record.stats["item" + (i + 2)] + ".png")
            subList3.push(user_record.stats["item" + (i + 4)] + ".png")
        }

        itemList.push(subList1)
        itemList.push(subList2)
        itemList.push(subList3)

        return (
            <div className="ItemList">
                {itemList.map(list => {
                    const table = (
                        <ul key={(Math.round(Math.random() * 1000000))} className="Item">
                            {list.map(item => {
                               return (
                                        <li key={(Math.round(Math.random() * 1000000))}>
                                            <img
                                                src={require("../../data/img/item/" + item)}
                                                alt=""
                                                className="Content"
                                            />
                                        </li>
                                    )
                            })}
                        </ul>
                    );
                    return table;
                })}
            </div>
        );
    };

    getUserTable = user_record => {
        let user_champion = champion_table[user_record.championId];
        if (user_champion) user_champion += ".png"
        else user_champion = "default.png"
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
                    src={require("../../data/img/champion/" + user_champion)}
                    alt=""
                    className="User Icon"
                />
                <img
                    src={require("../../data/img/spell/" + user_spell1)}
                    alt=""
                    className="User Spell s1"
                />
                <img
                    src={require("../../data/img/spell/" + user_spell2)}
                    alt=""
                    className="User Spell s2"
                />
                <div>
                    <p className="User KDA p1">{user_kda}</p>
                    <p className="User KDA p2">KDA:{user_kda_num}</p>
                </div>
            </div>
        );
    };

    getMatchTable = record => {
        let id = record.participantId - 1;
        let player = this.state.team[id].player.summonerName;
        let championId = this.state.team_Info[id].championId;
        let champion = champion_table[championId]
        var img
        if (!champion) {
            console.log('undifined champion with id' + championId)
            img = 'default.png'
        } else {
            img = champion + ".png"
        }

        return (
            <li key={Math.round(Math.random() * 1000000)} className="ListItem">
                <img
                    src={require("../../data/img/champion/" + img)}
                    alt=""
                    className="championIcon"
                />
                {" " + player}
            </li>
        );
    };
}

export default MatchRecord;
