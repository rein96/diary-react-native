import React, { Component } from 'react'
import { View, Text, BackHandler, StyleSheet, FlatList } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import {Container, Button} from 'native-base'
import { connect } from 'react-redux'

import ListEmployees from './ListEmployees'

import Fire from '../firebase/index'

class EmployeeScreen extends Component {

    state = {
        snapShot : {}
    }

    onBackButton = () => {
        alert('Do not leave this application please :D')

        // Prevent back button cannot back to authScreen.js
        return true;
    }

    onAddEmployee = () => {
        // Navigate to AddEmployee : AddEmployeeScreen
        this.props.navigation.navigate('AddEmployee')
    }

    getEmployee =  () => {
        Fire.database().ref(`employees`).once('value', (snapShot) => {
            // if employee object is exist
            if(snapShot.exists()) {
                // console.log('snapshot is exist')
                this.setState( { snapShot : snapShot.val() } )
                // console.log(this.state.snapShot)
            // if employee object is not exist, return {} 
            } else {
                // console.log('snapshot is NOT exist')
                this.setState( { snapShot : {} } )
            }
        })
    }

    renderEmployeeList = () => {
        let keysEmployee = Object.keys(this.state.snapShot)
        let listEmployees = []

        // key : id dari diary
        keysEmployee.forEach( (key) => {
            listEmployees.push({
                name: this.state.snapShot[key].name,
                age: this.state.snapShot[key].age,
                position: this.state.snapShot[key].position,
                id: key // key = LmDISdWB2TIWafafawd from Firebase, to make each list unique
            })
        })

        // Flatlist to render listDiary = [ {}, {}, {} ]
        return <FlatList
                    keyExtractor = { (item) => item.id }
                    style = {styles.flaslist}
                    data = {listEmployees}
                    renderItem = { (hehe) => {
                        return <ListEmployees data={hehe} key={hehe.id} />
                    }}
                />

    }

    render() {

        return (
            <Container>
                <Text style={styles.center}> EmployeeScreen </Text>

                <NavigationEvents
                    // similar to componentDidMount (2)
                    onDidFocus= { () => {
                        BackHandler.addEventListener('hardwareBackPress', this.onBackButton )   // disabled the back button
                        this.getEmployee()
                    }}

                    // similar to componentWillUnmount (3)
                    // When DiaryScreen move to other screen (e.g ProfileScreen), it will remove the eventlistener
                    onWillBlur={ () => {
                        BackHandler.removeEventListener('hardwareBackPress', this.onBackButton)
                    }}                   
                />

                <View style={styles.container}>
                        {this.renderEmployeeList()}

                        <View style={styles.button}>
                            <Button block onPress={this.onAddEmployee} >
                                <Text style={styles.text}> Add Employee </Text>
                            </Button>
                        </View>

                </View>

            </Container>
        )
    }
}

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize : 28
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        marginVertical: 20,  // react-native -> 20 = 20 unit = 20 pixel,
        color: 'white',
    },
    flaslist: {
        alignSelf: 'stretch'
    },
    text: {
        color: 'white'
    }
})

const mapStateToProps = state => {
    return{
        uid: state.auth.uid
    }
}


export default connect( mapStateToProps )(EmployeeScreen)
