<template>
  <div id="app">
    <v-card>
      <v-form ref="form" @keyup.native.enter="handleSubmit">
        <div>
          <v-list ref="list" class="message-list" two-line subheader>
            <v-subheader>Message list:</v-subheader>
            <v-list-tile v-for="(history, index) in historyList" :key="index">
              <v-list-tile-content>
                <v-list-tile-title>{{ history.sender }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ history.message }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </div>
        <v-divider></v-divider>
        <v-layout class="send-box" mx-3 row wrap>
          <v-flex xs12 sm6>
            <v-text-field v-model="sender" label="Your Name" maxlength="20"></v-text-field>
          </v-flex>

          <v-flex xs12 sm6>
            <v-text-field v-model="message" label="Message"></v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-btn class="float-right" @click.native.stop="handleSubmit">Submit</v-btn>
          </v-flex>
        </v-layout>
      </v-form>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Obey } from '@vip30/vue-phoenix'
import { Component, Vue } from 'vue-property-decorator'
@Component({})
export default class App extends Vue {
  public sender = ''
  public message = ''
  public historyList: object[] = []
  public $refs: any
  public handleSubmit() {
    this.$channel.push('shout', {
      message: this.message,
      sender: this.sender
    })
    this.message = ''
  }

  @Obey('shout')
  public onShout(payload: object) {
    this.historyList.push(payload)
    this.$nextTick(() => {
      this.$refs.list.$el.scrollTop = this.$refs.list.$el.scrollHeight
    })
  }

  public created() {
    this.$initChannel('room:lobby')
  }
}
</script>

<style lang="stylus">
@import '~vuetify/src/stylus/main';

.message-list {
  height: 80vh;
  overflow-y: auto;
  overflow-x: hidden;
}

.send-box {
  height: 20vh;
}

.float-right {
  float: right;
}
</style>
