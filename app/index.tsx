import React, { useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    TextInput,
    Modal,
    FlatList,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    StyleSheet
} from "react-native"
// import AntDesign from '@expo/vector-icons/AntDesign';
import { COLORS, icons, SIZES } from "../constants"
import { LinearGradient } from 'expo-linear-gradient'


const SignUp = () => {

    const [areas, setAreas] = React.useState([])
    const [selectedArea, setSelectedArea] = React.useState(null)
    const [modalVisible, setModalVisible] = React.useState(false)

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all?fields=name,flags,cca3,idd")
            .then(response => response.json())
            .then(data => {
                let areaData = data.map(item => {
                    return {
                        code: item.cca3,
                        name: item.name?.common,
                        flag: item.flags.png,
                        callingCode: item.idd?.root + item.idd?.suffixes[0],
                    }
                })
                setAreas(areaData)
                
                if (areaData.length > 0) {
                    let defaultData = areaData.filter(a => a.code == "NAM")

                    if (defaultData.length > 0) {
                        setSelectedArea(defaultData[0])
                    }
                }
            })
    }, [])


    function renderForm() {
        return (
            <View
                style={styles.loginBox}
            >
                <View style={styles.loginBoxHeader}>
                    <Text style={{  textAlign: 'center', color: '#fff', fontWeight: '600'}}>Enter Phone Number</Text>
                </View>
                {/* Phone Number */}
                <View style={{ marginTop: SIZES.padding * 2 }}>
                    <View style={{ flexDirection: 'row' }}>
                        {/* Country Code */}
                        <TouchableOpacity
                            style={{
                                width: 100,
                                height: 52,
                                marginHorizontal: 5,
                                borderBottomColor: COLORS.white,
                                borderBottomWidth: 1,
                                flexDirection: 'row',
                            }}
                            onPress={() => setModalVisible(true)}
                        >
                            <View style={{ justifyContent: 'center' }}>
                                <Image
                                    source={icons.down}
                                    style={{
                                        width: 10,
                                        height: 10,
                                        marginTop: 8,
                                        tintColor: COLORS.white
                                    }}
                                />
                            </View>
                            <View style={{ justifyContent: 'center', marginLeft: 7 }}>
                                <Image
                                    source={{ uri: selectedArea?.flag }}
                                    resizeMode="contain"
                                    style={{
                                        width: 30,
                                        height: 30,
                                        marginTop: 8,
                                    }}
                                />
                            </View>

                            <View style={{ justifyContent: 'center', marginLeft: 5 }}>
                                <Text style={{
                                    color: COLORS.white,
                                    marginTop: 8, }}>{selectedArea?.callingCode}</Text>
                            </View>
                        </TouchableOpacity>

                        {/* Phone Number */}

                            <TextInput
                            style={{
                                flex: 1,
                                marginTop: 10,
                                height: 42,
                                borderBottomColor: COLORS.white,
                                borderBottomWidth: 1,
                                paddingLeft: 10,
                                paddingBottom: 4,
                                color: COLORS.white,
                            }}
                            placeholder="Enter your phone number"
                            placeholderTextColor={COLORS.white}
                            selectionColor={COLORS.white}
                            />
                        
                    </View>
                </View>

            </View>
        )
    }


    function renderAreaCodesModal() {

        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{ padding: SIZES.padding, flexDirection: 'row' }}
                    onPress={() => {
                        setSelectedArea(item)
                        setModalVisible(false)
                    }}
                >
                    <Image
                        source={{ uri: item.flag }}
                        style={{
                            width: 40,
                            height: 30,
                            marginRight: 10
                        }}
                    />
                    <View style={{ marginTop: 5, marginLeft: 3}}>
                        <Text >{item.name}</Text>
                    </View>
                    
                </TouchableOpacity>
            )
        }

        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <TouchableWithoutFeedback
                    onPress={() => setModalVisible(false)}
                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 320 }}>
                        <View
                            style={{
                                height: '100vh',
                                width: '100%',
                                backgroundColor: COLORS.lightGreen,
                                borderTopRightRadius: SIZES.radius,
                                borderTopLeftRadius: SIZES.radius
                            }}
                        >
                            <FlatList
                                data={areas}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.code}
                                showsVerticalScrollIndicator={false}
                                style={{
                                    padding: SIZES.padding * 2,
                                    marginBottom: SIZES.padding * 2
                                }}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{ flex: 1 }}
        >
            <LinearGradient
                colors={[COLORS.lime, COLORS.emerald]}
                style={{ flex: 1 }}
            >
                <ScrollView>
                    {renderForm()}
                </ScrollView>
            </LinearGradient>
            {renderAreaCodesModal()}
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    loginBox: {
        marginTop: 50,
        marginHorizontal: SIZES.padding * 3,

    },
    loginBoxHeader: {
        marginBottom: 20
    }
})

export default SignUp;