/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Dimensions,
  Text,
  TouchableHighlight,
  Image,
  NavigatorIOS,
  TabBarIOS,
  View
} from 'react-native';


import CameraPage from './src/CameraPage';
import Icon from 'react-native-vector-icons/FontAwesome';


function MyChatAppReducer(lastState, action) {
  let state = lastState;
  if (!state) {
    state = {
      scenes: [
        {key: 'home'}
      ],
    };
  }
  if (action.type === 'back' && state.scenes.length > 1) {
    return {
      scenes: state.scenes.slice(0, state.scenes.length - 1),
    };
  }
  if (action.type === 'recognizePlant') {
    return {
      scenes: [
        ...state.scenes,
        {
          type: 'recPlant',
          key: action.id
        }
      ],
    };
  }
  if (action.type === 'scanCode') {
    return {
      scenes: [
        ...state.scenes,
        {
          type: 'sCode',
          key: action.id
        }
      ],
    };
  }
  if (action.type === 'diseasesCares') {
    return {
      scenes: [
        ...state.scenes,
        {
          type: 'disease',
          key: action.id
        }
      ],
    };
  }
  if (action.type === 'gardenInfo') {
    return {
      scenes: [
        ...state.scenes,
        {
          type: 'gInfo',
          key: action.id
        }
      ],
    };
  }
  return state;
}


function HomeView(props) {
  return (
    <View style={styles.container}>
      <TouchableHighlight style={ styles.imageContainer }
        onPress={() => {
          props.dispatch({ type: 'recognizePlant', id: 'A' });
      }}>
        <Image style={ styles.image } source={require('./img/5@3x.png')} />
      </TouchableHighlight>
      <Text>
        Recognize Plant
      </Text>
      <TouchableHighlight style={ styles.imageContainer }
        onPress={() => {
            props.dispatch({ type: 'scanCode', id: 'A' });
        }}>
        <Image style={ styles.image } source={require('./img/5@3x.png')} />
      </TouchableHighlight>
      <Text>
        Scan Code
      </Text>
      <TouchableHighlight style={ styles.imageContainer }
        onPress={() => {
          props.dispatch({ type: 'diseasesCares', id: 'A' });
        }}>
        <Image style={ styles.image } source={require('./img/5@3x.png')} />
      </TouchableHighlight>
      <Text>
        Diseases & Cares
      </Text>
      <TouchableHighlight style={ styles.imageContainer }
        onPress={() => {
          props.dispatch({ type: 'gardenInfo', id: 'A' });
        }}>
        <Image style={ styles.image } source={require('./img/5@3x.png')} />
      </TouchableHighlight>
      <Text>
        My Garden Info
      </Text>
    </View>
  );
}



function RecognizePlant(props) {
  return (
    <View>
      <CameraPage />
      <Text
        onPress={() => {
          props.dispatch({ type: 'back' });
        }}>
        This is for recognizePlant {props.id}. Tap to go back home.
      </Text>
    </View>
  );
}


function ScanCode(props) {
  return (
    <View>
      <Text
        onPress={() => {
          props.dispatch({ type: 'back' });
        }}>
        This is for scanCode {props.id}. Tap to go back home.
      </Text>
       <TouchableHighlight style={ styles.imageContainer }>
        <Image style={ styles.image } source={require('./img/5@3x.png')} />
      </TouchableHighlight>
      <Text>
        Bar code
      </Text>
      <TouchableHighlight style={ styles.imageContainer }>
        <Image style={ styles.image } source={require('./img/5@3x.png')} />
      </TouchableHighlight>
      <Text>
        QR Code
      </Text>
    </View>
  );
}

function Diseases(props) {
  return (
    <Text
      onPress={() => {
        props.dispatch({ type: 'back' });
      }}>
      This is for diseasesCares {props.id}. Tap to go back home.
    </Text>
  );
}

function GardenInfo(props) {
  return (
    <Text
      onPress={() => {
        props.dispatch({ type: 'back' });
      }}>
      This is for gardenInfo {props.id}. Tap to go back home.
    </Text>
  );
}


export default class Flora extends Component {
  constructor(props) {
    super(props);
    this.state = MyChatAppReducer(null, { type: 'init' });
  }
  dispatch(action) {
    this.setState(MyChatAppReducer(this.state, action));
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderCurrentScene()}
      </View>
    );
  }

  renderCurrentScene() {
    const scene = this.state.scenes[this.state.scenes.length - 1];
    if (scene.key === 'home') {
      return (
        <HomeView
          dispatch={this.dispatch.bind(this)}
        />
      );
    }
    if (scene.type === 'recPlant') {
      return (
        <RecognizePlant
          id={scene.key}
          dispatch={this.dispatch.bind(this)}
        />
      );
    }
    if (scene.type === 'sCode') {
      return (
        <ScanCode
          id={scene.key}
          dispatch={this.dispatch.bind(this)}
        />
      );
    }
    if (scene.type === 'disease') {
      return (
        <Diseases
          id={scene.key}
          dispatch={this.dispatch.bind(this)}
        />
      );
    }
    if (scene.type === 'gInfo') {
      return (
        <GardenInfo
          id={scene.key}
          dispatch={this.dispatch.bind(this)}
        />
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  imageContainer: {
    height:94,
    width: 94,
    borderRadius: 32,
  },
  image: {
    height:94,
    width: 94,
    borderRadius: 32
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }

});

AppRegistry.registerComponent('Flora', () => Flora);
