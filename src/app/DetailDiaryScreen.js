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
    Textarea
} from 'native-base'

import Fire from '../firebase'

// Untuk mengambil data dari navigate menggunakan
// navigation.getParam('nama parameternya') / 'data_diary'
class DetailDiaryScreen extends Component {

    state = {
        // obtained from ListDiary.js -> this.props.navigation.navigate('DetailDiary', { data_diary : this.props.data.item } ) 
        objDiary: this.props.navigation.getParam('data_diary'),    // objDiary : { title, diary, date }
        edit : false,
        editTitle : this.props.navigation.getParam('data_diary').title,
        editDiary: this.props.navigation.getParam('data_diary').diary
    }

    onDeleteButton = async () => {
        Alert.alert(
            'Do you want to delete now ?',
            'This cannot be reverted',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {text: 'Delete', onPress: async () => {
                                console.log(this.props.uid)     // VkSH7EjPbuZmAtok96s74h0F9wr2
                                console.log(this.state.diary.id)    // LmNMTq4_FIkdiD1jV8n
                                console.log(this.state.diary)    // 
                                    // Menghapus data
                                await Fire.database().ref(`diary/${this.props.uid}/${this.state.objDiary.id}`).remove()

                                    // kembali ke halaman sebelumnya. 
                                this.props.navigation.goBack()
              }},
            ],
            {cancelable: false},
          );

    }

    onEditButton = () => {
        this.setState( { edit : true } )
    }

    saveEdit = async () => { 
        Alert.alert(
            'Do you want to edit now ?',
            'This cannot be reverted',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {text: 'Save', onPress: async () => {
                                await Fire.database().ref(`diary/${this.props.uid}/${this.state.objDiary.id}`)
                                .update({
                                    title : this.state.editTitle,
                                    diary : this.state.editDiary
                                })
                    
                                this.updateDiary()
              }},
            ],
            {cancelable: false},
          );
    }

    updateDiary = () => {
        this.props.navigation.goBack()
        this.props.navigation.goBack()
    }

    cancelEdit = () => {
        this.setState( { edit:false } )
    }

    
    render() {
        // Mengambil data yang di kirim dari navigate
        var objDiary = this.state.objDiary

        // Edit UI
        if (this.state.edit === true) {
            return (
                <Container>
                    <Content>
                        <Card>
                            <CardItem header bordered style={styles.row} >
                                <View style={styles.wrapper} >
                                    <Textarea style={styles.headerText} defaultValue={objDiary.title} onChangeText={ (text) => this.setState( { editTitle : text } )} />
                                    {/* <Input defaultValue={objDiary.date} />  */}

                                </View>
                            </CardItem>

                            <CardItem>
                                <View style={styles.wrapper}>
                                    <Textarea 
                                    bordered 
                                    rowSpan= {15}  defaultValue={objDiary.diary} onChangeText={ (text) => this.setState( { editDiary : text } )} />
                                </View>
                            </CardItem>

                            <View style={styles.button}>
                                <Button block onPress={this.saveEdit}><Text>Save</Text></Button>
                                <Button block onPress={this.cancelEdit}><Text>Cancel</Text></Button>
                            </View>
                        </Card>
                    </Content>
                </Container>
            )
        }

        // initial render (edit : false)
        return (
            <Container>
                <Content>
                    <Card>
                        <CardItem header bordered style={styles.row}>
                            <Text style={styles.headerText}>{objDiary.title}</Text>
                            <Text>{objDiary.date}</Text>
                        </CardItem>
                        <CardItem>
                            <Text>{objDiary.diary}</Text>
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
    }
})


const mapStateToProps = state => {
    return {
        uid: state.auth.uid
    }
}
export default connect(mapStateToProps)(DetailDiaryScreen)