import React, { Component } from 'react'

import { Container, DatePicker } from 'native-base'

class DatePick extends Component {

    render() {
        return (
            <DatePicker 
                defaultDate={new Date()}
                // minimumDate={new Date(2018, 1, 1)}
                maximumDate={new Date()}
                locale={"en"}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText="Select date"
                textStyle={{ color: "blue" }}
                placeHolderTextStyle={{ color: "blue" }}
                onDateChange={this.props.passingDate}   // ini dikirim oleh AddDiaryScreen.js  <DatePick passingDate={this.getDate} />
                disabled={false}/>
        )
    }
}

export default DatePick
