import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import React, {useState, useEffect} from 'react'
import Animated, { 
    interpolateColor, 
    useSharedValue, 
    useAnimatedStyle, 
    withSpring, 
    withTiming, 
    useDerivedValue 
} from 'react-native-reanimated'

type Props = {
    activeColor: string,
    inactiveColor: string
}

const CustomSwitch = ({activeColor, inactiveColor}: Props) => {
    const [active, setActive] = useState(false);

    const switchTranslate = useSharedValue(0);

    const progress = useDerivedValue(() => {
        return withTiming(active ? 22 : 0)
    })

    useEffect(() => {
        if(active){
            switchTranslate.value = 22
        } else {
            switchTranslate.value = 4
        }
    }, [active, switchTranslate])

    const backgroundColorStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            progress.value,
            [0, 22],
            [inactiveColor,activeColor]
        );
        return {
            backgroundColor
        }
    })

    const customSpringStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: withSpring(switchTranslate.value, {
                        mass: 1,
                        damping: 15,
                        stiffness: 120,
                        overshootClamping: false,
                        restSpeedThreshold: 0.001,
                        restDisplacementThreshold: 0.001
                    })
                }
            ]
        }
    })

    return (
        <TouchableWithoutFeedback onPress={() => {
            setActive(!active)
        }}>
            <Animated.View style={[styles.container, backgroundColorStyle]}>
                <Animated.View style={[styles.circle, customSpringStyle]} />
            </Animated.View>
        </TouchableWithoutFeedback>
    )
}

export default CustomSwitch

const styles = StyleSheet.create({
    container: {
        width: 50,
        height: 28,
        backgroundColor: '#F2F5F7',
        borderRadius: 30,
        justifyContent: 'center'
    },
    circle: {
        width: 24,
        height: 24,
        backgroundColor: 'white',
        borderRadius: 30,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.2,
        shadowRadius: 2.5,
        elevation: 4
    }
})