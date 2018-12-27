import {ActivityIndicator,StyleSheet, Dimensions,FlatList, Text, View} from "react-native";
import React,{Component} from "react"
import PropTypes from 'prop-types';

export default class RefreshList extends Component{

    render(){
        console.log("this.props data: visible: "+this.props.visible+" hasData: "+this.props.hasData)
        return (
            <FlatList
                {...this.props}
                ListFooterComponent={
                    <FooterView visible={this.props.visible}
                                hasData={this.props.hasData}/>
                }
            />
        );
    }
}

class FooterView extends React.Component {
    render () {
        if (this.props.visible) {
            return (
                <View style={styles.footContainer}>
                    <Text style={styles.footTxt}>{
                        (this.props.hasData) ? "loading" : "no more data"
                    }</Text>
                    {
                        (this.props.hasData) ? <ActivityIndicator></ActivityIndicator> : null
                    }
                </View>
            );
        } else {
            return null;
        }
    }
}


RefreshList.propTypes = {
    visible:PropTypes.bool,
    hasData:PropTypes.bool,
}

RefreshList.defaultProps={
    visible:false,
    hasData:false
}

const {height, width, scale} = Dimensions.get ('window');
const styles = StyleSheet.create({
    footContainer: {
        backgroundColor: "gray",
        flexDirection: "row",
        justifyContent: "center",
        width: width,
        height: 40
    },
    footTxt: {
        alignSelf: "center",
        marginRight: 10
    }
})