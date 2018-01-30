import React from 'react';
const conjugator = require('./korean/conjugator');

import { StyleSheet, FlatList, Text, TextInput,
         View, StatusBar, Platform } from 'react-native';

import CheckBox from 'react-native-checkbox';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {verb: '하다', regular: false};
  }

  changeRegular(value) {
    this.setState({'regular': value});
  }

  changeVerb(verb) {
    this.setState({'verb': verb, 'regular': false})
  }

  render() {
    const self = this;
    const conjugatedVerb = conjugator.conjugate(this.state.verb, this.state.regular);
    const bothRegularAndIrregular = conjugator.base(this.state.verb) in conjugator.both_regular_and_irregular;
    console.log(bothRegularAndIrregular);
    return (
      <View style={styles.container}>
        <TextInput
          onSubmitEditing={(event) => self.changeVerb(event.nativeEvent.text)}
          returnKeyType="search"/>
        {bothRegularAndIrregular ? (
          <CheckBox label="Regular" value={self.state.regular} onChange={(checked) => self.changeRegular(!checked)} />
        ) : null}
        <FlatList
          style={styles.verbList}
          keyExtractor={(item, index) => index}
          data={conjugatedVerb}
          renderItem={({item}) => <Text>{item.conjugated}</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
  },
  verbList: {
    flex: 1,
  }
});
