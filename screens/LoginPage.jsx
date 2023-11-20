import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackBtn, Button } from '../components';
import styles from './login.style';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { COLORS } from '../constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

//VALIDAÇÃO DE CAMPOS FUNÇÃO
const validationSchema = Yup.object().shape({
    password: Yup.string()
        .min(8, 'Senha deve ter pelo menos 8 caracteres')
        .required('Required'),
    email: Yup.string().email('Forneça um email válido').required('Required'),
});

const LoginPage = ({ navigation }) => {

    const [loader, setLoader] = useState(false);
    const [responseData, setResponseData] = useState(null);
    const [obsecureText, setObsecureText] = useState(false);

    const inValidForm = () => {
        Alert.alert(
            "Formulário Inválido",
            "Por favor forneça os campos requeridos",
            [
                {
                    text: "Cancel", onPress: () => { }
                },
                {
                    text: "Continue", onPress: () => { }
                },
                { defaultIndex: 1 }
            ]);
    };

    const login = async (values) => {
        setLoader(true);
      
        try {
          const endpoint = "https://api-gq7y.onrender.com/api/login";
          const data = values;
          const response = await axios.post(endpoint, data);
      
          if (response.status === 200) {
            await AsyncStorage.setItem(
              `user${response.data._id}`,
              JSON.stringify(response.data)
            );
            await AsyncStorage.setItem("id", JSON.stringify(response.data._id));
            await AsyncStorage.setItem("token", JSON.stringify(response.data.token));
            navigation.replace("Bottom Navigation");
          } else {
            // Exibir mensagem de erro para credenciais inválidas
            Alert.alert(
              "Error",
              "Por favor forneça credenciais válidas",
              [
                { text: "Continue", onPress: () => {} },
                { defaultIndex: 0 }
              ]
            );
          }
        } catch (error) {
          // Exibir mensagem de erro genérica
          Alert.alert(
            "Error",
            "Oops, erro ao fazer o login. Tente novamente com as credenciais corretas",
            [
              { text: "Continue", onPress: () => {} },
              { defaultIndex: 0 }
            ]
          );
        } finally {
          setLoader(false);
        }
      };
      

    return (
        <ScrollView>
            <SafeAreaView style={{ marginHorizontal: 20 }}>
                <View>
                    <BackBtn onPress={() => navigation.goBack()} />
                    <Image
                        source={require('../assets/images/bk.png')}
                        style={styles.cover}
                    />

                    <Text style={styles.title}>CUPKAT</Text>
                    <Formik
                        initialValues={{ email: "", password: "" }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => login(values)}
                    >

                        {({ handleChange, handleBlur, touched, handleSubmit, values, errors, isValid, setFieldTouched }) => (
                            <View>

                                <View style={styles.wrapper}>
                                    <Text style={styles.label}>Email</Text>
                                    <View style={styles.inputWrapper(touched.email ? COLORS.secondary : COLORS.offwhite)}>
                                        <MaterialCommunityIcons
                                            name='email-outline'
                                            size={20}
                                            color={COLORS.gray}
                                            style={styles.iconStyle}
                                        />

                                        <TextInput
                                            placeholder="Enter email"
                                            onFocus={() => { setFieldTouched('email') }}
                                            onBlur={() => { setFieldTouched('email', '') }}
                                            value={values.email}
                                            onChangeText={handleChange('email')}
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            style={{ flex: 1 }}
                                        />
                                    </View>
                                    {touched.email && errors.email && (
                                        <Text style={styles.errorMessage}>{errors.email}</Text>
                                    )}

                                </View>

                                <View style={styles.wrapper}>
                                    <Text style={styles.label}>Senha</Text>
                                    <View style={styles.inputWrapper(touched.password ? COLORS.secondary : COLORS.offwhite)}>
                                        <MaterialCommunityIcons
                                            name='lock-outline'
                                            size={20}
                                            color={COLORS.gray}
                                            style={styles.iconStyle}
                                        />

                                        <TextInput
                                            secureTextEntry={obsecureText}
                                            placeholder="Senha"
                                            onFocus={() => { setFieldTouched('password') }}
                                            onBlur={() => { setFieldTouched('password', '') }}
                                            value={values.password}
                                            onChangeText={handleChange('password')}
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            style={{ flex: 1 }}
                                        />

                                        <TouchableOpacity onPress={() => { setObsecureText(!obsecureText) }}>
                                            <MaterialCommunityIcons
                                                name={obsecureText ? "eye-outline" : "eye-off-outline"}
                                                size={18}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    {touched.password && errors.password && (
                                        <Text style={styles.errorMessage}>{errors.password}</Text>
                                    )}

                                </View>

                                <Button
                                    loader={loader}
                                    title={"L O G I N"} onPress={isValid ? handleSubmit : inValidForm} isValid={isValid} />

                                <Text style={styles.registration} onPress={() => { navigation.navigate('SignUp') }}> Cadastre-se </Text>

                            </View>
                        )}

                    </Formik>


                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

export default LoginPage