import React, {Component} from "react"
import {Image, ScrollView, Text, View, Dimensions, StyleSheet} from "react-native";

export default class HomeDetail extends React.Component {

    // render () {
    //     return (
    //         <View>
    //             <Text>hello,objectId is {this.props.navigation.state.params.objectId}</Text>
    //         </View>
    //     );
    // }

    state = {
        imageData: null
    }

    componentWillMount () {
        this._onFetch ()
    }

    _onFetch () {
        if (this.props.navigation.state.params == null) {
            console.log ("params is null")
            return;
        }

        var groupId = this.props.navigation.state.params.objectId
        // var params = {PicGroupId: groupId}
        var result = `{"PicGroupId":"${groupId}"}`
        var finalUrl = `https://api2.bmob.cn/1/classes/CardPicBean?where=${encodeURIComponent (result)}`
        debugger;
        console.log ("finalUrl: " + JSON.stringify (finalUrl))
        fetch (finalUrl, {
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
                    imageData: jsonData
                })
            })
    }

    render () {
        return (
            <View style={styles.container}>
                {/* 实例化ScrollView */}
                <ScrollView style={styles.scrollViewStyle}
                            horizontal={true}   // 水平方向
                            showsHorizontalScrollIndicator={false}  // 隐藏水平指示器
                            showsVerticalScrollIndicator={false}    // 隐藏垂直指示器
                            pagingEnabled={true}    // 开启分页功能
                >
                    {this.renderItem ()}
                </ScrollView>

            </View>
        );
    }

    // scrollView子视图
    renderItem () {
        if (this.state.imageData == null) {
            console.log("imageData is null")
            return
        }
        var itemAry = [];
        itemAry.push (
            // 实例化子视图
            <Image key={i} style={styles.itemStyle} source={{uri: this.props.navigation.state.params.homeImgUrl}}/>
        )
        // // 获取json中图片
        var imgAry = this.state.imageData.results;

        // 根据json数据实例化视图
        for (var i = 0; i < imgAry.length; i++) {
            // 取出单个对象
            var item = imgAry[i];
            // 将子视图放进 itemAry
            console.log ("imageUrl: " + item.imageUrl)
            itemAry.push (
                // 实例化子视图
                <Image key={i} style={styles.itemStyle} source={{uri: item.imageUrl}}/>
            )
        }

        // 返回数组
        return itemAry;
    }
}

// 样式
const {height, width, scale} = Dimensions.get ('window');
const styles = StyleSheet.create ({
    container: {
        backgroundColor: 'white',
        flex:1
    },

    scrollViewStyle: {
        // 上边距
    },

    itemStyle: {
        width:width,
        // 图片等比例拉伸
        resizeMode: 'contain'
    },
});
