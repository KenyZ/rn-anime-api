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


import Utils from '../Utils'
import AppStyles from '../AppStyles'

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

     useEffect(() => {

        try {
            fetch("https://api.jikan.moe/v3/top/anime/")
            .then(response => response.json())
            .then(fetchedData => {
                console.log({fetchedData})
                setPopularList(fetchedData.top)
            })
        } catch (FetchingPopularListError) {
            console.error("Hey")
        }

        return () => {

        }

     }, [])
    /**
     * PRIVATES
     */

    const data = [
        {
            id: 1,
            title: "The World of Abstract Art",
            img: `https://picsum.photos/id/${10}/300/300`
        },
        {
            id: 2,
            title: "The World of Abstract Art",
            img: `https://picsum.photos/id/${20}/300/300`
        },

        {
            id: 3,
            title: "The World of Abstract Art",
            img: `https://picsum.photos/id/${30}/300/300`
        },
        {
            id: 4,
            title: "The World of Abstract Art",
            img: `https://picsum.photos/id/${40}/300/300`
        },
    ]

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
                        <Text style={styles.tabsNav_item_text}>Popular</Text>
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
                                            <Text style={styles.tabsList_panel_item_body_text}>{item.title}</Text>
                                            <View style={styles.tabsList_panel_item_body_rating}>
                                       
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
        backgroundColor: "#4B28E6",
        color: "#fff",
        paddingTop: AppStyles.spacing(5.5),
        paddingBottom: AppStyles.spacing(2),
        borderBottomLeftRadius: 25,
    },

        header_title: {
            paddingHorizontal: AppStyles.spacing(2),
            marginBottom: AppStyles.spacing(2),
        },

            header_title_text: {
                color: "#fff",
                fontSize: 30,
                fontWeight: "600",
            },

    tabsNav: {
        flexDirection: "row",
        marginBottom: AppStyles.spacing(1)
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
                width: 240,
                marginRight: AppStyles.spacing(2),
                borderRadius: AppStyles.spacing(1.5),
                backgroundColor: "#fff",
                padding: AppStyles.spacing(1.5),
                flexDirection: "row"
            },

                tabsList_panel_item$firstChild: {
                    marginLeft: AppStyles.spacing(2),
                },

                tabsList_panel_item_img: {
                    width: 90,
                    height: "100%",
                    borderRadius: 8,
                    marginRight: AppStyles.spacing(1)
                },

                tabsList_panel_item_body: {
                    flex: 1,
                },

                    tabsList_panel_item_body_text: {
                        fontWeight: "700",
                        fontSize: 18
                    },
})
