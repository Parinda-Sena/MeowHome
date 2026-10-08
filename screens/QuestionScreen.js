import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  Modal 
} from 'react-native';
import { COLORS } from '../styles/colors';

export default function QuestionScreen({ onBack, onNavigateToLogin }) {
  const [answers, setAnswers] = useState({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
    q6: '',
    q7: '',
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleInputChange = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    console.log('Question Answers:', answers);
    // เมื่อกดตอบแบบสอบถามเสร็จ ให้แสดง Popup สำเร็จ
    setShowSuccessModal(true);
  };

  const questions = [
    { key: 'q1', label: 'ข้อที่ 1 เงินเดือนเท่าไหร่' },
    { key: 'q2', label: 'ข้อที่ 2 อาศัยอยู่ไหน เช่น บ้าน,คอนโด,หอพัก' },
    { key: 'q3', label: 'ข้อที่ 3 และถ้าเป็นคอนโดหรือหอพักสามารถเลี้ยงสัตว์ได้หรือไม่\n(โปรดแนบเอกสารที่แสดงว่าท่านเลี้ยงได้)' },
    { key: 'q4', label: 'ข้อที่ 4 เลี้ยงแมวระบบปิดได้ใช่หรือไม่' },
    { key: 'q5', label: 'ข้อที่ 5 สามารถพาแมวไปหาสัตวแพทย์เมื่อป่วยได้ใช่หรือไม่\n*ถ้าไม่ได้โปรดระบุเหตุผล' },
    { key: 'q6', label: 'ข้อ 6 คนที่บ้านยินยอมให้เลี้ยงกันหมดทุกคนใช่หรือไม่' },
    { key: 'q7', label: 'ข้อที่ 7 ทางบ้านได้เลี้ยงแมวหรือไม่ แล้วมีแมวกี่ตัว' },
  ];

  return (
    <View style={styles.container}>
      {/* ส่วนหัว + ปุ่มย้อนกลับ */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        {/* แถบหัวข้อแบบสอบถาม */}
        <View style={styles.titleBanner}>
          <Text style={styles.bannerText}>แบบสอบถามความพร้อมเลี้ยง</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%' }}>
          {questions.map((q) => (
            <View key={q.key} style={styles.questionBlock}>
              <Text style={styles.questionLabel}>{q.label}</Text>
              <TextInput
                style={styles.input}
                placeholder="ใส่คำตอบ"
                placeholderTextColor="#997D93"
                value={answers[q.key]}
                onChangeText={(text) => handleInputChange(q.key, text)}
              />
            </View>
          ))}

          {/* ปุ่มยืนยันคำตอบ */}
          <TouchableOpacity style={styles.btnSubmit} onPress={handleSubmit}>
            <Text style={styles.btnSubmitText}>กดยืนยันคำตอบ</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Popup Register Complete (แสดงขึ้นมาหลังจากตอบแบบสอบถาม) */}
      <Modal visible={showSuccessModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>ลงทะเบียนสำเร็จ</Text>
            <Text style={styles.modalSubtitle}>โปรดเข้าสู่ระบบ</Text>
            
            <TouchableOpacity 
              style={styles.btnConfirm} 
              onPress={() => {
                setShowSuccessModal(false);
                if (onNavigateToLogin) onNavigateToLogin();
              }}
            >
              <Text style={styles.btnConfirmText}>ตกลง</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgPink || '#FFD2EC',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 16,
  },
  headerRow: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF2B2',
    borderWidth: 1.5,
    borderColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: { fontSize: 18, fontWeight: 'bold' },
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    borderWidth: 2,
    borderColor: '#1A1A1A',
    alignItems: 'center',
  },
  titleBanner: {
    backgroundColor: '#FFF2B2',
    borderWidth: 1.5,
    borderColor: '#1A1A1A',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  bannerText: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  questionBlock: { marginBottom: 12, width: '100%' },
  questionLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  input: {
    width: '100%',
    backgroundColor: '#FFF',
    borderWidth: 1.5,
    borderColor: '#1A1A1A',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 13,
  },
  btnSubmit: {
    backgroundColor: '#FFF2B2',
    borderWidth: 2,
    borderColor: '#1A1A1A',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    width: '80%',
    alignSelf: 'center',
  },
  btnSubmitText: { fontSize: 16, fontWeight: 'bold', color: '#000' },

  // Popup Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#FFD2EC',
    borderRadius: 20,
    padding: 24,
    width: '85%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1A1A1A',
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  modalSubtitle: { fontSize: 14, color: '#555', marginBottom: 20 },
  btnConfirm: {
    backgroundColor: '#FFF2B2',
    borderWidth: 2,
    borderColor: '#1A1A1A',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 32,
  },
  btnConfirmText: { fontSize: 16, fontWeight: 'bold' },
});