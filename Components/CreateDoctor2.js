import React, { useState } from 'react';
import { View, Text, TouchableOpacity, handleSignUp,handleLogin,TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import * as DocumentPicker from 'expo-document-picker';

export default function CreateDoctor2() {
    const navigation = useNavigation();
    const [specialisation, setSpecialisation] = useState('');
    const [practicingTenure, setPracticingTenure] = useState('');
    const [degree, setDegree] = useState('');
    const [batchYear, setBatchYear] = useState('');
    const [curriculumVitae, setCurriculumVitae] = useState(null);
    const [uploadMessage, setUploadMessage] = useState('');

    const handleDocumentPicker = async () => {
        try {
            const res = await DocumentPicker.getDocumentAsync({
                type: ['application/pdf', 'image/*'],
            });
            if (res.type === 'cancel') {
                console.log('User canceled the document selection');
            } else {
                setCurriculumVitae(res);
                setUploadMessage('Document successfully uploaded');
                console.log('Selected file:', res.uri);
            }
        } catch (err) {
            console.error('Error selecting document:', err);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonText}>{'<'} Back</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Create Account</Text>
            </View>
            <Text style={styles.subtitle}>Let's Continue!</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Specialisation</Text>
                <RNPickerSelect
                    onValueChange={(value) => setSpecialisation(value)}
                    items={[
                        { label: 'Dentist', value: 'dentist' },
                        { label: 'Cardiologist', value: 'cardiologist' },
                        { label: 'Dermatologist', value: 'dermatologist' },
                    ]}
                    style={pickerSelectStyles}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Practicing Tenure</Text>
                <RNPickerSelect
                    onValueChange={(value) => setPracticingTenure(value)}
                    items={[
                        { label: '1 year', value: '1' },
                        { label: '2 years', value: '2' },
                        { label: '5 years', value: '5' },
                        { label: '10+ years', value: '10' },
                    ]}
                    style={pickerSelectStyles}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Degree</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Degree"
                    value={degree}
                    onChangeText={setDegree}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Batch Year</Text>
                <RNPickerSelect
                    onValueChange={(value) => setBatchYear(value)}
                    items={Array.from({ length: 65 }, (v, i) => ({ label: `${1960 + i}`, value: `${1960 + i}` }))}
                    style={pickerSelectStyles}
                />
            </View>

            <View style={styles.cvContainer}>
                <Text style={styles.labelCV}>Curriculum Vitae</Text>
                <TouchableOpacity style={styles.uploadCVButton} onPress={handleDocumentPicker}>
                    <Text style={styles.uploadCVButtonText}>Upload Document</Text>
                </TouchableOpacity>
                {curriculumVitae && (
                    <View>
                        <Text style={styles.fileName}>{curriculumVitae.name}</Text>
                        <Text style={styles.uploadMessage}>{uploadMessage}</Text>
                    </View>
                )}
            </View>

            <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
                <Text style={styles.signUpButtonText}>Continue</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLogin}>
                <Text style={styles.loginText}>Already have an account? <Text style={styles.loginLink}>Log in</Text></Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        backgroundColor: '#141824',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginTop: 25,
        marginLeft: 1,
    },
    backButtonText: {
        color: '#FD6639',
        fontSize: 18,
    },
    title: {
        marginTop: 45,
        marginLeft: 25,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FD6639',
        textAlign: 'center',
        marginVertical: 20,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: '#ffffff',
        marginBottom: 5,
    },
    uploadCVButton: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#FD6639',
        borderWidth: 2,
    },
    uploadCVButtonText: {
        color: '#FD6639',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cvContainer: {
        backgroundColor: '#1A1F2B',
        padding: 15,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#FD6639',
    },
    labelCV: {
        color: '#ffffff',
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
    },
    fileName: {
        color: '#ffffff',
        marginTop: 10,
        textAlign: 'center',
    },
    uploadMessage: {
        color: 'green',
        marginTop: 5,
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
    },
    signUpButton: {
        marginTop: 50,
        backgroundColor: '#FD6639',
        paddingVertical: 12,
        paddingHorizontal: 5,
        borderRadius: 25,
        marginVertical: 20,
        width: '50%',
        alignSelf: 'center',
    },
    signUpButtonText: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginText: {
        color: '#ffffff',
        textAlign: 'center',
        marginVertical: 20,
    },
    loginLink: {
        color: '#FD6639',
    },
    input: {
        backgroundColor: '#ffffff',
        borderRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 16,
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        backgroundColor: '#ffffff',
        borderColor: 'gray',
        borderRadius: 15,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});
