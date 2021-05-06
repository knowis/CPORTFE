<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Banking Portal <span v-if="$route.meta.title">| {{ $t($route.meta.title)}}</span>
        </q-toolbar-title>
        <div>
          <q-btn push flat dense round icon="account_circle">
            <q-menu>
              <q-list>
                <q-item v-close-popup>
                  <q-item-section>
                    <q-item-label>{{ $t('main.loggedIn') }}<span class="text-bold" v-if="oidcUser"> {{ oidcUser.preferred_username }}</span></q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable v-close-popup @click="accountSettings">
                  <q-item-section>
                    <q-item-label><q-icon name="manage_accounts" size="sm" />{{ $t('account.settings') }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="logout">
                  <q-item-section>
                    <q-item-label><q-icon name="logout" size="sm" />{{ $t('main.logout') }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item clickable tag="a" to="/index" >
          <q-item-section avatar >
            <q-icon name="dashboard" :title="$t('menu.home')"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('menu.home') }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable tag="a" to="/credits" >
          <q-item-section avatar >
            <q-icon name="account_balance" :title="$t('menu.credits')"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('menu.credits') }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable tag="a" to="/messages" >
          <q-item-section avatar >
            <q-icon name="message" :title="$t('menu.messages')"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('menu.messages') }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator inset/>
        <q-item-label header center v-if="leftDrawerOpen">{{ $t('menu.administration') }}</q-item-label>

        <q-item clickable tag="a" to="/testdata" >
          <q-item-section avatar >
            <q-icon name="perm_data_setting" :title="$t('menu.testdatamgmt')"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('menu.testdatamgmt') }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false
    }
  },
  computed: {
    ...mapGetters([
      'oidcUser'
    ])
  },
  methods: {
    ...mapActions([
      'signOutOidcSilent'
    ]),
    logout () {
      this.signOutOidcSilent()
      this.$router.push('/logout')
    },
    accountSettings () {
      this.$router.push('/account', () => { console.log('on complete') }, () => { this.$router.go(0) })
    }
  }
}
</script>
