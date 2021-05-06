<template>
  <q-page padding>
    <div class="row q-col-gutter-md q-mt-xs" v-for="(cp, index) in chunkedAccounts"
      :key="index"
    >
      <instalment-credit-card v-for="instCredit in cp"
            :key="instCredit.id"
            :credit="instCredit">
      </instalment-credit-card>
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab to="/credits/add" color="accent" :label="$t('credit.new')" icon="assignment_turned_in"/>
    </q-page-sticky>
  </q-page>
</template>

<script>
import InstalmentCreditCard from 'components/InstalmentCreditCard.vue'
import { backendSettings } from 'src/config/backend'
import { mapGetters } from 'vuex'
var chunk = require('chunk')

export default {
  components: { InstalmentCreditCard },
  name: 'InstalmentCredits',
  data () {
    return {
      chunkedAccounts: []
    }
  },
  computed: {
    ...mapGetters([
      'oidcUser'
    ])
  },
  mounted () {
    this.$axios
      .get(`${backendSettings.host}/credits?user=${this.oidcUser.preferred_username}`, {
        headers: {
          authorization: `Bearer ${this.$store.state.oidcStore.id_token}`
        }
      })
      .then(response => {
        this.chunkedAccounts = chunk(response.data)
      })
      .catch(() => {
        this.$q.notify({
          color: 'negative',
          position: 'top',
          group: false,
          message: this.$i18n.t('credits.load.error'),
          icon: 'report_problem'
        })
      })
  }
}
</script>
