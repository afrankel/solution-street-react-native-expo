import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';

const styles = StyleSheet.create({
    centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
  },
});

export default class PositionsScreen extends React.Component {
  static navigationOptions = {
    title: 'Positions',
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
      activeSection: false,
      collapsed: true,
    }
  };

  componentDidMount() {
    return fetch('https://solution-street-timecard-test.herokuapp.com/open_positions.json')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function() {
          // do something with new state
          let newDataSource = [];
          for(let i=0;i<this.state.dataSource.length;i++) {
            newDataSource.push({
              'title': this.state.dataSource[i].name,
              'content': this.state.dataSource[i].description
            });
          }
          this.setState({
            dataSource: newDataSource,
          });
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  _toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  }

  _setSection(section) {
    this.setState({ activeSection: section });
  }

  _renderHeader(section, i, isActive) {
    return (
      <Animatable.View duration={400} style={[styles.header, isActive ? styles.active : styles.inactive]} transition="backgroundColor">
        <Text style={styles.headerText}>{section.title}</Text>
      </Animatable.View>
    );
  }

  _renderContent(section, i, isActive) {
    return (
      <Animatable.View duration={400}  style={[styles.content, isActive ? styles.active : styles.inactive]} transition="backgroundColor">
        <Animatable.Text animation={isActive ? 'bounceIn' : undefined}>{section.content}</Animatable.Text>
      </Animatable.View>
    );
  }

  render() {
      if (this.state.isLoading) {
            return (
              <View style={styles.container}>
                <Text style={styles.title}>Solution Street Open Positions</Text>
                <ActivityIndicator
                  animating={this.state.isLoading}
                  style={[styles.centering, {height: 80}]}
                  size="large"
                />
              </View>
            )
      }
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Solution Street Open Positions</Text>
          <Accordion
            activeSection={this.state.activeSection}
            sections={this.state.dataSource}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
            duration={400}
            onChange={this._setSection.bind(this)}
          />

        </View>
    );
  }
}
