import React from 'react';
import {
  TextInput,
  SafeAreaView,
  Animated,
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('screen');

const minAge = 1;
const maxAge = 100;
const segmentWidth = 2;
const segmentSpacing = 20;
const snapSegment = segmentWidth + segmentSpacing;
const spacerWidth = (width - segmentWidth) / 2;
const rulerWidth = spacerWidth * 2 + (maxAge - minAge) * snapSegment;
const indicatorWidth = 100;
const indicatorHeight = 80;

const data = [...Array(maxAge - minAge + 1).keys()].map(i => i + minAge);

const Ruler = ({ scrollX }) => {
  return (
    <View style={styles.ruler}>
      <View style={styles.spacer} />
      {data.map(i => {
        const inputRange = [
          (i - 1) * snapSegment,
          i * snapSegment,
          (i + 1) * snapSegment,
        ];

        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.5, 0.8],
          extrapolate: 'clamp',
        });

        const color = scrollX.interpolate({
          inputRange,
          outputRange: ['#999', '#FFFFFF', '#999'],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={i}
            style={[
              styles.segment,
              {
                backgroundColor: color,
                height: i % 10 === 0 ? 40 : 20,
                marginRight: i === data.length - 1 ? 0 : segmentSpacing,
                transform: [{ scale }],
              },
            ]}
          >
            <Animated.Text style={[styles.label, { color }]}>
              {i}
            </Animated.Text>
          </Animated.View>
        );
      })}
      <View style={styles.spacer} />
    </View>
  );
};

export default class HowOld extends React.Component {
  scrollViewRef = React.createRef();
  textInputRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      scrollX: new Animated.Value(0),
      initialAge: 10,
      selectedAge: 10,
    };

    this.state.scrollX.addListener(({ value }) => {
      const currentIndex = Math.round((value - snapSegment / 2) / snapSegment) + minAge;
      if (this.textInputRef.current) {
        this.textInputRef.current.setNativeProps({
          text: `${currentIndex}`,
        });
      }
      this.setState({ selectedAge: currentIndex });
    });
  }

  componentDidMount() {
    setTimeout(() => {
      if (this.scrollViewRef.current) {
        this.scrollViewRef.current.scrollTo({
          x: (this.state.initialAge - minAge) * snapSegment - (width / 2 - segmentWidth / 2),
          y: 0,
          animated: false,  // Remove animation here
        });
      }
    }, 1000);

    // Charger l'âge depuis AsyncStorage
    this.loadAge();
  }

  loadAge = async () => {
    try {
      const age = await AsyncStorage.getItem('selectedAge');
      if (age !== null) {
        this.setState({ selectedAge: parseInt(age, 10) });
        this.textInputRef.current.setNativeProps({ text: age });
      }
    } catch (error) {
      console.error('Error loading age:', error);
    }
  };

  handleContinuePress = async () => {
    const { selectedAge } = this.state;

    // Stocker l'âge dans AsyncStorage
    try {
      await AsyncStorage.setItem('selectedAge', selectedAge.toString());
      console.log('Selected Age:', selectedAge);
      this.props.navigation.navigate('WeightPage', { age: selectedAge });
    } catch (error) {
      console.error('Error saving age:', error);
      Alert.alert('Error', 'Failed to save the age.');
    }
  };

  render() {
    const { navigation } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>{'<'} Back</Text>
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>How Old Are You?</Text>
        </View>

        <Animated.ScrollView
          ref={this.scrollViewRef}
          horizontal
          contentContainerStyle={styles.scrollViewContainerStyle}
          bounces={false}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={8}
          snapToInterval={snapSegment}
          decelerationRate="fast"
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { x: this.state.scrollX },
                },
              },
            ],
            { useNativeDriver: false }
          )}
        >
          <Ruler scrollX={this.state.scrollX} />
        </Animated.ScrollView>

        <View style={styles.indicatorWrapper}>
          <TextInput
            ref={this.textInputRef}
            style={styles.ageTextStyle}
            defaultValue={this.state.initialAge.toString()}
            editable={false}
          />
          <View style={styles.arrowIndicator} />
        </View>
        <TouchableOpacity style={styles.continueButton} onPress={this.handleContinuePress}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141824',
    position: 'relative',
  },
  backButton: {
    marginTop: -20,
    marginLeft: 2,
  },
  backButtonText: {
    color: '#FD6639',
    fontSize: 18,
    top: 20,
    left: 15,
  },
  titleContainer: {
    marginBottom: 230,
    alignItems: 'center',
  },
  title: {
    top: 50,
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  arrowIndicator: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderBottomWidth: 24,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#ffff',
    borderRadius: 5,
    marginLeft: 22,
    top: 70,
  },
  indicatorWrapper: {
    position: 'absolute',
    left: (width - indicatorWidth) / 2,
    top: 250,
    alignItems: 'center',
    justifyContent: 'center',
    width: indicatorWidth,
  },
  segmentIndicator: {
    height: indicatorHeight,
    backgroundColor: '#FD6639',
  },
  ruler: {
    backgroundColor: '#FD6639',
    width: rulerWidth,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    height: 120,
    alignSelf: 'center',
    maxWidth: rulerWidth,
    bottom: 30,
  },
  segment: {
    width: segmentWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContainerStyle: {
    justifyContent: 'flex-end',
    left: 25,
  },
  label: {
    position: 'absolute',
    top: -45,
    fontSize: 10,
  },
  ageTextStyle: {
    fontSize: 42,
    color: '#FFFFFF',
  },
  spacer: {
    width: spacerWidth,
    backgroundColor: 'transparent',
  },
  continueButton: {
    backgroundColor: '#FD6639',
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderRadius: 25,
    marginVertical: 20,
    width: '50%',
    alignSelf: 'center',
    marginBottom: 60,
  },
  continueButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
