/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import RModal from '../modals/RightModal';
import WModal from '../modals/WrongModal';
import {useSelector} from 'react-redux';

const colorblue = ['#192f6a', '#4c669f', '#318CE7'];
const colorblue3 = ['#005f69', '#4c669f', '#7FFFD4'];
const colorblue2 = ['#11435a', '#2793c3', '#51e4e9'];
const colorpurp = ['#1d0a28', '#390d4f', '#6b1e72'];

// const QuestionDesc1 =
//   'Yukarıdaki şekilde verilen her bir dairenin içine birbirinden yazılacaktır. Bu sayıların ikisi şekilde verilmiştir. Bulundukları dörtgenin köşelerindeki dairelerde yazan dört sayının çarpımına eşit olan A ve B sayıları aralarında asaldır.';
// const Question1 = 'Buna göre A + B en az kaçtır?';

// const answers1 = ['162', '191', '258', '289'];

// const QuestionImage1 = '../images/Soru1.png';
// ////////////////////////////////////////////////////////////////
// const QuestionDesc =
//   'Aşağıdaki 16 eş parçadan oluşan şekilde, pembe renge boyalı parçaların sayısının tüm parçaların sayısına oranı ile bir kesir ifade ediliyor.';

// const Question =
//   'Bu kesrin kareköküne eşit olan kesri ifade etmek için boyalı olmayan parçalardan kaç tanesi daha pembe renge boyanmalıdır?';

// const answers2 = ['1', '2', '3', '4', '5'];

// const QuestionImage2 = '../images/Soru2Image.png';
// ////////////////////////////////////////////////////////////////
// const QuestionImage = '../images/Kat.png';

// const answers = [
//   '3            4             5',
//   '4            6             3',
//   '5            7             6',
//   '6            3             4',
//   '8            5             7',
// ];

// const correct = 2;

// function nextChar(c, index) {
//   return String.fromCharCode(c.charCodeAt(0) + index);
// }

const HomeScreen = ({navigation}) => {
  const question = useSelector(state => state.question);
  const answers = useSelector(state => state.answers);

  const [isRModalVisible, setRModalVisible] = useState(false);
  const toggleRModal = () => {
    setRModalVisible(!isRModalVisible);
  };
  const [isWModalVisible, setWModalVisible] = useState(false);
  const toggleWModal = () => {
    setWModalVisible(!isWModalVisible);
  };

  const [imageHeight, setImageHeight] = useState(0);

  const {width: deviceWidth} = Dimensions.get('window');
  const ImageWidth = (deviceWidth - 20) * 0.9;
  useEffect(() => {
    Image.getSize(question?.image, (imgWidth, imgHeight) => {
      setImageHeight(ImageWidth * (imgHeight / imgWidth));
    });
  }, [question?.image, deviceWidth]);

  return (
    <LinearGradient colors={colorpurp} style={styles.linearGradient}>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{justifyContent: 'center'}}
          showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            style={styles.hints}
            onPress={() => navigation.navigate('Stage1')}>
            <MaterialIcons
              color="white"
              name="question-answer"
              size={17}></MaterialIcons>
            <Text
              style={{
                fontSize: 17,
                fontWeight: 'bold',
                color: 'white',
                marginLeft: 12,
              }}>
              Nasıl Çözerim
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flex: 10,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              padding: 10,
              margin: 10,
              marginTop: 20,
              borderRadius: 10,
              shadowColor: 'black',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,

              elevation: 10,
            }}>
            {imageHeight > 0 ? (
              <Image
                source={{uri: question?.image}}
                resizeMode="contain"
                style={{
                  width: ImageWidth,
                  height: imageHeight,
                  borderRadius: 10,
                }}
              />
            ) : (
              <ActivityIndicator size="large" color="#318CE7" />
            )}
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
                    console.log('yep');
                    toggleRModal();
                  } else {
                    toggleWModal();
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
          navigation.navigate('Stage1');
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
  texts: {
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },
  linearGradient: {
    flex: 1,
  },
  hints: {
    borderWidth: 1,
    borderColor: 'black',
    flex: 1,
    height: 30,
    flexDirection: 'row',
    backgroundColor: '#50C878',
    marginRight: 50,
    marginLeft: 50,
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsR: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8801d',
    borderRadius: 10,
    paddingVertical: 5,
  },
  buttonsS: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingVertical: 5,
  },
  buttons: {
    flex: 2,
    flexDirection: 'row',
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
  },
});

export default HomeScreen;
