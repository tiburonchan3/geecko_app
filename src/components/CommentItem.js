import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { getUserApi } from '../api/user';
import { API_HOST } from '../utils/constants';
import Batman from '../assets/batman.png';
import { COLORS } from '../colors/colors';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function CommentItem(props) {
  const { comment } = props;
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      await getUserApi(comment.userid)
        .then((response) => {
          setUser(response);
        })
        .catch(() => {
          console.log('error en el codigo');
        });
    };
    getUser();
  }, [props]);
  const avatarUrl = { uri: `${API_HOST}/mostrarAvatr?id=${user?.id}` };
  return (
    <View>
      <View style={styles.userComment}>
        <Image
          style={styles.avatar}
          source={Batman}
        />
       <View>
       <Text style={styles.name}>
          {user?.nombre} {user?.apellidos}
        </Text>
        <Text style={styles.date}>
            {moment(comment.fechacomentario).calendar()}
        </Text>
       </View>
      </View>
      <View style={styles.commentBox}>
        <Text style={styles.comment}>
            {comment.comentario}
        </Text>
      </View>
      <View style={styles.moreInfo}>
        <View style={styles.reactions}>
          <Icon name="thumbs-up" size={20} color={COLORS.white} />
          <Text style={styles.countReactions}>5</Text>
        </View>
        <View style={styles.comments}>
          <Icon name="thumbs-down" size={20} color={COLORS.white} />
          <Text style={styles.countReactions}>
            2
          </Text>
        </View>
      </View>
      <View style={styles.hr} />
    </View>
  );
}
const styles = StyleSheet.create({
  name: {
    color: COLORS.white,
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 90,
  },
  userComment: {
    marginLeft: 20,
    marginBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  hr: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: '5%',
    width: '90%',
    height: 1,
    backgroundColor: COLORS.grey,
  },
  date:{
      color: COLORS.grey,
      fontSize: 12,
      marginLeft: 10
  },
  commentBox: {
      backgroundColor: COLORS.blue_dark_two,
      width: '90%',
      height: 'auto',
      marginLeft: '5%',
      padding: 20
  },
  comment: {
      color: COLORS.ligth_blue,
  },
  moreInfo: {
      marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  reactions: {
    marginLeft: 20,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  comments: {
    marginLeft: 40,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  countReactions: {
    fontSize: 15,
    color: COLORS.white,
    marginLeft: 10,
  },
});
