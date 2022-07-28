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
import { ScrollView } from "react-native-gesture-handler";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;
const dataButton = [
  {id: 1, image: images.Aries, background: images.bgAries}, 
  {id: 2, image: images.Taurus, background: images.bgTaurus}, 
  {id: 3, image: images.Pisces, background: images.bgPisces}, 
  {id: 4, image: images.Leo, background: images.bgLeo},
  {id: 5, image: images.Sagittarius, background: images.bgSagittarius},
  {id: 6, image: images.Scorpion, background: images.bgScorpion},    
  {id: 7, image: images.Virgo, background: images.bgVirgo},  
  {id: 8, image: images.Gemini, background: images.bgGemini},  
  {id: 9, image: images.Cancer, background: images.bgCancer},
  {id: 10, image: images.Capricorn, background: images.bgCapricorn},  
  {id: 12, image: images.Libra, background: images.bgLibra},    
  {id: 11, image: images.Aquarius, background: images.bgAquarius},  
];

const numCol = 3;

const ListScreen = () => {
  const navigation = useNavigation();

  const points = useSelector(state => state.points);
  const dispatch = useDispatch();

  const onClickStartButton = (item) => {
    if (points.value === 0) {
      Alert.alert('Please buy more turn');
      return false;
    }
    dispatch(decrement());
    navigation.navigate("Item", {background: item.background});
  }


  const onClickBackButton = () => {
    navigation.goBack();
  }


  return (
    <ImageBackground style={appStyle.homeView} source={images.bg1}>
        <View style={appStyle.appBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={images.buttonback} style={appStyle.scoreStyle} />
          </TouchableOpacity>
          <TouchableOpacity >
            <Image source={images.note} style={appStyle.scoreStyle} />
          </TouchableOpacity>
        </View>
        <View style={appStyle.centerView}>
          <FlatList 
            data={dataButton}
            scrollEnabled={false}
            numColumns={numCol}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => onClickStartButton(item)}>
                <Image source={item.image} style={appStyle.itemView} />
              </TouchableOpacity>
            )}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={images.home} style={appStyle.btn} />
        </TouchableOpacity>
    </ImageBackground>
  );
};


export const appStyle = StyleSheet.create({
  homeView: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    resizeMode: 'contain',
  },
  appBar: {
    flex: 0.1,
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  turnView: {
    width: windowWidth * 0.15,
    marginRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemView: {
    width: windowWidth * 0.2,
    height: windowHeight * 0.2,
    resizeMode: 'contain',
    marginHorizontal: 10,
  },
  centerView: {
    marginTop: 30,
    width: windowWidth,
    height: windowHeight * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreStyle: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
});

export default ListScreen;