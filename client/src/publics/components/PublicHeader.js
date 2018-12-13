/**
 * Created by @rsmnarts
 * Thanks to Mr. Isgi
 */

import React, { Component } from 'react';
import {
	Header, Left, Button, Body, Title,
	Right, Icon
} from 'native-base';
import styles from '../assets/Styles'

export default class PublicHeader extends Component {
  render() {
    return(
			<Header style={styles.Header}>
				<Left>
					<Button transparent onPress={this.props.menu}>
						<Icon name='menu' />
					</Button>
				</Left>
				<Body>
					<Title>{this.props.title}</Title>
				</Body>
				<Right />
			</Header>
    )
  }
}