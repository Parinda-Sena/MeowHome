import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

export default function HomeScreen({ userId, onLogout }) {
  // สถานะจำลองสำหรับการกดหัวใจ/กดเซฟ (ตัวอย่าง)
  const [likedPosts, setLikedPosts] = useState({ 1: true, 2: false });
  const [savedPosts, setSavedPosts] = useState({ 1: false, 2: false });

  const toggleLike = (postId) => {
    setLikedPosts((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const toggleSave = (postId) => {
    setSavedPosts((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FF83C6" barStyle="light-content" />

      {/* Header Bar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn}>
          <Ionicons name="menu-outline" size={26} color="#000" />
        </TouchableOpacity>

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerBtn}>
            <Ionicons name="add-circle-outline" size={28} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.headerBtn, { marginLeft: 12 }]}>
            <Ionicons name="notifications-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Feed List Container */}
      <ScrollView
        style={styles.feedContainer}
        contentContainerStyle={styles.feedContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Post 1: Lovely */}
        <View style={styles.postCard}>
          <View style={styles.postHeader}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=150',
              }}
              style={styles.avatar}
            />
            <Text style={styles.username}>Lovely</Text>
          </View>

          <Text style={styles.postText}>
            เลิฟลี่เป็นเด็กดีมากก ไม่ชนเลย กินนมอิ่มก็นอน เลี้ยงง่ายมาก
          </Text>

          {/* Post Actions */}
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.actionBtn}>
              <Ionicons name="chatbubble-outline" size={22} color="#000" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionBtn}>
              <Feather name="send" size={20} color="#000" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => toggleSave(1)}
            >
              <Ionicons
                name={savedPosts[1] ? 'bookmark' : 'bookmark-outline'}
                size={22}
                color="#000"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => toggleLike(1)}
            >
              <Ionicons
                name={likedPosts[1] ? 'heart' : 'heart-outline'}
                size={24}
                color={likedPosts[1] ? '#FF0000' : '#000'}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Post 2: คอฟฟี่ */}
        <View style={styles.postCard}>
          <View style={styles.postHeader}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=150',
              }}
              style={styles.avatar}
            />
            <Text style={styles.username}>คอฟฟี่</Text>
          </View>

          {/* Post Image */}
          <View style={styles.imageWrapper}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=600',
              }}
              style={styles.postImage}
              resizeMode="cover"
            />
          </View>

          {/* Post Actions */}
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.actionBtn}>
              <Ionicons name="chatbubble-outline" size={22} color="#000" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionBtn}>
              <Feather name="send" size={20} color="#000" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => toggleSave(2)}
            >
              <Ionicons
                name={savedPosts[2] ? 'bookmark' : 'bookmark-outline'}
                size={22}
                color="#000"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => toggleLike(2)}
            >
              <Ionicons
                name={likedPosts[2] ? 'heart' : 'heart-outline'}
                size={24}
                color={likedPosts[2] ? '#FF0000' : '#000'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navBtn}>
          <Ionicons name="home-outline" size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navBtn}>
          <Ionicons name="bookmark-outline" size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navBtn}>
          <Feather name="send" size={22} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navBtn} onPress={onLogout}>
          <Ionicons name="person-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF83C6', // สีชมพูโทนหลักตามดีไซน์
  },
  header: {
    height: 56,
    backgroundColor: '#FF83C6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerBtn: {
    padding: 4,
  },
  feedContainer: {
    flex: 1,
    backgroundColor: '#FFCBEA', // พื้นหลังชมพูอ่อนช่วง Feed
  },
  feedContent: {
    padding: 16,
    paddingBottom: 24,
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    // เงาสมูทสำหรับ Android & iOS
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  username: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  postText: {
    fontSize: 14,
    color: '#222',
    lineHeight: 20,
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  imageWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },
  postImage: {
    width: '100%',
    height: 180,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    marginRight: 16,
    padding: 2,
  },
  bottomNav: {
    height: 60,
    backgroundColor: '#FF83C6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
  },
  navBtn: {
    padding: 8,
  },
});