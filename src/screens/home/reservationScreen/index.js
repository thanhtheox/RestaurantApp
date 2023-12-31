import {
  ImageBackground,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  KeyboardAvoidingView,
  Dimensions,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import {CUSTOM_COLOR} from '../../../constants/color';
import {IMG_2, IMG_ReservationBackground} from '../../../assets/images';
import scale from '../../../utils/responsive';
import FONT_FAMILY from '../../../constants/fonts';
import DatePicker from 'react-native-date-picker';
import {store} from './../../../redux/store';
import userApi from '../../../services/userApi';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import { useRef } from 'react';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const reservationSchema = yup.object({
  name: yup.string().required('Tên khách hàng không được để trống'),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, 'Số điện thoại không hợp lệ')
    .max(11, "Số điện thoại không hợp lệ")
    .min(10, "Số điện thoại không hợp lệ")
    .required('Số điện thoại không được để trống'),
});

const ReservationScreen = props => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [openTime, setOpenTime] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState();
  const [message, setMessage] = useState('');
  const {user} = store.getState().user;
  const bs = useRef(null);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      userId: user._id,
      name: user.name,
      phoneNumber: user.phoneNumber,
      bookingDate: date.toLocaleDateString('vi-VN'),
      bookingTime: time.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      quantity: 1,
    },
    resolver: yupResolver(reservationSchema),
  });

  let inCount = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };
  let decCount = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleReservate = async data => {
    try {
      const reservationData = {
        userId: user._id,
        name: data.name,
        phoneNumber: data.phoneNumber,
        bookingDate: date.toLocaleDateString('vi-VN'),
        bookingTime: time.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        quantity: quantity,
      };
      await userApi.reservate(reservationData);
      // Thông báo thành công
      setColor(CUSTOM_COLOR.Primary);
      setMessage('Đặt bàn thành công');
      bs?.current?.snapTo(0);
    } catch (error) {
      //Thông báo thất bại
      setColor(CUSTOM_COLOR.Red); 
      setMessage('Đặt bàn thất bại');
      bs?.current?.snapTo(0);
      console.log(error);
    }
  };
  const render = () => (
    <View style={[stylePanel.panel, { backgroundColor: color}]}>
        <View style={{alignItems: 'center'}}>
          <Text style={stylePanel.panelTitle}>{message}</Text>
        </View>
      </View>
  );
  const fall = new Animated.Value(1);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={IMG_ReservationBackground}
        resizeMode={'cover'}
        style={styles.backGround}>
      <BottomSheet
        ref={bs}
        snapPoints={[100, 0]}
        renderContent={render}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      <Animated.View style={{margin: 20,
        opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
    }}>
        <View style={styles.tittleBox}>
          <Text style={styles.screenTittle}>UIT group 3</Text>
          <Text style={styles.restaurantAdd}>
            Đại học Công nghệ Thông tin, ĐHQG TPHCM
          </Text>
        </View>
        <TouchableWithoutFeedback
          onPress={() => Keyboard.dismiss() && TextInput.clearFocus()}>
          <KeyboardAvoidingView>
            <Controller
              name="name"
              control={control}
              render={({field: {onChange, value}}) => (
                <View style={styles.inputBox}>
                  <TextInput
                    placeholderTextColor={CUSTOM_COLOR.Grey}
                    placeholder="Họ Tên"
                    style={styles.inputText}
                    keyboardType="ascii-capable"
                    onChangeText={text => onChange(text)}
                    value={value}
                  />
                  <View style={{marginTop: scale(5), marginLeft: scale(-35)}}>
                    {errors?.name && (
                      <Text style={styles.textFailed}>
                        {errors.name.message}
                      </Text>
                    )}
                  </View>
                </View>
              )}
            />
            <Controller
              name="phoneNumber"
              control={control}
              render={({field: {onChange, value}}) => (
                <View style={styles.inputBox}>
                  <TextInput
                    onChangeText={number => onChange(number)}
                    placeholderTextColor={CUSTOM_COLOR.Grey}
                    placeholder="Số điện thoại"
                    style={styles.inputText}
                    keyboardType="numeric"
                    value={value}
                  />
                  <View style={{marginTop: scale(5), marginLeft: scale(-35)}}>
                    {errors?.phoneNumber && (
                      <Text style={styles.textFailed}>
                        {errors.phoneNumber.message}
                      </Text>
                    )}
                  </View>
                </View>
              )}
            />

            <View style={styles.inputDatePickerBox}>
              <View style={styles.inputDateBox}>
                <TextInput
                  placeholderTextColor={CUSTOM_COLOR.Grey}
                  placeholder="Ngày đặt chỗ"
                  style={styles.inputText}
                  keyboardType="ascii-capable"
                  value={date?.toLocaleDateString('vi-VN')}
                  editable={false}
                />
              </View>
              <View style={styles.datePickerButton}>
                <Button title="Chọn ngày" onPress={() => setOpenDate(true)} color={CUSTOM_COLOR.Primary}/>
                <DatePicker
                  modal
                  mode={'date'}
                  title='Chọn ngày'
                  textColor={CUSTOM_COLOR.Primary}
                  open={openDate}
                  date={date}
                  confirmText='OK'
                  cancelText='Thoát'
                  onConfirm={date => {
                    setOpenDate(false);
                    setDate(date);
                  }}
                  onCancel={() => {
                    setOpenDate(false);
                  }}
                />
              </View>
            </View>

            <View style={styles.inputDatePickerBox}>
              <View style={styles.inputDateBox}>
                <TextInput
                  placeholderTextColor={CUSTOM_COLOR.Grey}
                  placeholder="Giờ đặt"
                  style={styles.inputText}
                  keyboardType="ascii-capable"
                  value={time?.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                  editable={false}
                />
              </View>
              <View style={styles.datePickerButton}>
                <Button title="Chọn giờ" onPress={() => setOpenTime(true)}  color={CUSTOM_COLOR.Primary}/>
                <DatePicker
                  modal
                  mode={'time'}
                  open={openTime}
                  textColor={CUSTOM_COLOR.Primary}
                  date={time}
                  title='Chọn giờ'
                  confirmText='OK'
                  cancelText='Thoát'
                  onConfirm={date => {
                    setOpenTime(false);
                    setTime(date);
                  }}
                  onCancel={() => {
                    setOpenTime(false);
                  }}
                />
              </View>
            </View>

            <View style={styles.inputGuestBox}>
              <Text style={styles.ClientAmount}>Số lượng khách</Text>
              <View style={styles.countBox}>
                <TouchableOpacity onPress={decCount}>
                  <View style={styles.iconBox}>
                    <Text style={styles.minus} adjustsFontSizeToFit>-</Text>
                  </View>
                </TouchableOpacity>
                <Text style={styles.amount}>{quantity}</Text>
                <TouchableOpacity onPress={inCount}>
                  <View style={styles.iconBox}>
                    <Text style={styles.plus} adjustsFontSizeToFit>+</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
        <TouchableOpacity
          style={styles.MakeReservationButtonBoxPosition}
          onPress={handleSubmit(handleReservate)}>
          <View style={styles.MakeReservationButtonBox}>
            <Text style={styles.buttonText}>Đặt chỗ</Text>
          </View>
        </TouchableOpacity>
        </Animated.View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ReservationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CUSTOM_COLOR.White,
  },
  backGround: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
  },
  tittleBox: {
    marginBottom: scale(50),
    marginTop: scale(70),
    alignSelf: 'center',
    width: '100%',
  },
  screenTittle: {
    color: CUSTOM_COLOR.Black,
    fontSize: scale(20),
    fontFamily: FONT_FAMILY.NexaRegular,
    alignSelf: 'center',
  },
  restaurantAdd: {
    color: CUSTOM_COLOR.Black,
    fontSize: scale(13),
    fontFamily: FONT_FAMILY.NexaRegular,
    top: scale(4),
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: scale(162),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  inputBox: {
    marginBottom: scale(30),
    alignSelf: 'center',
    height: scale(43),
    width: scale(323),
    borderWidth: 1,
    borderColor: CUSTOM_COLOR.San_Juan,
    borderRadius: 4,
    backgroundColor: CUSTOM_COLOR.White,
  },
  inputDateBox: {
    alignSelf: 'center',
    height: scale(43),
    width: scale(200),
    borderWidth: 1,
    borderColor: CUSTOM_COLOR.San_Juan,
    backgroundColor: CUSTOM_COLOR.White,
    borderRadius: 4,
    marginRight: scale(10),
  },
  datePickerButton: {
    flex: 1,
    height: scale(43),
    justifyContent: 'center'
  },
  inputDatePickerBox: {
    flexDirection: 'row',
    marginBottom: scale(30),
    alignSelf: 'center',
    height: scale(43),
    width: scale(323),
    justifyContent: 'space-between',
    borderColor: CUSTOM_COLOR.San_Juan,
  },
  inputGuestBox: {
    marginBottom: scale(30),
    alignSelf: 'center',
    height: scale(43),
    width: scale(323),
    borderColor: CUSTOM_COLOR.San_Juan,
    borderRadius: 4,
  },
  countBox: {
    width: scale(80),
    height: scale(43),
    borderRadius: scale(1000),
    borderWidth: scale(1),
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginVertical: -25,
  },
  amount: {
    color: CUSTOM_COLOR.Black,
    fontSize: scale(16),
    fontFamily: FONT_FAMILY.NexaRegular,
    justifyContent: 'center',
    alignItems: 'center',
  },
  minus: {
    fontSize: scale(20),
    color: CUSTOM_COLOR.Black,
  },
  plus: {
    fontSize: scale(20),
    color: CUSTOM_COLOR.Black,
  },
  ClientAmount: {
    marginLeft: scale(15),
    color: CUSTOM_COLOR.Black,
    width: scale(299),
    fontFamily: FONT_FAMILY.NexaRegular,
    lineHeight: scale(20.6),
    fontSize: scale(15),
  },
  inputText: {
    padding: scale(10),
    color: CUSTOM_COLOR.Black,
    fontFamily: FONT_FAMILY.NexaRegular,
    lineHeight: scale(20.6),
    fontSize: scale(15),
  },
  MakeReservationButtonBoxPosition: {
    width: scale(278),
    alignSelf: 'center',
  },
  MakeReservationButtonBox: {
    backgroundColor: CUSTOM_COLOR.Primary,
    height: scale(43),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  buttonText: {
    color: CUSTOM_COLOR.White,
    fontFamily: FONT_FAMILY.NexaRegular,
  },
  textFailed: {
    marginLeft: scale(50),
    fontFamily: FONT_FAMILY.NexaRegular,
    fontSize: scale(12),
    color: CUSTOM_COLOR.Red,
  },
});
const stylePanel = StyleSheet.create({
  panel: {
    padding: scale(30),
    paddingTop: scale(30),
  },
  panelTitle: {
    fontSize: 27,
    color: CUSTOM_COLOR.White,
    height: scale(35),
  },
  panelSubtitle: {
    fontSize: scale(14),
    color: CUSTOM_COLOR.White,
    height: scale(30),
    marginBottom: scale(10),
  },
  
  
  });