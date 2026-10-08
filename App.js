import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { initDatabase } from './src/database/database';

import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import QuestionScreen from './src/screens/QuestionScreen';
import HomeScreen from './src/screens/HomeScreen';

console.log('WelcomeScreen:', WelcomeScreen);
console.log('LoginScreen:', LoginScreen);
console.log('RegisterScreen:', RegisterScreen);
console.log('QuestionScreen:', QuestionScreen);
console.log('HomeScreen:', HomeScreen);

export default function App() {
  const [currentPage, setCurrentPage] = useState('welcome');
  const [currentUserId, setCurrentUserId] = useState(null); // เก็บ userId ของคนที่เข้าสู่ระบบหรือเพิ่งสมัคร

  // 2. เรียกใช้งาน initDatabase เมื่อเริ่มเปิดแอป
  useEffect(() => {
    try {
      initDatabase();
    } catch (error) {
      console.error('Init Database Failed:', error);
      Alert.alert('ข้อผิดพลาด', 'ไม่สามารถเชื่อมต่อฐานข้อมูลได้');
    }
  }, []);

  return (
    <View style={styles.container}>
      {/* 1. หน้า Welcome */}
      {currentPage === 'welcome' && (
        <WelcomeScreen
          onNavigateToLogin={() => setCurrentPage('login')}
          onNavigateToRegister={() => setCurrentPage('register')}
        />
      )}

      {/* 2. หน้า Login */}
      {currentPage === 'login' && (
        <LoginScreen
          onClose={() => setCurrentPage('welcome')}
          onLoginSuccess={(userId) => {
            setCurrentUserId(userId);
            setCurrentPage('home');
          }}
        />
      )}

      {/* 3. หน้า Register (สมัครสมาชิก) */}
      {currentPage === 'register' && (
        <RegisterScreen
          onClose={() => setCurrentPage('welcome')}
          onRegisterSuccess={(newUserId) => {
            setCurrentUserId(newUserId); // บันทึก userId ที่สมัครใหม่
            setCurrentPage('question');   // ย้ายไปหน้าแบบสอบถาม
          }}
          onNavigateToLogin={() => setCurrentPage('login')}
        />
      )}

      {/* 4. หน้า แบบสอบถาม (QuestionScreen) */}
      {currentPage === 'question' && (
        <QuestionScreen
          userId={currentUserId} // ส่ง userId ต่อให้หน้าแบบสอบถามใช้บันทึกลง DB
          onBack={() => setCurrentPage('register')}
          onComplete={() => setCurrentPage('login')}
        />
      )}

      {/* 5. หน้า Home */}
      {currentPage === 'home' && (
        <HomeScreen
          userId={currentUserId}
          onLogout={() => {
            setCurrentUserId(null);
            setCurrentPage('welcome');
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
});