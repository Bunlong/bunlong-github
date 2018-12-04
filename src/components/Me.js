import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Linking,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';

import { Header } from './commons/Header';
import { getMe, getStarred } from '../actions/me';

export default class Me extends Component {
  state = {
    publicRepos: 0,
    followers: 0,
    following: 0,
    avatarURL: null,
    name: null,
    login: null,
    company: null,
    location: null,
    blog: null,
    bio: null,
    starred: [],
  };

  async componentDidMount() {
    getMe().then((res) => {
      const [status, jsonObject] = res;
      if (status === 200) {
        this.setState({
          publicRepos: jsonObject.public_repos,
          follower: jsonObject.followers,
          following: jsonObject.following,
          avatarURL: jsonObject.avatar_url,
          name: jsonObject.name,
          login: jsonObject.login,
          company: jsonObject.company,
          location: jsonObject.location,
          blog: jsonObject.blog,
          bio: jsonObject.bio,
        });
      }
    });

    getStarred().then((res) => {
      const [status, jsonObject] = res;
      if (status === 200) {
        this.setState({ starred: jsonObject });
      }
    });
  }

  render() {
    const {
      publicRepos,
      follower,
      following,
      avatarURL,
      name,
      login,
      company,
      location,
      blog,
      bio,
      starred,
    } = this.state;

    return (
      <ScrollView>
        <Header />
        <ScrollView horizontal={true}>
          <View style={styles.navContainer}>
            <Text style={[styles.navItem, styles.spaceRight]}>
              Overview
            </Text>
            <Text style={[styles.navItem, styles.spaceRight]}>
              {`Repositories ${publicRepos}`}
            </Text>
            <Text style={[styles.navItem, styles.spaceRight]}>
              Stars
            </Text>
            <Text style={[styles.navItem, styles.spaceRight]}>
              {`Followers ${follower}`}
            </Text>
            <Text style={styles.navItem}>
              {`Following ${following}`}
            </Text>
          </View>
        </ScrollView>
        <View style={styles.profileContainer}>
          <View style={{flexDirection: 'row'}}>
            <View>
              <Image
                style={styles.avatar}
                source={{uri: avatarURL}}
              />
            </View>
            <View style={styles.profileHeader}>
              <Text style={styles.h1}>
                {name}
              </Text>
              <Text style={styles.h3}>
                {login}
              </Text>
              <View style={styles.details}>
                <Text style={styles.userMention}>
                  {company}
                </Text>
                <Text>
                  {location}
                </Text>
                <Text>
                  {blog}
                </Text>
              </View>
            </View>
          </View>
          <View style={{flexDirection: 'column', marginTop: 20,}}>
            <Text>
              {bio}
            </Text>
          </View>
        </View>
        <View style={styles.bgWhite}>
          <Text>
            Starred
          </Text>
          <View style={styles.listWrapper}>
            {
              starred.map(function(item, i){
                return <Text style={styles.listItem}>{item.name}</Text>
              })
            }
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  navContainer: {
    backgroundColor: "#24292e",
    height: 44,
    borderTopWidth: 0.5,
    borderTopColor: "black",
    paddingTop: 10,
    flexDirection: "row",
  },
  navItem: {
    color: "#fff",
  },
  spaceRight: {
    marginRight: 18,
  },
  profileContainer: {
    flexDirection: "column",
    marginLeft: 17,
    marginRight: 17,
    top: 17,
  },
  avatar: {
    width: 140,
    height: 140,
  },
  profileHeader: {
    lineHeight: 1.5,
    minHeight: 140,
    overflow: "visible",
    paddingTop: 10,
    paddingRight: 15,
    paddingBottom: 10,
    paddingLeft: 15,
    position: "relative",
  },
  h1: {
    color: "#24292e",
    fontSize: 16,
    margin: 0,
  },
  h3: {
    color: "#586069",
    fontSize: 12,
    fontWeight: "400",
    margin: 0,
  },
  details: {
    marginTop: 7.5,
    padding: 0,
  },
  userMention: {
    color: "#24292e",
    fontWeight: "600",
  },
  bgWhite: {
    paddingTop: 10,
    paddingRight: 17,
    paddingBottom: 10,
    paddingLeft: 17,
    backgroundColor: "#fff",
    flexDirection: "column",
    marginTop: 37,
    borderTopWidth: 0.5,
    borderTopColor: "grey",
  },
  listWrapper: {
    marginTop: 15,
    marginBottom: 15,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor:'#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  listItem: {
    marginTop: 10,
  },
});
