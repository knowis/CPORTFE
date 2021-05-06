<template>
  <q-page padding>

    <div class="row q-col-gutter-md">
      <div class="col-md-6">
        <q-card flat rounded bordered>
          <q-card-section class="bg-grey-3">
            <div class="text-h6 text-primary">{{ $t('account.settings.desc') }}</div>
          </q-card-section>
          <q-card-section class="q-mx-md q-mb-md">
            <div class="row q-gutter-md">
              <div class="col-6">
                <q-input :value="name" readonly :label="$t('account.name')"></q-input>
              </div>
              <div class="col-6">
                <q-select :value="locale" :options="['de-DE', 'en-US']" :label="$t('account.locale')" @input="setLocale"/>
              </div>
              <div class="col-6">
                <q-select :value="currency" :options="['USD', 'EUR']" :label="$t('account.currency')" @input="setCurrency"/>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

  </q-page>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Account',
  computed: {
    ...mapState({
      locale: state => state.userdata.preferredLocale,
      name: state => state.userdata.username,
      currency: state => state.userdata.defaultCurrency
    })
  },
  methods: {
    setLocale (value) {
      this.$store.commit('userdata/locale', value)
      this.$root.$i18n.locale = value
    },
    setCurrency (value) {
      this.$store.commit('userdata/currency', value)
    }
  }
}
</script>
