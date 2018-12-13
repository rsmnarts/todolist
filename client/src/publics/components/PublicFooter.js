/**
 * Created by @rsmnarts
 * Thanks to Mr. Isgi
 */

import React, { Component } from 'react';
import { Linking } from 'react-native'
import {
	Footer, FooterTab, Text, Button
} from 'native-base';
import styles from '../assets/Styles'

export default class PublicFooter extends Component {
  render() { 
    return(
			<Footer style={styles.Footer}>
				<FooterTab style={styles.Footer}>
					<Button full>
						<Text onPress={ ()=>{ Linking.openURL('https://shafou.com/')}}>Created By @rsmnarts</Text>
					</Button>
				</FooterTab>
			</Footer>
    )
  }
}