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
} from 'native-base';
import axios from 'axios';

export default class WithAxiosScreen extends Component {

  constructor() {
    super()

    this.state = {
      text: [],
      input: '',
      baseUrl: 'http://192.168.0.23:7981/api/todolist/',
      btnSubmit: 'Save',
      id: ''
    }
  }
  
  componentDidMount(){
    this._getItem()
  }
  
  _renderItem = ({item, index}) => (
    <ListItem
      onLongPress={() => this._deleteItem(item)}
      onPress={() => this._updateItem(item)}
    >
      <Text>{item.title}</Text>
    </ListItem>
  )

  _keyExtractor = (item, index) => item._id

  _changeTextInput = input => {
    this.setState({input})
    
    if (this.state.input == '') {
      this.setState({
        btnSubmit: 'Save'
      })
    }
  }

  _getItem = () => {
    axios.get(this.state.baseUrl)
      .then(res => {
        this.setState({
          text: res.data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
  
  _saveItem = () => {
    const btnSubmit = this.state.btnSubmit
    if (this.state.btnSubmit == 'Save') {
      axios.post(this.state.baseUrl,{
        title: this.state.input
      })
        .then( res => {
          this.setState({
            input: ''
          })
          this._getItem()
        })
        .catch( err => {
          alert(err)
        })
    } else if (btnSubmit == 'Update') {
      axios.put(this.state.baseUrl + this.state.id, {
        title: this.state.input
      })
        .then( res => {
          this.setState({
            btnSubmit: 'Save',
            input: ''
          })
          this._getItem()
        })
        .catch( err => {
          alert(err)
        })
    }
  }

  _deleteItem = (item) => {
    axios.delete(this.state.baseUrl + item._id)
      .then( res => {
        this._getItem()
      })
      .catch( err => {
        alert(err)
      })
  }

  _updateItem = (item) => {
    this.setState({
      input: item.title,
      id: item._id,
      btnSubmit: 'Update'
    })
  }

  render() {
    
    return(
     <Container>
       <Content style={{ padding: 5 }}>
        <Row style={{ justifyContent: 'center' }}>
          <Col style={{ flex: 8 }}>
            <Input
              placeholder  = 'Enter the text in here'
              style        = {{ borderBottomWidth: 0.4 }}
              value        = { this.state.input }
              onChangeText = { this._changeTextInput }
            />
          </Col>
          <Col style={{ flex: 3, justifyContent: 'center'  }}>
            <Button 
              info
              onPress={this._saveItem}
            >
              <Text> {this.state.btnSubmit} </Text>
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
     </Container>
    )
  }
}