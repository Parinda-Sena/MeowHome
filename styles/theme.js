// src/styles/theme.js
import { COLORS } from './colors';

export const THEME = {
  colors: COLORS,
  
  borderRadius: {
    pill: '50px',            // ปุ่มทรงแคปซูล
    card: '28px',            // การ์ดป๊อบอัพ
    input: '24px',           // ช่องกรอกข้อมูล 
    circle: '50%',           // รูปวงกลมปุ่ม X ปิดหน้าต่าง
  },
  borders: {
    outline: `2px solid ${COLORS.borderDark}`, // เส้นขอบสีดำ
    input: `1.5px solid ${COLORS.borderDark}`, // เส้นขอบช่อง
  },

  buttons: {
    primary: {
      backgroundColor: COLORS.primaryPink,
      color: COLORS.textMain,
      border: `2px solid ${COLORS.borderDark}`,
      borderRadius: '50px',
      padding: '14px 28px',
      fontSize: '18px',
      fontWeight: 'bold',
      cursor: 'pointer',
      width: '100%',
      boxSizing: 'border-box',
    },
    secondary: {
      backgroundColor: COLORS.secondaryYellow,
      color: COLORS.textMain,
      border: `2px solid ${COLORS.borderDark}`,
      borderRadius: '50px',
      padding: '14px 28px',
      fontSize: '18px',
      fontWeight: 'bold',
      cursor: 'pointer',
      width: '100%',
      boxSizing: 'border-box',
    },
  },
};