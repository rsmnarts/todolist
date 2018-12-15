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

import PublicHeader from '../../publics/components/PublicHeader'
import PublicFooter from '../../publics/components/PublicFooter'
import styles from '../../publics/assets/Styles'

export default class WithLocalScreen extends Component {

  constructor() {
    super()

    this.state = {
      text: ['i', 'love', 'u'],
      input: ''
    }
  }

  _renderItem = ({item, index}) => (
    <ListItem
      onLongPress={() => this._onPressListItem(index)}
    >
      <Text>{item}</Text>
    </ListItem>
  )

  _onPressListItem = (index) => {
    const text  = this.state.text
    text.splice(index, 1)
    this.setState({ text })
  }
  
  _keyExtractor = (item, index) => index.toString()

  _handleButton = () => {
    this.setState({
      text: [...this.state.text, this.state.input],
      input: ''
    })
  }

  _changeTextInput = input => {
    this.setState({input})
  }

  render() {
    
    return(
      <Container>
        <PublicHeader 
          title='Use Local (Full state)'
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
              />
            </Col>
          </Row>
        </Content>
				<PublicFooter />
      </Container>
    )
  }
}