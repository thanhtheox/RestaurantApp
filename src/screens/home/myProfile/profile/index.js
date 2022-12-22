import { ScaleFromCenterAndroid } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets';
import React from 'react';
import {View, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import { IMG_BestDeals1, IMG_LisaAvatar } from '../../../../assets/images';
import scale from '../../../../utils/responsive';
import { Icon } from 'react-native-vector-icons/MaterialCommunityIcons';
import { IC_Binoculars, IC_Edit, IC_Heart, IC_Mail, IC_Map, IC_Phone, IC_Star } from '../../../../assets/icons';
import { CUSTOM_COLOR } from '../../../../constants/color';
import HeaderBar from '../../../../components/headerBar';
import FONT_FAMILY from '../../../../constants/fonts';


const ProfileScreen = props => {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.headerBar} />
        <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: scale(15)}}>
                <Avatar.Image
                    source={IMG_LisaAvatar}
                    size={80}
                />
                <View style={{marginLeft: scale(20)}}>
                    <Title style={[styles.title,styles.text]}>
                        Thu Hien
                    </Title>
                    <Caption style={[styles.caption,styles.text]}>@thuhien_07</Caption>
                </View>
            </View>
        </View>
        <View style={styles.userInfoSection}>
            <View style={styles.row}>
            <View style={styles.icon}><IC_Map /></View>
                <Text style={[styles.text,{color:CUSTOM_COLOR.Sonic_Silver, marginLeft: 20}]}>TP HCM</Text>
            </View>

            <View style={styles.row}>
            <View style={styles.icon}><IC_Phone /></View>
                <Text style={[styles.text,{color:CUSTOM_COLOR.Sonic_Silver, marginLeft: 20}]}>+84 *****6905</Text>
            </View>

            <View style={styles.row}>
            <View style={styles.icon}><IC_Mail /></View>
                <Text style={{color:CUSTOM_COLOR.Sonic_Silver, marginLeft: 20, fontFamily: FONT_FAMILY.NexaRegular}}>thuhien@gmail.com</Text>
            </View>

        </View>

        <View style={styles.infoBoxWrapper}>
            <View style={[styles.infoBox, {borderRightColor: CUSTOM_COLOR.Gainsboro, borderRightWidth: 1}]}>
                <Title style={styles.text}>14000000 VND</Title>
                <Caption style={styles.text}>Tổng tiền</Caption>
            </View> 
            <View style={styles.infoBox}>
                <Title style={styles.text}>12</Title>
                <Caption style={styles.text}>Đã mua</Caption>
            </View>
        </View>

        <View style={styles.menuWrapper}>
            <TouchableOpacity onPress={() => props.navigation.navigate("EditProfileScreen")}>
                <View style={styles.menuItem}>
                    <View style={styles.icon}><IC_Edit/></View>
                    <Text style={[styles.menuItemText,styles.text]}>Chỉnh sửa thông tin</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.menuItem}>
                    <View style={styles.icon}><IC_Heart /></View>
                    <Text style={[styles.menuItemText,styles.text]}>Yêu thích</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.navigation.navigate("ReviewScreen")}>
                <View style={styles.menuItem}>
                    <View style={styles.icon}><IC_Star /></View>
                    <Text style={[styles.menuItemText,styles.text]}>Đánh Giá</Text>
                </View>
            </TouchableOpacity>
            
             
        </View>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: CUSTOM_COLOR.White,
    },
    userInfoSection: {
      paddingHorizontal: scale(30),
      marginBottom: scale(25),
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: scale(15),
      fontFamily: FONT_FAMILY.NexaRegular,
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
      fontWeight: '500',
      FONT_FAMILY: FONT_FAMILY.NexaRegular,
    },
    row: {
    //  borderWidth: 1,
      flexDirection: 'row',
      marginBottom: scale(10),
      alignItems: 'center',
    },
    icon:{
        width: scale(25) , 
        height: scale(25),
        alignSelf: 'center',
        justifyContent: 'center',
    },
    infoBoxWrapper: {
      borderBottomColor: CUSTOM_COLOR.Gainsboro,
      borderBottomWidth: 1,
      borderTopColor: CUSTOM_COLOR.Gainsboro,
      borderTopWidth: 1,
      flexDirection: 'row',
      height: scale(100),
    },
    infoBox: {
      width: '50%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    menuWrapper: {
      marginTop: scale(10),
    },
    menuItem: {
      flexDirection: 'row',
      paddingVertical: scale(15),
      paddingHorizontal: scale(30),
    },
    menuItemText: {
      color: CUSTOM_COLOR.Sonic_Silver,
      marginLeft: scale(20),
      fontWeight: '600',
      fontSize: 16,
      lineHeight: 26,
      FONT_FAMILY: FONT_FAMILY.NexaRegular,
    },
    text:{
      fontFamily: FONT_FAMILY.NexaRegular,
    }
  });