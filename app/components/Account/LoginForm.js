import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import { validateEmail } from '../../utils/Validation';
import * as firebase from 'firebase';
import { withNavigation } from "react-navigation";
import Loading from '../../components/Loading';

function LoginForm(props) {
    const { toastRef, navigation } = props;
    const [hidePassword, setHidePassword] = useState(true);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        if (!email || !password) {
            toastRef.current.show('Todos los campos son obligatorios');
        } else {
            if (!validateEmail(email)) {
                toastRef.current.show('Correo electronico inavlido');
            } else {
                setLoading(true);
                await firebase.auth()
                    .signInWithEmailAndPassword(email,password)
                    .then(() => {
                        navigation.navigate('MyAccount');
                    })
                    .catch(() => {
                        toastRef.current.show('Email o contraseña incorrecta');
                    })
            }
        }
        setLoading(false);
    }

    return (
      <View style={styles.formContainer}>
        <Input
          placeholder="Correo electronico"
          containerStyle={styles.inputForm}
          onChange={e => setEmail(e.nativeEvent.text)}
          rightIcon={
            <Icon
              type="material-community"
              name="at"
              iconStyle={styles.iconRigth}
            />
          }
        />
        <Input
          placeholder="Cotraseña"
          password={true}
          secureTextEntry={hidePassword}
          containerStyle={styles.inputForm}
          onChange={e => setPassword(e.nativeEvent.text)}
          rightIcon={
            <Icon
              type="material-community"
              name={hidePassword ? "eye-outline" : "eye-off-outline"}
              iconStyle={styles.iconRigth}
              onPress={() => setHidePassword(!hidePassword)}
            />
          }
        />
        <Button
          title="Iniciar sesión"
          containerStyle={styles.btnContainerLogin}
          buttonStyle={styles.btnLogin}
          onPress={login}
        />
        <Loading isVisible={loading} text='Iniciando sesión'/>
      </View>
    );
}

export default withNavigation(LoginForm);


const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30
  },
  inputForm: {
    width: "100%",
    marginTop: 20
  },
  iconRigth: {
    color: "#c1c1c1"
  },
  btnContainerLogin: {
    marginTop: 20,
    width: "95%"
  },
  btnLogin: {
    backgroundColor: "#00a680"
  }
});