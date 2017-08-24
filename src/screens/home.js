import React, { Component } from 'react'
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native'
import Realm from '../configs/realm'
import { Text, Header, Icon, Button, ListTags } from '../components'
import { constants, colors } from '../configs/theme'
import { string } from '../assets'
class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataTags: []
        }
    }
    renderHeader = () => {
        return (
            <Header title='Home' >
                <Icon name='ios-checkmark-outline' />
                <Icon name='ios-close-outline' />
            </Header>
        )
    }
    renderSearch = () => {
        return (
            <View style={styles.constantSearch}>
                <Text text={string.search_of_bookmark} align='center' />
            </View>
        )
    }

    renderContent = () => {
        const { dataTags } = this.state
        return (
            <ListTags data={dataTags} />
        )
    }
    render() {

        return (
            <View style={{ paddingTop: constants.statusBarHeight, flex: 1 }}>
                {this.renderHeader()}
                {this.renderSearch()}
                {this.renderContent()}
            </View>
        )
    }

    componentDidMount() {
        this.setState({
            dataTags: Realm.objects('Tag').slice(0, 8)
        })
    }
}

const styles = StyleSheet.create({
    constantSearch: {
        backgroundColor: colors.border,
        justifyContent: 'center',
        height: constants.navBarHeight
    }
})

const mapStateToProps = (state, ownProps) => {
    return {
        state: state
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // showSnackBar: (data) => dispatch(showSnackBar(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)