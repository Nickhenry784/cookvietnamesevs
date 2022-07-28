import { 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Text, Dimensions, 
  ImageBackground, 
  Image,
  FlatList, 
  Alert  } from "react-native";
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {decrement} from '../redux/pointSlice';
import {useDispatch, useSelector} from 'react-redux';
import { images } from "../assets";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;
const dataButton = [
  {id: 1, image: images.teaceremony, background: images.teamau}, 
  {id: 2, image: images.sakura, background: images.sakuramau}, 
  {id: 3, image: images.phusimoutain, background: images.mautea}, 
  {id: 4, image: images.kimono, background: images.kimonobackground}
];

const Home = () => {
  const navigation = useNavigation();

  const points = useSelector(state => state.points);

  const [popup, setPopup] = useState(false);

  const onClickStartButton = (item) => {
    if (points.value === 0) {
      Alert.alert('Please buy more turn');
      return false;
    }
    navigation.navigate("List");
  }


  const onClickTurnButton = () => {
    navigation.navigate("BUY");
  }


  return (
    <ImageBackground style={appStyle.homeView} source={images.bg}>
      <View style={appStyle.appBar}>
        <TouchableOpacity onPress={onClickTurnButton}>
          <View style={appStyle.turnView}>
            <Image source={images.buttonbuy} style={appStyle.scoreStyle} />
            <Text style={appStyle.turnText}>{points.value}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPopup(true)}>
          <Image source={images.note} style={appStyle.buyImage} />
        </TouchableOpacity>
      </View>
      <View style={appStyle.bottomView}>
        <TouchableOpacity onPress={onClickStartButton}>
          <Image source={images.buttonwatch} style={appStyle.startBtn} />
        </TouchableOpacity>
      </View>
      {popup && (
      <View style={appStyle.popupView}>
        <ImageBackground style={appStyle.popupImage} source={images.board}>
          <TouchableOpacity onPress={() => setPopup(false)}>
            <Image source={images.buttonok} style={appStyle.okBtn} />
          </TouchableOpacity>
        </ImageBackground>
      </View>)}
    </ImageBackground>
  );
};


export const appStyle = StyleSheet.create({
  homeView: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    resizeMode: 'cover',
  },
  appBar: {
    flex: 0.1,
    width: '100%',
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  popupImage: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.4,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  popupView: {
    width: windowWidth,
    height: windowHeight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(1, 1, 1, 0.7)',
    position: 'absolute',
    top: '0%',
    left: '0%',
    right: '0%',
    bottom: '0%',
  },
  buyImage: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  okBtn: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    resizeMode: 'contain',
  },
  bottomView: {
    flex: 0.3,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerView: {
    flex: 0.4,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  turnView: {
    width: windowWidth * 0.15,
    marginRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bullImage: {
    width: windowWidth * 0.4,
    height: windowWidth * 0.4,
    resizeMode: 'contain',
  },
  startBtn: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.3,
    resizeMode: 'contain',
  },
  scoreStyle: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  turnText: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  labelText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default Home;