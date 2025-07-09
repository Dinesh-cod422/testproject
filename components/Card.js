import { StyleSheet, View } from 'react-native';

export const Card = ({ children }) => (
  <View style={styles.card}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f3f4f6', 
    borderRadius: 8,            
    padding: 16,               
    marginBottom: 12,          
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,        
    shadowRadius: 2,
    elevation: 1,              
  },
});