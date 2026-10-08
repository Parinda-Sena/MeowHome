import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { COLORS } from '../styles/colors';
import { registerUser } from '../database/database';

export default function RegisterScreen({ onClose, onRegisterSuccess, onNavigateToLogin }) {
  const [images, setImages] = useState([null, null, null]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const pickImage = async (index) => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert('แจ้งเตือน', 'กรุณาอนุญาตการเข้าถึงรูปภาพเพื่อใช้อัปโหลด');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions?.Images || ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const newImages = [...images];
        newImages[index] = result.assets[0].uri;
        setImages(newImages);
      }
    } catch (error) {
      console.log('Error picking image:', error);
    }
  };

  const handleNext = () => {
    if (
      !username.trim() ||
      !password.trim() ||
      !confirmPassword.trim() ||
      !firstName.trim() ||
      !lastName.trim() ||
      !phone.trim() ||
      !email.trim()
    ) {
      Alert.alert('แจ้งเตือน', 'กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('แจ้งเตือน', 'รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน');
      return;
    }

    if (!agreeTerms) {
      Alert.alert('แจ้งเตือน', 'กรุณายอมรับข้อตกลงการใช้งาน');
      return;
    }

    const newUserId = `user_${Date.now()}`;
    const selectedProfileImage = images.find((img) => img !== null) || null;

    const userData = {
      userId: newUserId,
      username: username.trim(),
      name: firstName.trim(),
      surname: lastName.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      password: password,
      profileImage: selectedProfileImage,
    };

    try {
      registerUser(userData);
      if (typeof onRegisterSuccess === 'function') {
        onRegisterSuccess(newUserId);
      }
    } catch (error) {
      console.error('Register SQLite Error:', error);
      if (error.message && error.message.includes('UNIQUE constraint failed')) {
        Alert.alert('เกิดข้อผิดพลาด', 'อีเมลหรือชื่อผู้ใช้นี้เคยถูกลงทะเบียนในระบบแล้ว');
      } else {
        Alert.alert('เกิดข้อผิดพลาด', error.message || 'ไม่สามารถบันทึกข้อมูลได้');
      }
    }
  };

  return (
    <SafeAreaView style={styles.overlay}>
      <View style={styles.card}>
        {/* ปุ่มปิด */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>

        <ScrollView
          style={styles.scrollContent}
          contentContainerStyle={styles.scrollContentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* โลโก้ */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../asset/logo.png')}
              style={styles.logoImage}
              resizeMode="cover"
            />
          </View>

          {/* หัวข้อ */}
          <Text style={styles.title}>โปรไฟล์เจ้าของ</Text>

          {/* ช่องเลือกรูปภาพ 3 ช่อง */}
          <View style={styles.imagePickerRow}>
            {[0, 1, 2].map((index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.imageBox,
                  images[index] ? styles.imageBoxSelected : null,
                ]}
                onPress={() => pickImage(index)}
                activeOpacity={0.7}
              >
                {images[index] ? (
                  <Image source={{ uri: images[index] }} style={styles.uploadedImage} />
                ) : (
                  <Text style={styles.plusText}>+</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* ฟอร์มกรอกข้อมูล */}
          <TextInput
            style={styles.input}
            placeholder="ชื่อผู้ใช้ (Username)"
            placeholderTextColor={COLORS.textMuted || '#997D93'}
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="รหัสผ่าน"
            placeholderTextColor={COLORS.textMuted || '#997D93'}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="ยืนยันรหัสผ่าน"
            placeholderTextColor={COLORS.textMuted || '#997D93'}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="ชื่อ"
            placeholderTextColor={COLORS.textMuted || '#997D93'}
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="นามสกุล"
            placeholderTextColor={COLORS.textMuted || '#997D93'}
            value={lastName}
            onChangeText={setLastName}
          />
          <TextInput
            style={styles.input}
            placeholder="เบอร์โทรศัพท์"
            placeholderTextColor={COLORS.textMuted || '#997D93'}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
          <TextInput
            style={styles.input}
            placeholder="อีเมล"
            placeholderTextColor={COLORS.textMuted || '#997D93'}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          {/* ข้อตกลง */}
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setAgreeTerms(!agreeTerms)}
            activeOpacity={0.8}
          >
            <View style={[styles.checkbox, agreeTerms && styles.checkboxChecked]}>
              {agreeTerms && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.termsText}>
              ฉันได้อ่านและยอมรับ <Text style={styles.linkText}>ข้อตกลงการใช้งาน</Text> และ{' '}
              <Text style={styles.linkText}>นโยบายความเป็นส่วนตัว</Text> ของ Meow Home
            </Text>
          </TouchableOpacity>

          {/* ปุ่มถัดไป */}
          <TouchableOpacity style={styles.btnPrimary} onPress={handleNext} activeOpacity={0.7}>
            <Text style={styles.btnTextBold}>ถัดไป</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: COLORS.bgPink || '#FFD2EC',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  card: {
    backgroundColor: COLORS.white || '#FFFFFF',
    borderRadius: 28,
    paddingTop: 15,
    paddingBottom: 10,
    width: '100%',
    maxWidth: 360,
    maxHeight: '92%',
    borderWidth: 2,
    borderColor: COLORS.borderDark || '#1A1A1A',
    overflow: 'hidden',
  },
  closeButton: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.borderDark || '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
    backgroundColor: '#FFFFFF',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  scrollContent: {
    width: '100%',
  },
  scrollContentContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15, // ดันโลโก้ลงมาจากขอบบนของ Card
    paddingBottom: 20,
  },
  logoContainer: {
    width: 65,
    height: 65,
    borderRadius: 33,
    borderWidth: 2,
    borderColor: COLORS.borderDark || '#1A1A1A',
    marginTop: 10, // รักษาระยะห่างจากขอบด้านบน
    marginBottom: 8,
    overflow: 'hidden',
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  title: {
    color: COLORS.primaryPink || '#FF83C6',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  imagePickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
    paddingHorizontal: 5,
  },
  imageBox: {
    width: 75,
    height: 75,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  imageBoxSelected: {
    borderColor: COLORS.primaryPink || '#FF83C6',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
  },
  plusText: {
    fontSize: 26,
    color: '#CBD5E1',
    fontWeight: '300',
  },
  input: {
    width: '100%',
    backgroundColor: COLORS.white || '#FFFFFF',
    borderWidth: 1.5,
    borderColor: COLORS.borderDark || '#1A1A1A',
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 9,
    fontSize: 14,
    marginBottom: 9,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 10,
    width: '100%',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1.5,
    borderColor: COLORS.borderDark || '#1A1A1A',
    borderRadius: 4,
    marginRight: 8,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: COLORS.primaryPink || '#FF83C6',
  },
  checkmark: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  termsText: {
    fontSize: 12,
    color: COLORS.textMain || '#1A1A1A',
    flex: 1,
    lineHeight: 18,
  },
  linkText: {
    color: '#3B82F6',
    textDecorationLine: 'underline',
  },
  btnPrimary: {
    backgroundColor: COLORS.primaryPink || '#FF83C6',
    borderWidth: 2,
    borderColor: COLORS.borderDark || '#1A1A1A',
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: 'center',
    width: '100%',
    marginTop: 8,
  },
  btnTextBold: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});