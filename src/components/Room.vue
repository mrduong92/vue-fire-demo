<template>
  <div class="hello" v-if="user">
    <router-link :to="`/`" class="nav-link">Back to homepage</router-link>
    <h1 v-if="room">{{ room.name }}</h1>
    <center>
      <div class="row chat-window col-xs-5 col-md-3" id="chat_window_1" style="margin-left:10px;">
          <div class="col-xs-12 col-md-12">
            <div class="panel panel-default">
                  <div class="panel-heading top-bar">
                      <div class="col-md-8 col-xs-8">
                          <h3 class="panel-title"><span class="glyphicon glyphicon-comment"></span> Hello - {{ user.name || '' }} </h3>
                      </div>
                      <div class="col-md-4 col-xs-4" style="text-align: right;">
                          <a href="#"><span id="minim_chat_window" class="glyphicon glyphicon-minus icon_minim"></span></a>
                          <a href="#"><span class="glyphicon glyphicon-remove icon_close" data-id="chat_window_1"></span></a>
                      </div>
                  </div>
                  <div class="panel-body msg_container_base">
                      <div class="row msg_container" :class="[isMe(message.from) ? 'base_sent' : 'base_receive']" v-for="message in messages" :key="message.id">
                        <template v-if="isMe(message.from)">
                          <div class="col-md-10 col-xs-10">
                              <div class="messages msg_sent">
                                  <p v-text="message.content"></p>
                                  <time datetime="2009-11-13T20:00" v-text="getSenderName(message) || ''"></time>
                              </div>
                          </div>
                          <div class="col-md-2 col-xs-2 avatar">
                              <img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" class=" img-responsive ">
                          </div>
                        </template>
                        <template v-else>
                          <div class="col-md-2 col-xs-2 avatar">
                              <img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" class=" img-responsive ">
                          </div>
                          <div class="col-md-10 col-xs-10">
                              <div class="messages msg_receive">
                                  <p v-text="message.content"></p>
                                  <time datetime="2009-11-13T20:00" v-text="getSenderName(message) || ''"></time>
                              </div>
                          </div>
                        </template>
                      </div>
                  </div>
                  <div class="panel-footer">
                      <div class="input-group">
                          <input id="btn-input" type="text" class="form-control input-sm chat_input" placeholder="Write your message here..." v-model="message">
                          <span class="input-group-btn">
                          <button class="btn btn-primary btn-sm" id="btn-chat" @click="sendMessage()">Send</button>
                          </span>
                      </div>
                  </div>
          </div>
          </div>
      </div>
    </center>
  </div>
</template>
<script>
import { db } from '../db'
import { authUser } from '../user'
import lodash from 'lodash'
import firebase from 'firebase/app'

const rooms = db.collection('rooms')

export default {
  name: 'Room',
  data () {
    return {
      room: null,
      user: null,
      message: null,
      messages: [],
      roomId: null
    }
  },
  mounted () {
    this.roomId = this.$route.params.room
    if (authUser) {
      this.user = authUser
    }
    // Get room info
    db.collection('rooms').doc(this.roomId).onSnapshot(snapshot => {
      this.room = snapshot.data()
      this.room.id = snapshot.id
    })
  },
  watch: {
    room: {
      immediate: true,
      handler (val) {
        if (lodash.has(val, 'id')) {
          this.$bind('messages', rooms.doc(val.id).collection('messages').orderBy('timestamp', 'desc').limit(100))
        }
      }
    }
  },
  methods: {
    isMe (sender) {
      return sender.name === this.user.name
    },
    getSenderName (message) {
      const timestamp = !lodash.isNil(message.timestamp) ? message.timestamp.toDate() : ''
      return message.from.name + ' - ' + timestamp
    },
    sendMessage () {
      rooms.doc(this.roomId).collection('messages')
        .add({
          content: this.message,
          from: db.collection('users').doc(this.user.id),
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
          this.message = ''
        })
    }
  }
}
</script>

<style scoped>
.chat-window{
    width: 80%;
    text-align: center;
}
.chat-window > div > .panel{
    border-radius: 5px 5px 0 0;
}
.icon_minim{
    padding:2px 10px;
}
.msg_container_base{
  background: #e5e5e5;
  margin: 0;
  padding: 0 10px 10px;
  max-height: 600px;
  overflow-x:hidden;
}
.top-bar {
  background: #666;
  color: white;
  padding: 10px;
  position: relative;
  overflow: hidden;
}
.msg_receive{
    padding-left:0;
    margin-left:0;
}
.msg_sent{
    padding-bottom:20px !important;
    margin-right:0;
}
.messages {
  background: white;
  padding: 10px;
  border-radius: 2px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  max-width:100%;
}
.messages > p {
    font-size: 13px;
    margin: 0 0 0.2rem 0;
  }
.messages > time {
    font-size: 11px;
    color: #ccc;
}
.msg_container {
    padding: 10px;
    overflow: hidden;
    display: flex;
}
img {
    display: block;
    width: 100%;
}
.avatar {
    position: relative;
}
.base_receive > .avatar:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 0;
    border: 5px solid #FFF;
    border-left-color: rgba(0, 0, 0, 0);
    border-bottom-color: rgba(0, 0, 0, 0);
}

.base_sent {
  justify-content: flex-end;
  align-items: flex-end;
}
.base_sent > .avatar:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 0;
    border: 5px solid white;
    border-right-color: transparent;
    border-top-color: transparent;
    box-shadow: 1px 1px 2px rgba(black, 0.2);
}

.msg_sent > time{
    float: right;
}

.msg_container_base::-webkit-scrollbar-track
{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color: #F5F5F5;
}

.msg_container_base::-webkit-scrollbar
{
    width: 12px;
    background-color: #F5F5F5;
}

.msg_container_base::-webkit-scrollbar-thumb
{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #555;
}

.btn-group.dropup{
    position:fixed;
    left:0px;
    bottom:0;
}
</style>
