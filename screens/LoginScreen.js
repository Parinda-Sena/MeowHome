import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // ดึง Ionicons มาใช้งาน
import { COLORS } from '../styles/colors';
import { THEME } from '../styles/theme';

export default function LoginScreen({ onClose, onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert('แจ้งเตือน', 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');
      return;
    }
    console.log('Login with:', { username, password, rememberMe });
    if (onLoginSuccess) onLoginSuccess();
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        {/* ปุ่มกากบาทปิดหน้าต่าง */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>

        {/* โลโก้ */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('../asset/logo.png')} 
            style={styles.logoImage} 
            resizeMode="cover"
          />
        </View>

        <Text style={styles.title}>เข้าสู่ระบบ</Text>

        {/* ฟอร์มกรอกข้อมูล */}
        <View style={styles.form}>
          {/* ช่องกรอกชื่อผู้ใช้ */}
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="ชื่อผู้ใช้"
              placeholderTextColor={COLORS.textMuted || '#997D93'}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>

          {/* ช่องกรอกรหัสผ่าน */}
          <View style={styles.inputGroup}>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={[styles.input, { paddingRight: 45 }]}
                placeholder="••••••••••••"
                placeholderTextColor={COLORS.textMuted || '#997D93'}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                {/* ไอคอนเปิดตา / ปิดตาจาก Library */}
                <Ionicons 
                  name={showPassword ? "eye-outline" : "eye-off-outline"} 
                  size={22} 
                  color={COLORS.textMuted || '#997D93'} 
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* จำรหัสผ่าน / ลืมรหัสผ่าน */}
          <View style={styles.optionsRow}>
            <TouchableOpacity 
              style={styles.checkboxContainer} 
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                {rememberMe && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.checkboxLabel}>จำรหัสผ่าน</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => Alert.alert('แจ้งเตือน', 'ไปที่หน้าลืมรหัสผ่าน')}>
              <Text style={styles.forgotLink}>ลืมรหัสผ่าน</Text>
            </TouchableOpacity>
          </View>

          {/* ปุ่มเข้าสู่ระบบ */}
          <TouchableOpacity 
            style={styles.btnPrimary} 
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.btnTextBold}>เข้าสู่ระบบ</Text>
          </TouchableOpacity>

          {/* ปุ่มเข้าสู่ระบบด้วย Gmail */}
          <TouchableOpacity
            style={styles.btnSecondary}
            onPress={() => Alert.alert('Gmail', 'เข้าสู่ระบบด้วย Gmail')}
            activeOpacity={0.8}
          >
            <Text style={styles.btnTextBold}>เข้าสู่ระบบด้วย Gmail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: COLORS.bgPink || '#FFD2EC',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: COLORS.white || '#FFFFFF',
    borderRadius: 28,
    paddingVertical: 30,
    paddingHorizontal: 20,
    width: '100%',
    maxWidth: 360,
    position: 'relative',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.borderDark || '#1A1A1A',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.borderDark || '#1A1A1A',
    backgroundColor: COLORS.white || '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textMain || '#1A1A1A',
  },
  logoContainer: {
    width: 70,
    height: 70,
    backgroundColor: COLORS.white || '#FFFFFF',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.borderDark || '#1A1A1A',
    marginBottom: 12,
    overflow: 'hidden',
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  title: {
    color: COLORS.primaryPink || '#FF83C6',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 14,
  },
  input: {
    width: '100%',
    backgroundColor: COLORS.white || '#FFFFFF',
    borderWidth: 1.5,
    borderColor: COLORS.borderDark || '#1A1A1A',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 15,
    color: COLORS.textMain || '#1A1A1A',
  },
  passwordWrapper: {
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
  },
  eyeButton: {
    position: 'absolute',
    right: 15,
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1.5,
    borderColor: COLORS.borderDark || '#1A1A1A',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white || '#FFFFFF',
  },
  checkboxChecked: {
    backgroundColor: COLORS.primaryPink || '#FF83C6',
  },
  checkmark: {
    color: COLORS.white || '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    color: COLORS.textMain || '#1A1A1A',
    fontSize: 13,
  },
  forgotLink: {
    color: COLORS.textLink || '#FF3B3B',
    fontSize: 13,
    fontWeight: '500',
  },
  btnPrimary: {
    backgroundColor: COLORS.primaryPink || '#FF83C6',
    borderWidth: 2,
    borderColor: COLORS.borderDark || '#1A1A1A',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    width: '100%',
  },
  btnSecondary: {
    backgroundColor: COLORS.secondaryYellow || '#FFF2B2',
    borderWidth: 2,
    borderColor: COLORS.borderDark || '#1A1A1A',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    width: '100%',
    marginTop: 12,
  },
  btnTextBold: {
    color: COLORS.textMain || '#1A1A1A',
    fontSize: 16,
    fontWeight: 'bold',
  },
});