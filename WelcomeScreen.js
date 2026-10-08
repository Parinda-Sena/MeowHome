import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Image 
} from 'react-native';
import { COLORS } from '../styles/colors';
import { THEME } from '../styles/theme';

export default function WelcomeScreen({ onNavigateToLogin, onNavigateToRegister }) {
  return (
    <View style={styles.container}>
      {/* ส่วนหัวแถบชมพูด้านบน */}
      <View style={styles.topHeader} />

      <View style={styles.content}>
        {/* โลโก้ Meow Home */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('../asset/logo.png')} 
            style={styles.logoImage} 
            resizeMode="cover"
          />
        </View>

        {/* ข้อความต้อนรับ */}
        <Text style={styles.title}>ยินดีต้อนรับสู่ Meow Home</Text>
        <Text style={styles.subtitle}>บ้านหลังใหม่ที่แสนอบอุ่นของทาสแมว</Text>

        {/* รูปน้องแมวส้ม */}
        <View style={styles.mascotContainer}>
          <Image 
            source={require('../asset/mascot.png')} 
            style={styles.mascotImage} 
            resizeMode="contain"
          />
        </View>

        {/* ปุ่มกด */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity 
            style={styles.btnPrimary} 
            onPress={onNavigateToLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.btnTextBold}>เข้าสู่ระบบ</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.btnSecondary} 
            onPress={onNavigateToRegister}
            activeOpacity={0.8}
          >
            <Text style={styles.btnTextBold}>สมัครสมาชิก</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgPink || '#FFD2EC',
    alignItems: 'center',
  },
  topHeader: {
    width: '100%',
    height: 90, // แถบชมพูด้านบน
    backgroundColor: COLORS.headerPink || '#FF9BE4',
  },
  content: {
    width: '100%',
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: 20, // ขยับเลื่อนเนื้อหาทั้งหมดลงมาให้พ้นขอบชมพู
  },
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.white || '#FFFFFF',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.borderDark || '#1A1A1A',
    marginBottom: 16,
    overflow: 'hidden', // ตัดส่วนเกินให้รูปโค้งตามวงกลม
  },
  logoImage: {
    width: '100%', // ขยายรูปโลโก้ให้เต็มวงกลมพอดี
    height: '100%',
  },
  title: {
    color: COLORS.primaryPink || '#FF83C6',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    color: COLORS.textSubtitle || '#997D93',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 16,
    textAlign: 'center',
  },
  mascotContainer: {
    width: 180,
    height: 180,
    marginVertical: 10,
  },
  mascotImage: {
    width: '100%',
    height: '100%',
  },
  buttonGroup: {
    width: '100%',
    gap: 12,
    marginTop: 10,
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
  },
  btnTextBold: {
    color: COLORS.textMain || '#1A1A1A',
    fontSize: 18,
    fontWeight: 'bold',
  },
});