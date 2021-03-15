import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Container, Text, Textarea, Button, Item, Input } from 'native-base'
import { connect } from 'react-redux'

import Fire from '../firebase/index'

// input karyawan : Menginput data karyawan dengan data Nama, Usia, Jabatan

class AddEmployeeScreen extends Component {

    state = {
        name : '',
        age : '',
        position : ''
    }

    addEmployee = async () => {
    
        await Fire.database().ref(`employees/`).push({
            name : this.state.name,
            age : this.state.age,
            position : this.state.position
        })

        // back to EmployeeScreen.js
        this.props.navigation.goBack()
    }

    render() {
        return (
            <Container>
                <View style={styles.container} >
                    <Text style={{ fontSize: 20 }} > Add Employee </Text>
                    <View style={styles.wrapper}>

                        
                        <View>
                            <Text> Name </Text>
                            <Item>
                            <Input 
                                placeholder='Employee name' 
                                onChangeText={ (text) => this.setState( { name : text } )} />
                            </Item>
                        </View>

                        <View>
                            <Text> Age </Text>
                            <Item>
                            <Input 
                                placeholder='Employee age' 
                                onChangeText={ (text) => this.setState( { age : text } )} />
                            </Item>
                        </View>

                        <View>
                            <Text> Position (Jabatan) </Text>
                            <Item>
                            <Input 
                                placeholder='Employee position' 
                                onChangeText={ (text) => this.setState( { position : text } )} />
                            </Item>
                        </View>


                        <View style={styles.button} >
                            <Button onPress={ this.addEmployee }  block>
                                <Text> ADD EMPLOYEE </Text>
                            </Button>
                        </View>

                    </View>

                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    wrapper: {
        width: '90%',
        marginTop: 15
    },
    button: {
        marginTop: 10
    },
    flaslist: {
        alignSelf: 'stretch'
    }
})


const mapStateToProps = state => {
    return{
        uid: state.auth.uid
    }
}

export default connect( mapStateToProps )(AddEmployeeScreen)
