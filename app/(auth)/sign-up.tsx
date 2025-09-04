import {View, Text, Button} from 'react-native'
import {router} from "expo-router";

const SignUp = () => {
    // @ts-ignore
    return (
        <View>
            <Text>SignUp</Text>
            <Button title='SignUp' onPress={() => router.push("//sign-up")} />
        </View>
    )
}
export default SignUp
