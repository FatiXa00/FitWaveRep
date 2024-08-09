import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import DocumentPicker from 'react-native-document-picker';


export default function CreateDoctor2() {
    const navigation = useNavigation();
    const [specialisation, setSpecialisation] = useState('');
    const [practicingTenure, setPracticingTenure] = useState('');
    const [degree, setDegree] = useState('');
    const [batchYear, setBatchYear] = useState('');
    const [curriculumVitae, setCurriculumVitae] = useState(null);

    const handleSignUp = () => {
        navigation.navigate('ForgottenPassword');
    };

    const handleLogin = () => {
        navigation.navigate('Logging');
    };

    const handleDocumentPicker = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
            });
            setCurriculumVitae(res);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User canceled the upload');
            } else {
                throw err;
            }
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
                <Text style={styles.label}>Practicing tenure</Text>
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
                <Text style={styles.label}>Batch Year</Text>
                <RNPickerSelect
                    onValueChange={(value) => setBatchYear(value)}
                    items={Array.from({ length: 65 }, (v, i) => ({ label: `${1960 + i}`, value: `${1960 + i}` }))}
                    style={pickerSelectStyles}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Curriculum vitae</Text>
                <TouchableOpacity style={styles.uploadButton} onPress={handleDocumentPicker}>
                    <Text style={styles.uploadButtonText}>Upload Document</Text>
                </TouchableOpacity>
                {curriculumVitae && <Text style={styles.fileName}>{curriculumVitae.name}</Text>}
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
    // Existing styles...

    inputContainer: {
        marginBottom: 20,
    },

    uploadButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },

    uploadButtonText: {
        color: '#FD6639',
        fontSize: 16,
        fontWeight: 'bold',
    },

    fileName: {
        color: '#FFFFFF',
        marginTop: 10,
        textAlign: 'center',
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
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
