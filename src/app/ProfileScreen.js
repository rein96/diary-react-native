import React, { Component } from 'react'
import { connect } from 'react-redux'

import { View, StyleSheet } from 'react-native'
import { Text, Button, Container, CardItem, Card } from 'native-base'
import { NavigationEvents } from 'react-navigation'
import axios from 'axios'

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'

import { onLogout } from '../store/actions/index'

import Fire from '../firebase/index'

class ProfileScreen extends Component {

    state = {
        profileObj: {},
        // initial location { Sinarmas MSIG Tower }  
        location : {
            latitude : -6.210654,
            longitude : 106.822337,
            latitudeDelta: 0.015,
            longitudeDelta : 0.021
        }
    }

    saveLocation = async () => {
        // https://locationiq.com/docs (REVERSE GEOCODING)
        var reinToken = 'pk.d71d63f8bea14b098daaa8191712e3ec'
        let res = await axios.get(`https://us1.locationiq.com/v1/reverse.php?key=${reinToken}&lat=${this.state.location.latitude}&lon=${this.state.location.longitude}&format=json`)

        console.log(res.data.address);
        
        await Fire.database().ref(`users/${this.props.uid}`).update({
            address : res.data.address.address29
        })

        console.log(res.data.address.address29)
        
        this.getProfile()
    }

    getProfile = async () => {
        console.log('onDidFocus call me')
        // .once() -> READ data
        const res = await Fire.database().ref(`users/${this.props.uid}`).once('value', (snapShot) => {
            if(snapShot.exists()) {
                console.log('snapShot is exist !')
                this.setState( { profileObj : snapShot.val() } ) 
            }
            
        })
        console.log(res)
        console.log(this.state.profileObj)
    }

    profileCart = () => {
        const { fullName, nickName, age, address } = this.state.profileObj
        return  (
        <Card style={styles.topProfile}>
            <CardItem style={styles.list}>
                <Text>Fullname</Text>
                <Text> {fullName} </Text>
            </CardItem>

            <CardItem style={styles.list}>
                <Text>Nickname</Text>
                <Text> {nickName} </Text>
            </CardItem>

            <CardItem style={styles.list}>
                <Text>Age</Text>
                <Text> {age}</Text>
            </CardItem>

            <CardItem style={styles.list}>
                <Text>Address</Text>
                <Text> {address}</Text>
            </CardItem>
        </Card>
    )}
    
    onPressLogout = async () => {
        // Logout from firebase
        await Fire.auth().signOut()

        // Logout from redux
        this.props.onLogout()

        this.props.navigation.navigate('Auth')
    }
    
    render() {
        return (
            <Container>

                <NavigationEvents onDidFocus = { () => { this.getProfile()} }/>

                <Card>
                    <CardItem style={styles.list}>

                        <Text style={styles.headerText} > Profile Screen </Text>
                        <Button bordered rounded small onPress={this.saveLocation} >
                            <Text> LOCATION </Text>
                        </Button>
                        <Button bordered rounded small onPress={this.onPressLogout} >
                            <Text> LOGOUT </Text>
                        </Button>

                    </CardItem>
                </Card>

                <View>
                    { this.profileCart() }
                </View>

                <MapView
                    // -6.210654, 106.822337 (Purwadhika)
                    provider={PROVIDER_GOOGLE}  // imported 
                    style = {styles.map}
                    showsUserLocation
                    onPress={ (e) => {
                        this.setState( { location : e.nativeEvent.coordinate } )    // push coordinate that user clicks, to state
                    }}
                    region = {{
                        latitude : this.state.location.latitude,
                        longitude : this.state.location.longitude,
                        latitudeDelta: 0.015,
                        longitudeDelta : 0.021
                    }}
                >
                    <Marker coordinate={this.state.location} />

                </MapView>

            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex : 1
    },
    list: {
        justifyContent: 'space-between'
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'blue'
    },
    map : {
        width: '100%',
        height: 400
    }
})

const mapStateToProps = state => ({
    uid : state.auth.uid
})

export default connect(mapStateToProps, { onLogout })(ProfileScreen)