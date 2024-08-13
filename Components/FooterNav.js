import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

const FooterNav = () => {
  return (
    <View style={styles.footer}>
      <View style={styles.footerItem}>
        <FontAwesome name="heartbeat" size={24} color="white" />
      </View>
      <View style={styles.footerItem}>
        <FontAwesome5 name="dumbbell" size={24} color="white" />
      </View>
      <View style={styles.footerItem}>
        <FontAwesome5 name="plus-circle" size={24} color="white" />
      </View>
      <View style={styles.footerItem}>
        <FontAwesome name="apple" size={24} color="white" />
      </View>
      <View style={styles.footerItem}>
        <FontAwesome5 name="user" size={24} color="white" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: '#222435',
    borderRadius: 16,
  },
  footerItem: {
    alignItems: 'center',
  },
});

export default FooterNav;
