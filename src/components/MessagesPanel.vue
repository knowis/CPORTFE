<template>
  <div class="q-pa-md row justify-center scroll">
    <q-pull-to-refresh @refresh="refresh">
      <q-chat-message v-for="m in messages" :key="m.id"
        :name="m.sender"
        :avatar="avatar(m)"
        :text="m.text"
        :stamp="m.timestamp | timestampFormat"
        :sent="sentByMe(m)"
      />
    </q-pull-to-refresh>
  </div>
</template>

<script>
import { backendSettings } from 'src/config/backend'
import { mapGetters } from 'vuex'

export default {
  name: 'MessagesPanel',
  data () {
    return {
      messages: [],
      loading: true,
      timer: {},
      user: ''
    }
  },
  methods: {
    refresh (callback) {
      this.$axios
        .get(`${backendSettings.host}/messages?user=${this.oidcUser.preferred_username}`, {
          headers: {
            authorization: `Bearer ${this.$store.state.oidcStore.id_token}`
          }
        })
        .then(response => {
          this.messages = response.data.reverse()
          this.loading = false
          if (callback) {
            callback()
          }
        })
        .catch((e) => {
          console.error(e)
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: this.$i18n.t('messages.load.error'),
            icon: 'report_problem'
          })
          if (callback) {
            callback()
          }
        })
    },
    avatar (message) {
      if (!this.sentByMe(message)) {
        return require('../assets/Bruecke.webp')
      }
      return require('../assets/account_circle-black-18dp.svg')
    },
    sentByMe (message) {
      let res = false
      if (message.sender === this.oidcUser.preferred_username) {
        res = true
      }
      return res
    }
  },
  computed: {
    ...mapGetters([
      'oidcUser'
    ])
  },
  created () {
    this.timer = setInterval(() => this.refresh(), 10000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  mounted () {
    this.refresh()
  }
}
</script>
