import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Container, Text, Textarea, Button, Item, Input } from 'native-base'
import { connect } from 'react-redux'

import DatePick from './components/DatePick'

import Fire from '../firebase/index'
import ListDiary from './components/ListDiary';

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

class AddDiaryScreen extends Component {

    state = {
        title: '',
        diary: '',
        date: new Date()
    }

    getDate = (tanggal) => {
        this.setState({ date:tanggal })
    }

    addDiary = async () => {
        // .ref() = similar to add collection / table
        await Fire.database().ref(`diary/${this.props.uid}`).push({
            title: this.state.title,
            diary: this.state.diary,
            date: this.state.date.toString().substr(4, 12)  
        })

        // kembali ke halaman sebelumnya
        this.props.navigation.goBack()
    }


    render() {
        return (
            <Container>
                <View style={styles.container} >
                    <Text style={{ fontSize: 20 }} > Add Diary </Text>
                    <View style={styles.wrapper}>

                        <DatePick passingDate={this.getDate} />
                        
                        <Item rounded>
                            <Input 
                                placeholder='Diary Title :)' 
                                onChangeText={ (text) => this.setState( { title : text } )} />
                        </Item>

                        <Textarea 
                            bordered 
                            rowSpan= {15} 
                            placeholder='Your Story :D' 
                            onChangeText={ (diary) => this.setState( { diary } ) }  />

                        <View style={styles.button} >
                            <Button onPress={ this.addDiary }  block>
                                <Text> ADD DIARY </Text>
                            </Button>
                        </View>

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

export default connect( mapStateToProps )(AddDiaryScreen)
