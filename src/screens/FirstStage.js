/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FlipCard from 'react-native-flip-card';
import Modal from 'react-native-modal';
import Entypo from 'react-native-vector-icons/Entypo';
import {useSelector} from 'react-redux';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';

const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const colorblue = ['#192f6a', '#4c669f', '#3b5998'];
const colorpurp = ['#1d0a28', '#390d4f', '#6b1e72'];
// const answers1 = [
//   'Denklem Kurma',
//   'Çarpanlara Ayırma',
//   'Sayılar',
//   'Bölünebilme, EBOB ve EKOK',
//   'Fonksiyonlar',
// ];
// const QuestionDesc1 =
//   'Yukarıdaki şekilde verilen her bir dairenin içine birbirinden yazılacaktır. Bu sayıların ikisi şekilde verilmiştir. Bulundukları dörtgenin köşelerindeki dairelerde yazan dört sayının çarpımına eşit olan A ve B sayıları aralarında asaldır.';

// const Question1 = 'Buna göre A + B en az kaçtır?';

// const QuestionImage1 = '../images/Soru2Image.png';

// const correct1 = [3];

// ////////////////////////////////////////////////////////////////
// const answers3 = [
//   'Kareköklü Sayılar',
//   'Çarpanlara Ayırma',
//   'Kesirler',
//   'Bölünebilme, EBOB ve EKOK',
//   'Fonksiyonlar',
// ];
// const QuestionDesc =
//   'Aşağıdaki 16 eş parçadan oluşan şekilde, pembe renge boyalı parçaların sayısının tüm parçaların sayısına oranı ile bir kesir ifade ediliyor.';

// const Question =
//   'Bu kesrin kareköküne eşit olan kesri ifade etmek için boyalı olmayan parçalardan kaç tanesi daha pembe renge boyanmalıdır?';

// const QuestionImage3 = '../images/Soru2Image.png';
// //////////////////////////////////////////////////////////////////
// const QuestionImage = '../images/Kat.png';

/*const answers = [
  'Geometri',
  'Sayı Bilgisi',
  'Üslü Sayılar',
  'Tek Sayı Çift Sayı İlişkileri',
];*/

const correct = [1, 3];

const FirstStage = ({navigation}) => {
  const [s1color, sets1color] = useState({borderColor: '#cfbc22'});
  const [s2color, sets2color] = useState({borderColor: '#cfbc22'});
  const [s3color, sets3color] = useState({borderColor: '#cfbc22'});
  const [s4color, sets4color] = useState({borderColor: '#cfbc22'});

  const question = useSelector(state => state.question);
  const subjects = useSelector(state => state.subjects);

  const [selectedIndexes, setselectedIndexes] = useState([]);

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [isRModalVisible, setRModalVisible] = useState(false);

  const toggleRModal = () => {
    setRModalVisible(!isRModalVisible);
  };
  /*<View style={[styles.stages, s1color]} />
            <View style={[styles.stages, s2color]} />
            <View style={[styles.stages, s3color]} />
            <View style={[styles.stages, s4color]} />*/
  //const selVal = useState(new Animated.Value(0))[0];
  const [selVal, setAselVal] = useState(new Animated.Value(0));

  function selY() {
    Animated.timing(selVal, {
      toValue: 1,
      duration: 2000,
      easing: Easing.bounce,
      useNativeDriver: false,
    }).start();
  }

  const boxInterpolation = selVal.interpolate({
    inputRange: [0, 1],
    outputRange: ['#f5f5f5', '#ffe4b2'],
  });
  const animatedStyle = boxInterpolation;

  const [errors, setErrors] = useState([]);

  return (
    <>
      <LinearGradient colors={colorpurp} style={styles.linearGradient}>
        <ScrollView>
          <View style={styles.stager}>
            <ProgressSteps topOffset={0} marginBottom={0}>
              <ProgressStep
                removeBtnRow={true}
                label="Soru Türü"></ProgressStep>
              <ProgressStep label="Değişkenler"></ProgressStep>
              <ProgressStep label="Kısıtlar"></ProgressStep>
              <ProgressStep label="Çözüm"></ProgressStep>
            </ProgressSteps>
          </View>
          <FlipCard
            friction={6}
            perspective={1000}
            flipHorizontal={true}
            flipVertical={false}
            flip={false}
            clickable={true}
            onFlipEnd={isFlipEnd => {
              //console.log('isFlipEnd', isFlipEnd);
            }}
            style={{}}
            onPress={() => {
              ats(count);
              setcount((count + 1) % 5);
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#ffe4b2',
                borderRadius: 20,
                padding: 50,
                marginTop: 50,
                marginBottom: 50,
              }}>
              <Text
                style={{
                  marginTop: 8,
                  fontSize: 17,
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                {' '}
                Bu soru hangi konularla ilgilidir?{' '}
              </Text>
            </View>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                padding: 10,
                margin: 5,
                borderRadius: 40,
                //maxWidth: 150,
              }}>
              <Image
                source={{uri: question?.image}}
                resizeMode="stretch"
                style={{
                  width: '95%',
                  height: 250,
                  borderRadius: 10,
                }}
              />
            </View>
          </FlipCard>
          <View
            style={{
              flex: 0.8,
              flexDirection: 'column',
              padding: 10,
            }}>
            {subjects.map((subject, index) => (
              <TouchableOpacity
                key={subject?._id}
                style={[
                  styles.buttons,
                  {
                    borderWidth: 4,
                    borderColor: selectedIndexes.includes(index)
                      ? 'green'
                      : 'transparent',
                  },
                ]}
                onPress={() => {
                  selY();
                  const currentIndexes = [...selectedIndexes];
                  const foundIndex = currentIndexes.findIndex(i => i === index);
                  if (foundIndex !== -1) {
                    console.log(foundIndex, 'bulundu');
                    currentIndexes.splice(foundIndex, 1);
                    console.log('...', currentIndexes);
                    setselectedIndexes(currentIndexes);
                  } else {
                    console.log('bulunamadı');
                    setselectedIndexes([...currentIndexes, index]);
                  }
                }}>
                <Animated.View
                  style={[
                    styles.buttonsS,
                    {
                      backgroundColor: selectedIndexes.includes(index)
                        ? animatedStyle
                        : 'white',
                    },
                  ]}>
                  <Text style={{fontSize: 17}}>{subject?.name}</Text>
                </Animated.View>
              </TouchableOpacity>
            ))}
          </View>
          <View
            style={{
              flex: 0.16,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                flex: 0.25,
                backgroundColor: '#ff9400',
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10,
                marginTop: 20,
              }}
              onPress={() => {
                console.log(
                  selectedIndexes,
                  correct,
                  selectedIndexes !== correct,
                );
                const Calculatederrors = [];
                selectedIndexes.forEach(selectedIndex => {
                  if (!subjects[selectedIndex].isCorrect) {
                    //error
                    console.log(subjects[selectedIndex].error.text);
                    Calculatederrors.push(subjects[selectedIndex].error.text);
                  }
                });
                console.log(Calculatederrors);
                if (Calculatederrors.length > 0) {
                  setErrors(Calculatederrors);
                  toggleModal();
                } else if (
                  selectedIndexes.length ===
                  subjects.filter(subject => subject.isCorrect).length
                ) {
                  toggleRModal();
                } else {
                  setErrors(['Eksik işaretlediniz! Dikkatli seçim yapın.']);
                  toggleModal();
                }
              }}>
              <Entypo name="forward" size={30} color="white"></Entypo>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
      <Modal
        isVisible={isModalVisible}
        animationInTiming={600}
        animationOutTiming={1000}
        onBackdropPress={() => setModalVisible(false)}>
        <View
          style={{
            backgroundColor: '#e0e0e0',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
          }}>
          <View
            style={{
              backgroundColor: '#B22222',
              padding: 30,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                marginBottom: 20,
                color: '#e0e0e0',
              }}>
              Yanlış Seçenek!
            </Text>
            <Text
              style={{
                fontSize: 20,
              }}>
              {errors.join('\n')}
            </Text>
          </View>
        </View>
      </Modal>
      <Modal
        isVisible={isRModalVisible}
        animationInTiming={600}
        animationOutTiming={1000}
        onBackdropPress={() => {
          setRModalVisible(false);
          navigation.navigate('Stage2');
        }}>
        <View
          style={{
            flex: 0.3,
            backgroundColor: '#e0e0e0',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
          }}>
          <View
            style={{
              backgroundColor: '#228B22',
              padding: 30,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                marginBottom: 20,
                color: '#e0e0e0',
              }}>
              Doğru Cevap!
            </Text>
            <Text style={{fontSize: 20}}>Bu soru ve ile ilgili.</Text>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  stages: {
    flex: 1,
    padding: 10,
    margin: 4,
    //backgroundColor: '#4ab562',
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#cfbc22',
  },
  texts: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
  },
  backside: {
    flex: 1,
    backgroundColor: '#390e50',
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
  buttonsS: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#f5f5f5',
    borderRadius: 20,
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    margin: 5,
    borderRadius: 30,
  },
});

export default FirstStage;
