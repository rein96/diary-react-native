import React, { Component } from 'react'
import { Button, Text, Container, Form, Item, Input, Label } from 'native-base'
import Fire from '../firebase/index'

class AuthScreen extends Component {

    state = {
        email: '',
        password: ''
    }

    pindahScreen = () => {
        this.props.navigation.navigate('Main')  //bisa 'Kesini'
    }

    authRegister = () => {
        let email = this.state.email
        let password = this.state.password

        // REGISTER
        Fire.auth().createUserWithEmailAndPassword(email, password)
    }

    render() {
        return (
            <Container>
                <Form>

                    <Item stackedLabel >
                        <Label> Email </Label>
                        <Input onChangeText={ (input) => this.setState( { email: input } ) } />
                    </Item>

                    <Item stackedLabel >
                        <Label> Password </Label>
                        <Input secureTextEntry onChangeText={ (input) => this.setState( { password: input } ) } />
                    </Item>

                </Form>

                <Button onPress={this.authRegister} >
                    <Text>REGISTER</Text>
                </Button>



                {/* <Text> AuthScreen </Text>

                <Button onPress={ () => this.pindahScreen() }>
                    <Text>
                        Diary
                    </Text>
                </Button> */}

            </Container>
        )
    }
}

export default AuthScreen
