import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackBtn, Button } from '../components';
import styles from './login.style';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons"
import { COLORS, SIZES } from '../constants';
import axios from 'axios';

//VALIDAÇÃO DE CAMPOS FUNÇÃO
const validationSchema = Yup.object().shape({
    password: Yup.string()
        .min(8, 'Senha deve ter pelo menos 8 caracteres')
        .required('Required'),
    email: Yup.string().email('Forneça um email válido').required('Required'),
    location: Yup.string().min(3, 'Forneça um local válido').required('Required'),
    username: Yup.string().min(3, 'Forneça um username válido').required('Required'),
});

const SignUp = ({ navigation }) => {
    const [loader, setLoader] = useState(false);
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
            ]
        );
    };


    const registerUser = async(values)=>{
        setLoader(true);
        try {
            const endpoint = 'https://api-gq7y.onrender.com/api/register';
            const data = values;

            const response = await axios.post(endpoint, data);

            if(response.status === 201){
                navigation.replace('Login')
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <ScrollView>
            <SafeAreaView style={{ marginHorizontal: 20 }}>
                <View>
                    <BackBtn onPress={() => navigation.goBack()} />
                    <Image
                        source={require('../assets/images/bk.png')}
                        style={{
                            height: SIZES.height / 5,
                            width: SIZES.width - 60,
                            resizeMode: "contain",
                            marginBottom: SIZES.xxLarge
                        }}
                    />

                    <Text style={styles.title}>Criar conta </Text>
                    <Formik
                        initialValues={{ email: "", password: "", location: "", username: "" }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => registerUser(values)}
                    >

                        {({ handleChange, handleBlur, touched, handleSubmit, values, errors, isValid, setFieldTouched }) => (
                            <View>

                                {/* ...CAMPO USERNAME... */}
                                <View style={styles.wrapper}>
                                    <Text style={styles.label}>Username</Text>
                                    <View style={styles.inputWrapper(touched.username ? COLORS.secondary : COLORS.offwhite)}>
                                        <MaterialCommunityIcons
                                            name='face-woman-profile'
                                            size={20}
                                            color={COLORS.gray}
                                            style={styles.iconStyle}
                                        />

                                        <TextInput
                                            placeholder="Username"
                                            onFocus={() => { setFieldTouched('username') }}
                                            onBlur={() => { setFieldTouched('username', '') }}
                                            value={values.username}
                                            onChangeText={handleChange('username')}
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            style={{ flex: 1 }}
                                        />
                                    </View>
                                    {touched.username && errors.username && (
                                        <Text style={styles.errorMessage}>{errors.username}</Text>
                                    )}

                                </View>

                                {/* ...CAMPO EMAIL... */}
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

                                {/* ...CAMPO LOCAL... */}
                                <View style={styles.wrapper}>
                                    <Text style={styles.label}>Location</Text>
                                    <View style={styles.inputWrapper(touched.location ? COLORS.secondary : COLORS.offwhite)}>
                                        <Ionicons
                                            name='location-outline'
                                            size={20}
                                            color={COLORS.gray}
                                            style={styles.iconStyle}
                                        />

                                        <TextInput
                                            placeholder="Enter local"
                                            onFocus={() => { setFieldTouched('location') }}
                                            onBlur={() => { setFieldTouched('location', '') }}
                                            value={values.location}
                                            onChangeText={handleChange('location')}
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            style={{ flex: 1 }}
                                        />
                                    </View>
                                    {touched.location && errors.location && (
                                        <Text style={styles.errorMessage}>{errors.location}</Text>
                                    )}

                                </View>

                                {/* ...CAMPO SENHA... */}
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
                                 title={"C R I A R "}
                                 onPress={isValid ? handleSubmit : inValidForm}
                                 loader={loader} 
                                 isValid={isValid} />



                            </View>
                        )}

                    </Formik>


                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

export default SignUp