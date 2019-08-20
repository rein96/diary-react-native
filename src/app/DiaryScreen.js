import React, { Component } from 'react'

import { View, Text, BackHandler, StyleSheet, FlatList } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import {Container, Button} from 'native-base'
import { connect } from 'react-redux'

import ListDiary from './components/ListDiary'

import Fire from '../firebase/index'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor : 'blue',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        marginVertical: 20  // react-native -> 20 = 20 unit = 20 pixel
    },
    flaslist: {
        alignSelf: 'stretch'
    }
})

class DiaryScreen extends Component {

    state = {
        snapShot: {}    // we want change from {} => []
    }

    onBackButton = () => {
        alert('Tombol back ditekan')

        // Prevent Back Button cannot back to authScreen.js
        return true;
    }

    onAddDiary = () => {
        // ini props.navigation bisa dipake karena di App.js const DiaryStack = creteStackNavigator({})
        this.props.navigation.navigate('AddDiary')
    }

    getData =  () => {
        // .once() get data
        Fire.database().ref(`diary/${this.props.uid}`).once('value', (snapShot) => {
            // Jika datanya ditemukan 
            if(snapShot.exists()) {
                this.setState( { snapShot : snapShot.val() } )  // object of object
                // // .val() => prototype(), harus pake untuk menerima value dari Firebase database
                console.log(this.state.snapShot)    // Object of object
            } else {
                this.setState( { snapShot : {} } )
            }
        })
    }

    renderList = () => {
        let keysDiary = Object.keys(this.state.snapShot)
        let listDiary = []

        // key : id dari diary
        keysDiary.forEach( (key) => {
            listDiary.push({
                title: this.state.snapShot[key].title,
                diary: this.state.snapShot[key].diary,
                date: this.state.snapShot[key].date,
                id: key // key = LmDISdWB2TIWafafawd from Firebase, to make each list unique
            })
        })

        // Flatlist method
        return <FlatList
                    keyExtractor = { (item) => item.id }    //remove Virtualizedlist warning
                    style = {styles.flaslist} 
                    data={listDiary} 
                    renderItem={ (asd) => {
                        return <ListDiary data={asd} key={asd.id} />      //remove 'each child should have a key' warning
                    }} 
                />

        // .map method  (in react-native USE FLATLIST !! DO NOT USE .map())
        // listDiary.map( (item) => {
        //    return <ListDiary data={item}  />
        // })
    }

    // Mau pake tag dari native-base harus pake Container dari native-base
    render() {
        return (
            <Container>
                <Text> DiaryScreen NIH </Text>
                <NavigationEvents
                    // similar to componentDidMount (2)
                    onDidFocus= { () => {
                        BackHandler.addEventListener('hardwareBackPress', this.onBackButton )   // disabled the back button
                        this.getData()
                    }}
                    
                    // similar to componentWillUnmount (3)
                    // When DiaryScreen move to other screen (e.g ProfileScreen), it will remove the eventlistener
                    onWillBlur={ () => {
                        BackHandler.removeEventListener('hardwareBackPress', this.onBackButton)
                    }}
                />

                   <View style={styles.container}>
                        {this.renderList()}

                        <View>
                            <Button onPress={this.onAddDiary} >
                                <Text> AddDiary </Text>
                            </Button>
                        </View>

                   </View>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return{
        uid: state.auth.uid
    }
}

export default connect( mapStateToProps )(DiaryScreen)
