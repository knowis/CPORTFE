<template>
  <q-page padding>
    <div class="row">
      <div class="col-3" />
      <div class="col-6 text-center">
        <h3>{{ $t('index.welcome') }}</h3>
      </div>
      <div class="col-3" />
    </div>
    <div class="row" >
      <div class="col-3" />
      <div class="col-6">
        <q-parallax src="~assets/Bruecke.webp" style="height: 500px">
        <!-- <q-img alt="background-image-bridge" src="" /> -->
          <q-card flat rounded style="background: none" class="absolute-full q-ma-lg q-pt-xl text-white" >
            <q-form class="q-gutter-lg" @submit="onSubmit">
              <p>{{ $t('index.login.desc') }}</p>
              <q-input v-model="username"
  :label="$t('index.login.username.lbl')" bg-color="white" outlined :hint="$t('index.login.username.hint')" lazy-rules :rules="[ val => val && val.length > 0 || $t('index.login.username.err')]"/>
              <q-input bg-color="white" v-model="password"
  :label="$t('index.login.password.lbl')" outlined :hint="$t('index.login.password.hint')" type="password" lazy-rules :rules="[ val => val && val.length > 0 || $t('index.login.password.err')]" ref="password" />
              <q-btn type="submit" class="float-right" :label="$t('index.login.lbl')" icon="login" color="primary"/>
            </q-form>
          </q-card>
        </q-parallax>
      </div>
      <div class="col-3" />
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: undefined,
      password: undefined
    }
  },
  methods: {
    onSubmit () {
      if (this.username.toLowerCase() === this.password.toLowerCase()) {
        this.$store.commit('userdata/login', {
          id: 1,
          name: this.username
        })
        this.$router.push('/index')
      } else {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          position: 'center',
          message: this.$i18n.t('index.login.err')
        })
        this.$refs.password.focus()
      }
    }
  }
}
</script>
