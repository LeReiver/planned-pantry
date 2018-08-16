import React from 'react';
import { Header } from 'react-native-elements';

export default class Header extends React.Component {
 
render() {
    return (
        <Header
          statusBarProps={{ barStyle: 'light-content' }}
          // leftComponent={<MyCustomLeftComponent />}
          centerComponent={{ text: 'Planned Pantry', style: { color: '#3c9' } }}
          outerContainerStyles={{ backgroundColor: '#3D6DCC' }}
          innerContainerStyles={{ justifyContent: 'space-around' }}
        />
    )
  }
};
