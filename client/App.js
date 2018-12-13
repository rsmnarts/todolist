/**
 * Created by @rsmnarts
 * Quiz 2 - RN using axios
 * Thanks to Mr. Isgi
 */

import { createDrawerNavigator, createAppContainer } from "react-navigation";

import WithLocalScreen from './src/withLocal/screen/WithLocalScreen'
import WithAxiosScreen from './src/withAxios/screen/WithAxiosScreen'
import WithExpressScreen from './src/withExpress/screen/WithExpressScreen'

const AppNavigator = createDrawerNavigator(
  {
    WithLocalScreen: {
      screen: WithLocalScreen,
      navigationOptions: {
        title: 'With Local (Full State)'
      }
    },
    WithAxiosScreen: {
      screen: WithAxiosScreen,
      navigationOptions: {
        title: 'With Axios'
      }
    },
    WithExpressScreen: {
      screen: WithExpressScreen,
      navigationOptions: {
        title: 'With Express'
      }
    }
  },
  {
    initialRouteName: 'WithExpressScreen'
  }
);

export default createAppContainer(AppNavigator);