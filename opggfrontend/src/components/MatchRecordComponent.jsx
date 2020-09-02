import React, {Component} from "react";
import champion_table from "../../data/info/champion_table.json";
import summoner_table from "../../data/info/summoner_table.json";
import "./MatchRecord.css";

class MatchRecord extends Component {
    state = {
        playerid: '',
        game_Info: []
    };

    constructor(props) {
        super(props)

        this.state = {
            game_Info: props.data,
            playerid: props.playerid
        }

        console.log(this.state)
    }

    render() {
        let list1 = this.state.game_Info.participants.slice(0, 5).map(record => this.getMatchTable(record))
        let list2 = this.state.game_Info.participants.slice(5, 10).map(record => this.getMatchTable(record))

        // find search user's info
        var user_record, isWin
        for (var i = 0; i < 10; i++) {
            if (this.state.game_Info.participantIdentities[i].player.summonerName.toLowerCase() === this.state.playerid.toLowerCase()) {
                user_record = this.state.game_Info.participants[i]
                isWin = user_record.stats['win']
            }
        }
        console.log(user_record)
        if (isWin) {
            return (
                <div className="MatchRecord win">
                    {this.getMatchInfo(user_record)}
                    {this.getUserTable(user_record)}
                    {this.getItemTable(user_record)}
                    <ul className="List p1">{list1}</ul>
                    <ul className="List p2">{list2}</ul>
                </div>
            );
        }
        else {
            return (
                <div className="MatchRecord lose">
                    {this.getMatchInfo(user_record)}
                    {this.getUserTable(user_record)}
                    {this.getItemTable(user_record)}
                    <ul className="List p1">{list1}</ul>
                    <ul className="List p2">{list2}</ul>
                </div>
            );
        }


    }

    getMatchInfo = (user_record) => {
        var isWin = user_record.stats['win'] ? "Win" : "Lost"
        var mode = this.state.game_Info.gameMode
        var time = this.state.game_Info.gameDuration
        var min = Math.floor(time / 60)
        var sec = time % 60
        return (
            <div className="MatchInfo">
                <p className="Info win">{isWin}</p>
                <p className="Info mode">{mode}</p>
                <p className="Info time">{min}m {sec}s</p>
            </div>)
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
        let player = this.state.game_Info.participantIdentities[id].player.summonerName;
        let championId = this.state.game_Info.participants[id].championId;
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
