import React, { Component } from 'react'
import {StyleSheet, View, TextInput, Alert } from 'react-native'
import {connect} from 'react-redux'
import {
    Container,
    Content,
    Card,
    CardItem,
    Text,
    Button,
    Input,
    Item,
    Textarea
} from 'native-base'

import Fire from '../firebase'

// Untuk mengambil data dari navigate menggunakan
// navigation.getParam('nama parameternya') / 'data_employee' from ListEmployees.js
class DetailEmployeeScreen extends Component {

    state = {
        objEmployee : this.props.navigation.getParam('data_employee'),
        editName : this.props.navigation.getParam('data_employee').name,
        editAge : this.props.navigation.getParam('data_employee').age,
        editPosition : this.props.navigation.getParam('data_employee').position,
        edit : false
    }

    onEditButton = () => {
        this.setState( { edit : true } )
    }

    cancelEdit = () => {
        this.setState( { edit:false } )
    }

    saveEdit = async () => { 

        Alert.alert(
            'Do you want to edit this employee ?',
            'This cannot be reverted',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {text: 'Save', onPress: async () => {
                                await Fire.database().ref(`employees/${this.state.objEmployee.id}`)
                                .update({
                                    name : this.state.editName,
                                    age : this.state.editAge,
                                    position : this.state.editPosition
                                })
                    
                                this.props.navigation.goBack()
                                this.props.navigation.goBack()
              }},
            ],
            {cancelable: false},
          );
    }

    onDeleteButton = async () => {
        Alert.alert(
            'Do you want to delete this employee ?',
            'This cannot be reverted',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {text: 'Delete', onPress: async () => {
                                // Menghapus data
                                await Fire.database().ref(`employees/${this.state.objEmployee.id}`).remove()

                                // kembali ke halaman sebelumnya. 
                                this.props.navigation.goBack()
              }},
            ],
            {cancelable: false},
          );

    }


    render() {
        let objEmployee = this.state.objEmployee

        // EDIT UI
        if(this.state.edit === true) {
            return (
            <Container>
                <View style={stylesEdit.container} >
                    <Text style={{ fontSize: 20 }} > Edit Employee </Text>
                    <View style={stylesEdit.wrapper}>
                        
                        <View>
                            <Text> Name </Text>
                            <Item>
                            <Input 
                                defaultValue={objEmployee.name}
                                onChangeText={ (text) => this.setState( { editName : text } )} />
                            </Item>
                        </View>

                        <View>
                            <Text> Age </Text>
                            <Item>
                            <Input 
                                defaultValue={objEmployee.age}
                                onChangeText={ (text) => this.setState( { editAge : text } )} />
                            </Item>
                        </View>

                        <View>
                            <Text> Position (Jabatan) </Text>
                            <Item>
                            <Input 
                                defaultValue={objEmployee.position}
                                onChangeText={ (text) => this.setState( { editPosition : text } )} />
                            </Item>
                        </View>

                        <View style={styles.button}>
                                <Button block onPress={this.saveEdit}><Text>Save</Text></Button>
                                <Button block onPress={this.cancelEdit}><Text>Cancel</Text></Button>
                        </View>

                    </View>

                </View>
            </Container>
            )
        }

        // READ UI
        return (
            <Container>
                <Content>
                    <Text> DetailEmployeeScreen </Text>
                    <Card>
                        <CardItem style={styles.list}>
                            <Text>Name</Text>
                            <Text> {objEmployee.name} </Text>
                        </CardItem>

                        <CardItem style={styles.list}>
                            <Text>Age</Text>
                            <Text> {objEmployee.age} </Text>
                        </CardItem>

                        <CardItem style={styles.list}>
                            <Text>Position</Text>
                            <Text> {objEmployee.position}</Text>
                        </CardItem>


                        <View style={styles.button}>
                            <Button block onPress={this.onEditButton}><Text>Edit</Text></Button>
                            <Button block onPress={this.onDeleteButton}><Text>Delete</Text></Button>
                        </View>
                    </Card>

                    

                </Content>
            </Container>
        )
    }
}

const stylesEdit = StyleSheet.create({
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

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    button: {
        height: 100,
        justifyContent: 'space-between',
        marginTop: 10
    },
    wrapper: {
        width: '90%',
        marginTop: 15
    },
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
    },
    button: {
        height: 100,
        justifyContent: 'space-between',
        marginTop: 10
    },
})

const mapStateToProps = state => {
    return {
        uid: state.auth.uid
    }
}

export default connect( mapStateToProps )(DetailEmployeeScreen)
