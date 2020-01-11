import React from 'react'
import {
    Svg,
    Path
} from 'react-native-svg'
import MainTheme from '../../MainTheme'

export default function IconRating({color = MainTheme.palette.dark, ...rest}){
    return (
        <Svg 
            width={12} 
            height={12}
            fill={color} 
            viewBox="0 0 24 24"
            {...rest}
        >
            <Path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.45 4.73L5.82 21 12 17.27z" />
        </Svg>
    )
}
