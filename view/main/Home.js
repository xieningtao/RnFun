import React, {Component} from 'react';
import {withNavigation} from 'react-navigation';
import {
    Text,
    TouchableHighlight,
    View,
    DeviceEventEmitter,
    SectionList,
    StyleSheet,
    Dimensions,
    ListView,
    FlatList,
    Image, RefreshControl, ActivityIndicator
} from "react-native";
import RefreshList from "./RefreshList"
export default class Home extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerMode: "none"
        };
    };

    constructor (props) {
        super (props)
        this.state = {
            data: null,
            refreshing: false,
            hasData: false,
            footVisible: false,
            curPage: 1,
        }
    }

    componentWillMount () {
        this._onFetch ()
    }

    _itemPress (objectId, homeImgUrl) {
        console.log ("objectId: " + objectId)
        DeviceEventEmitter.emit("updateEvent",`objectId is ${objectId}`)
        this.props.navigation.push ("homeDetail", {
            "objectId": objectId,
            "homeImgUrl": homeImgUrl
        })
    }

    _renderRowView = ({item}) => {
        return (
            <TouchableHighlight
                underlayColor='#c8c7cc'
                onPress={() => this._itemPress (item.objectId, item.imgUrl)}>
                <View style={styles.itemContainer}>
                    <Image source={{uri: item.imgUrl}} style={styles.img}/>
                    <View style={styles.bottomTxtContainer}>
                        <Text style={styles.itemTxtLeft}>{item.imgLabel}</Text>
                        <Text style={styles.itemTxtRight} numberOfLines={1}>{item.imgDesc}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    timeout (ms) {
        return new Promise ((resolve, reject) => {
            setTimeout (resolve, ms, 'done');
        });
    }

    _loadMore () {
        const curPage = this.state.curPage
        console.log ("fetchData loadMore")
        // this._onFetch()
        fetch (`https://api2.bmob.cn/1/classes/CardPicGroup?limit=4&skip=${curPage * 4}`, {
            method: 'GET',
            headers: {
                "X-Bmob-Application-Id": "55a1a92dd0096e5178ff10be85b06feb",
                "X-Bmob-REST-API-Key": "83c860ec56761949993c558c37a1cc45",
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then ((response) => response.json ())
            .then ((jsonData) => {
                console.log ("jsonData: " + JSON.stringify (jsonData))
                debugger
                if ((jsonData != null && jsonData.results != null && jsonData.results.length == 0)||this.state.curPage == 2) {
                    this.setState ({
                        hasData: false,
                        footVisible: true
                    })
                } else {
                    this.setState ({
                        data: [...this.state.data, ...jsonData.results],
                        hasData: true,
                        footVisible: true,
                        curPage:++this.state.curPage
                    })
                }
            }).catch ((error) => {
            console.log ("error: " + error)
            this.setState ({
                hasData: false,
                footVisible: true
            })
        })
    }

    _onFetch () {
        console.log ("fetchData")
        this.setState ({refreshing: true});
        fetch ('https://api2.bmob.cn/1/classes/CardPicGroup?limit=4', {
            method: 'GET',
            headers: {
                "X-Bmob-Application-Id": "55a1a92dd0096e5178ff10be85b06feb",
                "X-Bmob-REST-API-Key": "83c860ec56761949993c558c37a1cc45",
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then ((response) => response.json ())
            .then ((jsonData) => {
                console.log ("jsonData: " + JSON.stringify (jsonData))
                debugger
                this.setState ({
                    data: jsonData.results,
                    refreshing: false,
                    footVisible: true,
                    hasData:true,
                    curPage: 1
                })
            }).catch ((error) => {
            console.log ("error: " + error)
            this.setState ({
                refreshing: false,
                footVisible: true,
                hasData:false,
                curPage: 1
            })
        })
    }

    render () {
        return (
            <View style={styles.container}>
                <RefreshList
                    renderItem={this._renderRowView}
                    data={this.state.data}
                    keyExtractor={(item, index) => index}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => this._onFetch ()}
                        />
                    }
                    onEndReached={(distance) => {
                        console.log ("distance: " + JSON.stringify (distance))
                        this._loadMore ()
                    }}
                    onEndReachedThreshold={0.5}
                    visible={this.state.footVisible}
                    hasData={this.state.hasData}
                />
            </View>
        );
    }
}



const {height, width, scale} = Dimensions.get ('window');
const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    navBar: {
        height: 64,
        backgroundColor: '#CCC'
    },
    itemTxtLeft: {
        flex: 2,
        alignSelf: "center",
        fontSize: 16,
        marginLeft: 10
    },
    itemTxtRight: {
        flex: 2,
        fontSize: 16,
        alignSelf: "center",
        textAlign: "right",
        marginRight: 10,
    },
    itemContainer: {
        flexDirection: "column",
        alignItems: "center",

    },
    bottomTxtContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        height: 40,
    },
    img: {
        width: width,
        height: width * 16 / 9
    }
})