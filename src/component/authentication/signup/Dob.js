import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Button, Text, View, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {styles} from './DobStyle';

const Dob = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();
  const handleConfirm = selectedDate => {
    setOpen(false);
    setDate(selectedDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textdob}>What's your Date of Birth</Text>

      <Text onPress={() => setOpen(true)} style={styles.seldate}>
        Select Date
      </Text>
      <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => {
          setOpen(false);
        }}
      />
      {date && <Text>Selected Date: {date.toISOString().split('T')[0]}</Text>}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Bottomnav');
        }}
        style={styles.pressnext}>
        <Text style={styles.textnext}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Dob;
