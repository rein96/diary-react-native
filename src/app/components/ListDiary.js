import React, { Component } from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Text } from 'native-base';
import {withNavigation} from 'react-navigation'

// this.props.data from DiaryScreen.js (FlatList) -> data : { ..., item: {title, date, diary} } -> this.props.data.item
class ListDiary extends Component {

    touchable = () => {
        // Navigate to DetailDiary: DetailDiaryScreen (createStackNavigator)
        this.props.navigation.navigate('DetailDiary', { data_diary : this.props.data.item } )   // This object is sent to DetailDiaryScreen.js
    }

    render() {
        return (
            <TouchableOpacity onPress={ this.touchable } > 
                <View style={styles.list}>
                    <Text> {this.props.data.item.title} </Text>
                    <Text> {this.props.data.item.date} </Text>
                    {/* .map -> this.props.data.title
                        Flatlist -> this.props.data.item.title */}
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    list: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'rgb(241,210,247)',
        padding: 10,
        marginVertical: 5,
    }
})

export default withNavigation(ListDiary)
