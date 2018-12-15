/**
 * Created by @rsmnarts
 * Quiz 2 - RN using axios
 * Thanks to Mr. Isgi
 */

import React, { Component } from 'react';
import { FlatList } from 'react-native';
import {
  Container, Content, ListItem, Row, Col,
  Text, Button, Input
} from 'native-base'
import axios from 'axios'

import PublicHeader from '../../publics/components/PublicHeader'
import PublicFooter from '../../publics/components/PublicFooter'
import styles from '../../publics/assets/Styles'

export default class WithAxiosScreen extends Component {

  constructor() {
    super()

    this.state = {
      text: [],
      input: ''
    }
  }

  componentDidMount(){
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(res => {
        this.setState({
          text: res.data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  _renderItem = ({item, index}) => (
    <ListItem
      onLongPress={() => this._onPressListItem(index)}
    >
      <Text>{(item.title ? item.title : item)}</Text>
    </ListItem>
  )

  _onPressListItem = (index) => {
    axios.delete('https://jsonplaceholder.typicode.com/todos/'+index)
      .then( res => {
        console.log(res.status,res.headers)
        alert('Deleted')
        const text  = this.state.text
        text.splice(index, 1)
        this.setState({ text })
      })
      .catch(err => {
        console.log(err)
        alert(err)
      })
  }
  
  _keyExtractor = (item, index) => index.toString()

  _handleButton = () => {
    axios.post('https://jsonplaceholder.typicode.com/todos/',{
      title: this.state.input
    })
      .then( res => {
        console.log(res.status,res.headers)
        this.setState({
          text: [...this.state.text, this.state.input],
          input: ''
        })
      })
      .catch(err => {
        console.log(err)
        alert(err)
      })
    
  }

  _changeTextInput = input => {
    this.setState({input})
  }

  render() {
    return(
      <Container>
        <PublicHeader 
          title='Use Axios'
          menu={() => this.props.navigation.openDrawer()}
        />
        <Content style={styles.Content}>
          <Row>
            <Col style={{ flex: 8 }}>
              <Input
                placeholder  = 'Enter the text in here'
                style        = {{ borderBottomWidth: 0.4 }}
                value        = { this.state.input }
                onChangeText = { this._changeTextInput }
              />
            </Col>
            <Col style={{ flex: 2 }}>
              <Button 
                info
                onPress={this._handleButton}
              >
                <Text> Save </Text>
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <FlatList
                style        = {{ flex:1 }}
                data         = {this.state.text}
                keyExtractor = {this._keyExtractor}
                renderItem   = {this._renderItem}
                inverted
              />
            </Col>
          </Row>
        </Content>
        <PublicFooter />
      </Container>
    )
  }
}