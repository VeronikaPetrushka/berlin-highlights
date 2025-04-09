import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Dimensions, Text, Animated, Easing, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const horizontalPlatform = require('../assets/game/horizontal.png');
const verticalPlatform = require('../assets/game/vertical.png');
const coin = require('../assets/game/coin.png');
const runnerImage = require('../assets/game/runner.png');
const pauseIcon = require('../assets/game/pause.png');

const MiniGame = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(1);
  const [platforms, setPlatforms] = useState(generateInitialPlatforms());
  const [runnerY, setRunnerY] = useState(new Animated.Value(0));
  const [jumping, setJumping] = useState(false);
  const [runnerPosition, setRunnerPosition] = useState({ x: 50, y: height * 0.6 });
  const [coins, setCoins] = useState(0);
  const [timer, setTimer] = useState(3);
  const timerRef = useRef(null);
  const gameOver = useRef(false);
    
    useEffect(() => {
  const moveInterval = setInterval(() => {
    if (gameOver.current) return;

    setPlatforms((prevPlatforms) => {
      const updatedPlatforms = prevPlatforms.map((p) => ({
        ...p,
        x: p.x - 2,
      }));

      // Remove platforms off-screen and generate new ones
      if (updatedPlatforms.length && updatedPlatforms[0].x < -100) {
        updatedPlatforms.shift(); // remove first
        updatedPlatforms.push({
          type: Math.random() > 0.5 ? 'horizontal' : 'vertical',
          x: updatedPlatforms[updatedPlatforms.length - 1].x + 120,
          y: height * 0.6,
          hasCoin: Math.random() > 0.5,
        });
      }

      return updatedPlatforms;
    });
  }, 16);

  return () => clearInterval(moveInterval);
}, []);

  function generateInitialPlatforms() {
    return new Array(4).fill(null).map((_, i) => ({
      type: i % 2 === 0 ? 'horizontal' : 'vertical',
      x: 100 + i * 120,
      y: height * 0.6,
      hasCoin: Math.random() > 0.5,
    }));
  }

  const togglePlatformTypes = () => {
    setPlatforms((prev) =>
      prev.map((p) => ({ ...p, type: p.type === 'horizontal' ? 'vertical' : 'horizontal' }))
    );
  };
    
    useEffect(() => {
        const id = runnerY.addListener(({ value }) => {
            setRunnerPosition((pos) => ({ ...pos, y: height * 0.6 + value }));
        });

        return () => runnerY.removeListener(id);
    }, []);

    useEffect(() => {
        timerRef.current = setInterval(() => {
        setTimer((prev) => {
            if (prev === 1) {
            togglePlatformTypes();
            return 3;
            }
            return prev - 1;
        });
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, []);

    const checkLanding = () => {
        const landedPlatform = platforms.find(
            (p) =>
            p.x < runnerPosition.x + 40 &&
            p.x + 60 > runnerPosition.x + 20
        );

        if (!landedPlatform || landedPlatform.type !== 'horizontal') {
            gameOver.current = true;
            Alert.alert('Game Over', 'You missed or landed on a vertical platform');
        } else {
            if (landedPlatform.hasCoin) {
            setCoins((prev) => prev + 1);
            landedPlatform.hasCoin = false;
            }
        }
    };

    const handleJump = () => {
        if (jumping || gameOver.current) return;

        setJumping(true);
        Animated.sequence([
            Animated.timing(runnerY, {
            toValue: -80,
            duration: 300,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
            }),
            Animated.timing(runnerY, {
            toValue: 0,
            duration: 300,
            easing: Easing.in(Easing.quad),
            useNativeDriver: true,
            }),
        ]).start(() => {
            setJumping(false);
            checkLanding();
        });
    };

  useEffect(() => {
    const moveInterval = setInterval(() => {
      setPlatforms((prev) => {
        const updated = prev.map((p) => ({ ...p, x: p.x - 2 }));

        const underRunner = updated.find(
          (p) => p.x < runnerPosition.x + 40 && p.x + 60 > runnerPosition.x + 20
        );

        if (underRunner) {
          if (underRunner.type === 'vertical' && !jumping) {
            clearInterval(moveInterval);
            Alert.alert('Lose');
          }
          if (underRunner.hasCoin) {
            setCoins((prev) => prev + 1);
            underRunner.hasCoin = false;
          }
        } else {
          clearInterval(moveInterval);
          Alert.alert('Lose');
        }

        return updated;
      });
    }, 16);

    return () => clearInterval(moveInterval);
  }, [jumping]);

  if (currentIndex === 0) {
    return (
      <View style={styles.container}>
            {
                currentIndex === 0 && (
                    <View style={{width: '100%', alignItems: 'center', padding: 20, paddingTop: height * 0.07}}>

                        <TouchableOpacity style={[styles.btn, {alignSelf: 'flex-end', width: 53, height: 53}]} onPress={() => navigation.navigate('StoreScreen')}>
                            <Image source={require('../assets/icons/store.png')} style={{width: 39, height: 40, resizeMode: 'contain'}} />
                        </TouchableOpacity>

                        <Image source={require('../assets/decor/logo.png')} style={{width: 135, height: height * 0.11, resizeMode: 'contain', marginBottom: height * 0.05, marginTop: 20}} />
                        
                        <Text style={[styles.text, {marginBottom: height * 0.06}]}>Get ready for an exciting adventure across the platforms of Berlin! 🏙️ Your goal is to jump over vertical platforms ⬆️ and land on horizontal ones ⬇️, avoiding dangers ⚠️ along the way. Every 3 seconds ⏱️, the platforms change position 🔄, so always stay alert! 👀</Text>

                        <TouchableOpacity style={styles.btn} onPress={() => setCurrentIndex((prev) => prev + 1)}>
                            <Image source={require('../assets/icons/arrow.png')} style={{width: 34, height: 22, resizeMode: 'contain'}} />
                        </TouchableOpacity>

                    </View>
                )
            }
      </View>
    );
  }

  return (
    <TouchableOpacity activeOpacity={1} style={styles.container} onPress={handleJump}>
      <View style={styles.header}>
        <Image source={pauseIcon} style={{ width: 32, height: 32 }} />
        <Text style={styles.timer}>{timer} sec.</Text>
        <View style={styles.coinContainer}>
          <Image source={coin} style={styles.coinIcon} />
          <Text style={styles.coinText}>{coins}</Text>
        </View>
      </View>

      {platforms.map((platform, index) => (
        <>
          <Image
            key={`p-${index}`}
            source={platform.type === 'horizontal' ? horizontalPlatform : verticalPlatform}
            style={[styles.platform, { left: platform.x, top: platform.y }]}
          />
          {platform.hasCoin && (
            <Image key={`c-${index}`} source={coin} style={[styles.coin, { left: platform.x + 10, top: platform.y - 20 }]} />
          )}
        </>
      ))}

      <Animated.Image
        source={runnerImage}
        style={[styles.runner, { transform: [{ translateY: runnerY }] }]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
  },
  timer: {
    backgroundColor: '#ff515b',
    color: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 5,
    fontSize: 16,
    fontWeight: '600',
  },
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinIcon: {
    width: 24,
    height: 24,
    marginRight: 6,
  },
  coinText: {
    fontSize: 18,
    color: '#ff515b',
    fontWeight: '600',
  },
  platform: {
    width: 60,
    height: 15,
    position: 'absolute',
    resizeMode: 'contain',
  },
  coin: {
    width: 22,
    height: 22,
    position: 'absolute',
    resizeMode: 'contain',
  },
  runner: {
    width: 50,
    height: 50,
    position: 'absolute',
    left: 50,
    top: height * 0.6 - 50,
    resizeMode: 'contain',
  },
});

export default MiniGame;
