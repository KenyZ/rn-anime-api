import React, {
    useEffect,
    useState,
} from 'react'
import {
    View,
    Text,
    StyleSheet,

    TouchableHighlight,
    Alert,
    FlatList,
    Image,
} from 'react-native'
import {
    Svg,
    Rect,
    Circle
} from 'react-native-svg'


import Utils from '../Utils'
import IconRating from '../shared/icons/icon.rating'
import MainTheme from '../MainTheme'

const TAB_RECOMMENDED = "TAB_RECOMMENDED"
const TAB_POPULAR = "TAB_POPULAR"
const TAB_RECENT = "TAB_RECENT"



export default function PageHome(){

    /**
     * STATES
     */
    const [tabIndex, setTabIndex] = useState(TAB_POPULAR)
    const [popularList, setPopularList] = useState([])

    /**
     * HOOKS
     */

    const fetchPopularList = () => {

        try {
            fetch("https://api.jikan.moe/v3/top/anime/")
            .then(response => response.json())
            .then(fetchedData => {
                setPopularList(fetchedData.top)
            })
        } catch (FetchingPopularListError) {
            console.error("Hey")
        }

        return () => {

        }

    }

     useEffect(fetchPopularList, [])
    /**
     * PRIVATES
     */

    /**
     * EVENTS
     */
    const onPressTab = _tabIndex => () => setTabIndex(_tabIndex)

    return (
        <View style={styles.container}>

            {
                /**
                 * HEADER
                 */
            }
            <View style={styles.header}>
                <View style={styles.header_title}>
                    <Text style={styles.header_title_text}>What do you want to read ?</Text>
                </View>
                <View style={styles.tabsNav}>
                    {/* <TouchableHighlight 
                        style={[
                            styles.tabsNav_item,
                            tabIndex === TAB_RECOMMENDED && styles.tabsNav_item__selected
                        ]}
                        onPress={onPressTab(TAB_RECOMMENDED)}
                    >
                        <Text style={styles.tabsNav_item_text}>For you</Text>
                    </TouchableHighlight> */}

                    <TouchableHighlight 
                        style={[
                            styles.tabsNav_item,
                            tabIndex === TAB_POPULAR && styles.tabsNav_item__selected
                        ]}
                        onPress={onPressTab(TAB_POPULAR)}
                    >
                        <Text style={styles.tabsNav_item_text}>POPULAR</Text>
                    </TouchableHighlight>

                    {/* <TouchableHighlight 
                        style={[
                            styles.tabsNav_item,
                            tabIndex === TAB_RECENT && styles.tabsNav_item__selected
                        ]}                    
                        onPress={onPressTab(TAB_RECENT)}
                    >
                        <Text style={styles.tabsNav_item_text}>Recent</Text>
                    </TouchableHighlight> */}
                </View>
            
                <View style={styles.tabsList}>
                    <View style={styles.tabsList_panel}>
                        <FlatList
                            data={popularList}
                            keyExtractor={item => "key-" + item.mal_id}
                            extraData={popularList}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({item, index}) => {
                                return (
                                    <View 
                                        style={[
                                            styles.tabsList_panel_item,
                                            index === 0 && styles.tabsList_panel_item$firstChild
                                        ]}
                                    >
                                        <Image
                                            source={{uri: item.image_url}}
                                            style={styles.tabsList_panel_item_img}
                                        />
                                        <View style={styles.tabsList_panel_item_body}>
                                            <Text ellipsizeMode={"tail"} numberOfLines={2} style={styles.tabsList_panel_item_body_title}>{item.title}</Text>
                                            <Text style={styles.tabsList_panel_item_body_rowText}>Type: {item.type}</Text>
                                            {
                                                item.type !== "Movie" && (
                                                    <Text style={styles.tabsList_panel_item_body_rowText}>Episodes: {item.episodes}</Text>
                                                )
                                            }
                                            <View style={styles.tabsList_panel_item_body_rating}>
                                                <IconRating color={MainTheme.palette.purple[300]} style={styles.tabsList_panel_item_body_rating_icon}/>
                                                <Text style={styles.tabsList_panel_item_body_rating_text}>{item.score}</Text>
                                            </View>
                                        </View>
                                    </View>
                                )
                            }}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    header: {
        flex: .55,
        backgroundColor: MainTheme.palette.purple[700],
        color: "#fff",
        paddingTop: MainTheme.spacing(5.5),
        paddingBottom: MainTheme.spacing(2),
        borderBottomLeftRadius: 25,
    },

        header_title: {
            paddingHorizontal: MainTheme.spacing(2),
            marginBottom: MainTheme.spacing(2),
        },

            header_title_text: {
                color: "#fff",
                fontSize: 30,
                fontWeight: "600",
            },

    tabsNav: {
        flexDirection: "row",
        marginBottom: MainTheme.spacing(1)
    },

    tabsNav_item: {
        paddingHorizontal: 18,
        paddingVertical: 6,
        opacity: .6,
    },

        tabsNav_item__selected: {
            opacity: 1,
        },

        tabsNav_item_text: {
            color: "#fff",
            fontWeight: "700",
        },

    tabsList: {
        flex: 1
    },

        tabsList_panel: {
            flex: 1,
        },

            tabsList_panel_item: {
                flex: 1,
                width: 250,
                marginRight: MainTheme.spacing(2),
                borderRadius: MainTheme.spacing(1.5),
                backgroundColor: "#fff",
                padding: MainTheme.spacing(1.5),
                flexDirection: "row"
            },

                tabsList_panel_item$firstChild: {
                    marginLeft: MainTheme.spacing(2),
                },

                tabsList_panel_item_img: {
                    width: 90,
                    height: "100%",
                    borderRadius: 8,
                    marginRight: MainTheme.spacing(1)
                },

                tabsList_panel_item_body: {
                    flex: 1,
                },

                    tabsList_panel_item_body_title: {
                        fontWeight: "700",
                        fontSize: 18,
                    },

                    tabsList_panel_item_body_rowText: {
                        color: MainTheme.palette.dark[800],
                        fontWeight: "700",
                        marginTop: MainTheme.spacing(.3)
                    },
                    
                    tabsList_panel_item_body_rating: {
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: MainTheme.spacing(.3)

                    },

                        tabsList_panel_item_body_rating_icon: {
                            marginRight: MainTheme.spacing(.5),
                        },

                        tabsList_panel_item_body_rating_text: {
                            fontWeight: "700",
                            color: MainTheme.palette.purple[300]
                        }
})
