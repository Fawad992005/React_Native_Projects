import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import * as Yup from 'yup';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Formik} from 'formik';

//Form Validation
const PasswordSchema = Yup.object().shape({
  passwordlength: Yup.number()
    .min(4, 'Should be more than 4 characters')
    .max(16, 'Should be less than 16 characters')
    .required('This is a required field'),
});
console.log('hello');

function App() {
  const [password, setpassword] = useState('');
  const [isPasswordGenerated, setisPasswordGenerated] = useState(false);
  const [lowercase, setlowercase] = useState(true);
  const [uppercase, setuppercase] = useState(false);
  const [numbers, setnumbers] = useState(false);
  const [symbols, setsymbols] = useState(false);

  const generatePassword = (passwordlength: number) => {
    let charactersList = '';
    const uppercaseCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseCharacters = 'abcdefghijklmnopqrstuvwxyz';
    const digitsCharacters = '0123456789';
    const symbolsCharacters = '!@#$%^&*()_+{}[]<>?/|~';
    if (uppercase) {
      charactersList += uppercaseCharacters;
    }
    if (lowercase) {
      charactersList += lowercaseCharacters;
    }
    if (symbols) {
      charactersList += symbolsCharacters;
    }
    if (numbers) {
      charactersList += digitsCharacters;
    }
    const passwordresult = createPassword(charactersList, passwordlength);
    setpassword(passwordresult), setisPasswordGenerated(true);
  };
  const createPassword = (characters: string, passwordlength: number) => {
    let result = '';
    for (let i = 0; i < passwordlength; i++) {
      const characterIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };
  const resetPassword = () => {
    setpassword(''), setlowercase(true), setuppercase(false);
    setnumbers(false), setsymbols(false);
    setisPasswordGenerated(false);
  };
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Genertor</Text>
          <Formik
            initialValues={{passwordlength: ''}}
            validationSchema={PasswordSchema}
            onSubmit={values => {
              console.log(values);
              generatePassword(Number(values.passwordlength));
            }}>
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
              isSubmitting,
              /* and other goodies */
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.heading}>Password Length</Text>
                    {touched.passwordlength && errors.passwordlength && (
                      <Text style={styles.errorText}>
                        {errors.passwordlength}
                      </Text>
                    )}
                  </View>
                  <TextInput
                    style={styles.inputStyle}
                    value={values.passwordlength}
                    onChangeText={handleChange('passwordlength')}
                    placeholder="Ex. 8"
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Lowercase</Text>
                  <BouncyCheckbox
                    disableText
                    isChecked={lowercase}
                    onPress={() => setlowercase(!lowercase)}
                    fillColor="#29AB87"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Upercase</Text>
                  <BouncyCheckbox
                    disableText
                    isChecked={uppercase}
                    onPress={() => setuppercase(!uppercase)}
                    fillColor="#29AB87"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Numbers</Text>
                  <BouncyCheckbox
                    disableText
                    isChecked={numbers}
                    onPress={() => setnumbers(!numbers)}
                    fillColor="#29AB87"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Symbols</Text>
                  <BouncyCheckbox
                    disableText
                    isChecked={symbols}
                    onPress={() => setsymbols(!symbols)}
                    fillColor="#29AB87"
                  />
                </View>

                <View style={styles.formActions}>
                  <TouchableOpacity
                    style={styles.primaryBtn}
                    disabled={!isValid}
                    onPress={() => handleSubmit()}>
                    <Text style={[styles.textColor, styles.primaryBtnTxt]}>
                      Generate Passsword
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => {
                      handleReset();
                      resetPassword();
                    }}>
                    <Text style={[styles.textColor, styles.secondaryBtnTxt]}>
                      Reset
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
        {isPasswordGenerated ? (
          <View style={[styles.cardElevated, styles.card]}>
            <Text style={styles.subTitle}>Result</Text>
            <Text style={styles.description}>Long Press To Copy</Text>
            <Text selectable={true} style={styles.generatedPassword}>
              {password}
            </Text>
          </View>
        ) : null}
      </SafeAreaView>
    </ScrollView>
  );
}

export default App;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
    color: 'white',
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
    color: 'white',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
    borderBottomColor: 'white',
    color: 'white',
  },
  errorText: {
    fontSize: 12,
    color: 'red',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 20,
    borderRadius: 8,
    marginHorizontal: 1,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color: '#000',
  },
  textColor: {
    color: 'white',
  },
});
