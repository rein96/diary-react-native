import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native' 
import { Button, Text, Container, Form, Item, Input, Label } from 'native-base'
import Fire from '../firebase/index'
import { connect } from 'react-redux'

import { onLogin } from '../store/actions/index'


class AuthScreen extends Component {

    state = {
        email: '',
        password: '',
        confirm :'',
        fullName: '',
        nickName :'',
        age: '',
        login: true     // first page -> login, when login=false -> register
    }

    componentDidMount(){
        // Check if there is a user logged in
        Fire.auth().onAuthStateChanged( (user) => {

            if(user) {
                // Login to redux
               this.props.onLoginUser( user.uid, user.email ) 

                // Redirect / Navigate to  Main: MainTab
                this.props.navigation.navigate('Main')
            }
        })
    }

    // switch login false/true
    onSwitch = () => {
        this.setState( { login: !this.state.login } )
    }

    // Register / Login Button
    authButton = async () => {
        let email = this.state.email        // register & login
        let password = this.state.password  // register & login
        let confirm = this.state.confirm    // register only

        if(this.state.login){
            // LOGIN

            try {
                // Login di firebase
                let user = await Fire.auth().signInWithEmailAndPassword(email, password)
                
                // Login di app
                await this.props.onLoginUser(user.uid, user.email)

                // Pindah ke halaman utama
                this.props.navigation.navigate('Main')
            } catch (error) {
                // jika terjadi error pada block kode 'try', akan kita munculkan pesan errornya
                alert(error.message)
            }
        } else {
            // REGISTER
            // if (this.state.login === false)

            if(password.length < 6){
                alert('Password harus minimal 6 karakter')
            } else {
                if (password == confirm) {
                    let res = await Fire.auth()
                                .createUserWithEmailAndPassword(email, password)

                    // tambahan Senin 19 Agustus
                    // Create data user di Firebase 'Database'
                    // Use 'set' (will not generate random id) instead of 'push' (push will generate random id like diary database)
                    await Fire.database().ref(`users/${res.user.uid}`).set({
                        fullName: this.state.fullName,
                        nickName: this.state.nickName,
                        age: this.state.age
                    })

                    // Login Redux
                    this.props.onLoginUser( res.user.uid, res.user.email )

                    // Main : MainTab (createBottomTabNavigator)
                    this.props.navigation.navigate('Main')
                } else {
                    alert('Password dan Confirm harus sama')
                }
            }
        }   
    }

    render() {
        let titleTopButton, form

        if(!this.state.login){
            // RENDER REGISTER FORM
            titleTopButton = 'Switch to Login'
            titleBotBottom = 'Register'
            form = (
                <Form>
                    {/* style: stackedLabel */}
                    <Item stackedLabel>
                        <Label>Full Name</Label>
                        <Input 
                            // Update state dg text yang di ketik
                            onChangeText={(text) => this.setState({fullName: text})}
                        />
                    </Item>
                    <Item stackedLabel>
                        <Label>Nick Name</Label>
                        <Input 
                            // Update state dg text yang di ketik
                            onChangeText={(text) => this.setState({nickName: text})}
                        />
                    </Item>
                    <Item stackedLabel>
                        <Label>Email</Label>
                        <Input 
                            // Update state dg text yang di ketik
                            onChangeText={(text) => this.setState({email: text})}
                        />
                    </Item>
                    
                    <Item stackedLabel>
                        <Label>Age</Label>
                        <Input 
                            // Update state dg text yang di ketik
                            onChangeText={(text) => this.setState({age: text})}
                        />
                    </Item>
                    <Item stackedLabel>
                        <Label>Password</Label>
                        <Input 
                            // Agar yang kita ketik akan di hide
                            secureTextEntry
                            // Update state dg text yang di ketik
                            onChangeText={(text) => this.setState({password: text})}
                        />
                    </Item>
                    <Item stackedLabel>
                        <Label>Confirm Password</Label>
                        <Input 
                            // Agar yang kita ketik akan di hide
                            secureTextEntry
                            // Update state dg text yang di ketik
                            onChangeText={(text) => this.setState({confirm: text})}
                        />
                    </Item>
                </Form>
            )
        } else {
            // RENDER LOGIN FORM
            titleTopButton = 'Switch to Register'
            titleBotBottom = 'Login'
            form = (
                <Form>
                    {/* style: stackedLabel */}
                    <Item stackedLabel>
                        <Label>Email</Label>
                        <Input 
                            // Update state dg text yang di ketik
                            onChangeText={(text) => this.setState({email: text})}
                        />
                    </Item>
                    <Item stackedLabel>
                        <Label>Password</Label>
                        <Input 
                            // Agar yang kita ketik akan di hide
                            secureTextEntry
                            // Update state dg text yang di ketik
                            onChangeText={(text) => this.setState({password: text})}
                        />
                    </Item>
                </Form>
            )
        }

        // Initial render()
        return (
            <Container>

                <View style={styles.titleContainer} >
                     <Text style={styles.title} >Authentication Screen</Text>
                </View>
                
                <View style={styles.button} >
                    <Button bordered primary onPress={this.onSwitch}>
                        <Text>{titleTopButton}</Text>
                    </Button>

                </View>

                    {/* render login or register form */}
                    {form}

                <Button block primary onPress={this.authButton}>
                    <Text>{titleBotBottom}</Text>
                </Button>


            </Container>
    )
    }
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 15
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15
    }
});



// 1st way
// this.props.uid
// const mapStateToProps = state => {
//     return {
//         uid:state.auth.uid,
//     }
// }
// export default connect( null, { onLogin } )(AuthScreen)


// 2nd way
// this.props.onLoginUser
const mapDispatchToProps = dispatch => {
    return {
        onLoginUser: (uid, email) => {dispatch(onLogin(uid, email) )}
        // onLogin from action index.js
    }
}
export default connect(null, mapDispatchToProps)(AuthScreen)


