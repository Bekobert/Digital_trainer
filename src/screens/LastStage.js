/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import RModal from '../modals/RightModal';
import WModal from '../modals/WrongModal';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import {useSelector} from 'react-redux';

const colorblue = ['#192f6a', '#4c669f', '#3b5998'];
const colorpurp = ['#1d0a28', '#390d4f', '#6b1e72'];

/*const QuestionDesc1 =
  'Yukarıdaki şekilde verilen her bir dairenin içine birbirinden yazılacaktır. Bu sayıların ikisi şekilde verilmiştir. Bulundukları dörtgenin köşelerindeki dairelerde yazan dört sayının çarpımına eşit olan A ve B sayıları aralarında asaldır.';
const Question1 = 'Buna göre A + B en az kaçtır?';

const answers1 = ['162', '191', '258', '289'];

const QuestionImage1 = '../images/Soru1.png';
////////////////////////////////////////////////////////////////
const QuestionDesc =
  'Aşağıdaki 16 eş parçadan oluşan şekilde, pembe renge boyalı parçaların sayısının tüm parçaların sayısına oranı ile bir kesir ifade ediliyor.';

const Question =
  'Bu kesrin kareköküne eşit olan kesri ifade etmek için boyalı olmayan parçalardan kaç tanesi daha pembe renge boyanmalıdır?';

const answers2 = ['1', '2', '3', '4', '5'];

const QuestionImage2 = '../images/Soru2Image.png';
////////////////////////////////////////////////////////////////
const QuestionImage = '../images/Kat.png';

const answers = [
  '3            4             5',
  '4            6             3',
  '5            7             6',
  '6            3             4',
  '8            5             7',
];

const answerImage = '../images/A7.png';

const correct = 4;*/

const LastStage = ({navigation}) => {
  const question = useSelector(state => state.question);
  const answers = useSelector(state => state.answers);
  function nextChar(c, index) {
    return String.fromCharCode(c.charCodeAt(0) + index);
  }

  const [isRModalVisible, setRModalVisible] = useState(false);

  const toggleRModal = () => {
    setRModalVisible(!isRModalVisible);
  };

  const [isWModalVisible, setWModalVisible] = useState(false);

  const toggleWModal = () => {
    setWModalVisible(!isWModalVisible);
  };

  const {width, height} = Dimensions.get('window');

  return (
    <LinearGradient colors={colorpurp} style={styles.linearGradient}>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <View style={styles.stager}>
            <ProgressSteps topOffset={0} marginBottom={0} activeStep={3}>
              <ProgressStep label="Soru Türü"></ProgressStep>
              <ProgressStep label="Değişkenler"></ProgressStep>
              <ProgressStep label="Kısıtlar"></ProgressStep>
              <ProgressStep removeBtnRow={true} label="Çözüm"></ProgressStep>
            </ProgressSteps>
          </View>
          <View
            style={{
              flex: 10,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              padding: 10,
              margin: 10,
              marginTop: 20,
              borderBottomWidth: 2,
              borderTopWidth: 2,
              borderColor: 'black',
              borderBottomLeftRadius: 50,
              borderTopRightRadius: 50,
              shadowColor: 'white',
              shadowOffset: {
                width: 0,
                height: 15,
              },
              shadowOpacity: 0.55,
              shadowRadius: 16.0,
              elevation: 28,
            }}>
            <Image
              source={{uri: question?.image}}
              resizeMode="stretch"
              style={{
                width: '90%',
                height: 250,
                borderRadius: 10,
              }}
            />
          </View>
          <View
            style={{
              flex: 8,
              flexDirection: 'column',
              padding: 10,
              marginTop: 20,
            }}>
            {answers.map(answer => (
              <TouchableOpacity
                key={answer?._id}
                style={[styles.buttons]}
                onPress={() => {
                  console.log('Is answer correct = ', answer?.isCorrect);
                  if (answer?.isCorrect) {
                    console.log(answer?._id);
                    navigation.navigate('ErrorPanel2', {name: answer?.text});
                    //toggleRModal();
                  } else {
                    console.log(' ');
                    navigation.navigate('ErrorPanel2', {name: answer?.text});
                    //toggleWModal();
                  }
                }}>
                <View style={styles.buttonsR}>
                  <Text style={styles.texts}>{answer?.option}.</Text>
                </View>
                <View style={styles.buttonsS}>
                  <Text style={{fontSize: 17}}>{answer?.text}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
      <Modal
        isVisible={isWModalVisible}
        animationInTiming={600}
        animationOutTiming={1000}
        onBackdropPress={() => {
          setWModalVisible(false);
          //navigation.navigate('Stage1');
        }}>
        <WModal></WModal>
      </Modal>
      <Modal
        isVisible={isRModalVisible}
        animationInTiming={600}
        animationOutTiming={1000}
        onBackdropPress={() => {
          setRModalVisible(false);
        }}>
        <RModal></RModal>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
  },
  hints: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#4ab562',
    marginRight: 50,
    marginLeft: 50,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stager: {
    flex: 0.1,
    flexDirection: 'row',
    marginRight: 50,
    marginLeft: 50,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsR: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    margin: 2,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 20,
  },
  buttonsS: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    margin: 2,
    borderRadius: 20,
  },
  buttons: {
    flex: 2,
    flexDirection: 'row',
    margin: 5,
    borderRadius: 30,
  },
});

export default LastStage;
