import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { AuthContext } from "../navigation/context";
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from "../components/types";

export default function TermsAndConditions({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <Text style={styles.content}>
          If you decide to participate in this study, we will collect data from
          you. The information you provide will be completely private and
          confidential. {"\n\n"}
          To collect, store and use your entries, we ask for your consent.
          Please read the information below carefully and then indicate whether
          you agree to participate.
          {"\n\n"}
          If I agree to participate, what information do I need to provide?{" "}
          {"\n\n"}
          When you first use the Place&Recovery app, you will be asked to
          complete an initial questionnaire about your age, gender, and other
          demographic information. You will then be asked to answer questions
          about your current environment, feelings, thoughts and behavior, 3
          times per day. Participation in the study is private and confidential.{" "}
          {"\n\n"}
          We will acquire information about your geographical location using the
          GPS sensor on your mobile phone. You can opt out of this feature if
          you prefer. We will ask for your consent to provide your geographical
          location data when you first use the Place&Recovery app.  {"\n\n"}
          In order to participate in this study, we ask for your consent to our
          Privacy Policy. Please take a minute to read our Privacy Policy.{" "}
          {"\n\n"}
          
          How will my data be used? {"\n\n"}
          The data you provide will be stored on a password-protected server and
          used for academic research, in order to understand the impact of
          neighborhood characteristics on mental health and wellbeing. The
          results will inform novel clinical interventions and the planning and
          design of healthier neighborhoods. The data may also be used for other
          research purposes in the future. The results will be published in
          scientific journals. {"\n\n"}
          By accepting this terms and conditions, I confirm that: {"\n\n"}• I
          agree to take part in the study. {"\n\n"}• I understand that my
          participation is voluntary and that I am free to withdraw from the
          research study at any time before the final assessment. {"\n\n"}• I
          have read, understood, and consent to the Place&Recovery Privacy
          Policy. {"\n\n"}• This is my mobile device. {"\n\n"}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    fontSize: 13,
    textAlign: "left",
    // margin: 20,
    marginLeft: 40,
    marginRight: 40,
    color: "#072B4F",
  },
  label: {
    textAlign: "center",
    margin: 20,
    marginLeft: 40,
    marginRight: 40,
    color: "#072B4F",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
