import React, { Component } from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Text, Card, CardItem } from 'native-base';
import {withNavigation} from 'react-navigation'

// this.props.data from EmployeeScreen.js (FlatList) -> data : { ..., item: {name, age, position} } -> this.props.data.item
class ListEmployees extends Component {

    touchable = () => {
        // Navigate to DetailEmployee: DetailEmployeeScreen (createStackNavigator)
        this.props.navigation.navigate('DetailEmployee', { data_employee : this.props.data.item } )   // This object is sent to DetailEmployeeScreen.js
    }

    render() {
        const { name, age, position } = this.props.data.item
        return (
            <TouchableOpacity onPress={ this.touchable } > 

                <Card>
                    <CardItem style={styles.list}>
                        <Text>Name</Text>
                        <Text> {name} </Text>
                    </CardItem>

                    <CardItem style={styles.list}>
                        <Text>Age</Text>
                        <Text> {age} </Text>
                    </CardItem>

                    <CardItem style={styles.list}>
                        <Text>Position</Text>
                        <Text> {position}</Text>
                    </CardItem>
                </Card>

            </TouchableOpacity>
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

export default withNavigation(ListEmployees)
