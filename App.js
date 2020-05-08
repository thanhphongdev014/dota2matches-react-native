import React,{useEffect, useState} from 'react';
import { StyleSheet, Text, View,TextInput,ScrollView } from 'react-native';
import axios from 'axios';
import game_mode from './constants/game_mode.json'
import heroes from './constants/heroes.json'
import MatchResult from './components/MatchResult'

export default function App() {
  const apiurl = 'https://api.opendota.com/api';
  const [playerId, setplayerId] = useState('');
  const [results, setresults] = useState([]);
  const [errorResult, setErrorResult] = useState('');



  const getMatchResult = (playerSlot, teamRadiantWin) =>{
    let playerTeam = 'radiant';
    let playerMatchResult = 'win';

    switch(playerSlot){
      case 128:
      case 129:
      case 130:
      case 131:
      case 132:
        playerTeam = 'dire'
        break;
    }

    if(!teamRadiantWin && playerTeam =='radiant') playerMatchResult = 'lost';
    if(!teamRadiantWin && playerTeam =='dire') playerMatchResult = 'win';
    if(teamRadiantWin && playerTeam =='dire') playerMatchResult = 'lost';

    return playerMatchResult;
  }

  const getHeroIconUrl = (heroId) => {
    return 'https://api.opendota.com' + heroes[heroId].icon;
  }

  const search =  () =>{
    axios(apiurl+`/players/${playerId}/recentMatches`).then(({data}) =>{
      setresults(data);
      //console.log(results);
    }).catch(err =>{
      setErrorResult('Cannot find any result')
      console.log('co loi co loi co loi'+err);
    })
  }
  return (
    
    <View style={styles.container}>
      <Text style={styles.title}> Find your Dota2 matches </Text>
      <TextInput 
        keyboardType='numeric'
        placeholder='Your Steam id ...'
        style={styles.searchbox}
        onSubmitEditing={search}
        onChangeText={text => setplayerId(text)}/>
        
      <ScrollView>
        {results.map(result => {
          return <MatchResult key={result.match_id} result={result} getMatchResult={getMatchResult}
           getHeroIconUrl={getHeroIconUrl}/>
        }) }
      </ScrollView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    paddingTop: 50,
    paddingHorizontal: 20
  },
  title:{
    color: '#000',
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 30
  },
  searchbox: {
    elevation:1,
    fontWeight:'300',
    fontSize: 20,
    padding: 10,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowRadius: 10,
    shadowOpacity: 0.5
  }
});
