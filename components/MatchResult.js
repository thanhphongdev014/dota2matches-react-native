import React from 'react'
import { View, Text,StyleSheet,Image } from 'react-native'

export default function MatchResult({result, getMatchResult, getHeroIconUrl}) {
    
    return (
        
        <View style={styles.container}>
            <Text style={styles.item}>
                Result:
                {
                    (getMatchResult(result.player_slot,result.radiant_win)==='win') ? 
                    <Text style={styles.matchResultWin}>  Win</Text> :
                    <Text style={styles.matchResultLost}>  Lost</Text>
                }
            </Text>

            <Text style={styles.item}>Duration: {Math.floor(result.duration/60)}:{result.duration - Math.floor(result.duration/60)*60}</Text>
            <Text style={styles.item}>KDA: {result.kills}/{result.deaths}/{result.assists}</Text>
            <View style={styles.item}>
                <Text style={{textAlignVertical: 'center'}}>Hero:  </Text>
                <Image source={{uri: getHeroIconUrl(result.hero_id)}} style={[styles.image]} />
            </View>
        </View>

        
    )
}

const styles = StyleSheet.create({
    container: {
        elevation: 1,
        flex: 1,
        
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        flexGrow: 0.2,
        marginTop: 30,
        marginBottom: 10,
        marginHorizontal: 5,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        shadowColor: '#fff',
        shadowOpacity: 0.5,
        shadowRadius: 10,
        textShadowOffset: {width:0,height:0}
    },
    matchResultWin: {
        color: 'green',
        fontWeight: '700'
    },
    matchResultLost: {
        color: 'red',
        fontWeight: '700'
    },
    image: {
        width: 32,
        height: 32
    },
    item: {
        textAlignVertical: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%',
        height: 50
    }

});






