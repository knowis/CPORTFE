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
      // .get(`${backendSettings.host}/credit/credits?user=${this.oidcUser.preferred_username}`, {
      //   headers: {
      //     authorization: `Bearer ${this.$store.state.oidcStore.id_token}`
      //   }
      // })
      .get('https://int-designer.apps.openshift-03.knowis.cloud/api/v1/gitProviders', {
          headers: {
            authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI5OFFiWnpOMm5ESlZnZldTVlZtZDhweElsMUJxb01wekNlcTFYOC1DNWxJIn0.eyJleHAiOjE2MjE0MTgyNTQsImlhdCI6MTYyMTQxNzM1NCwiYXV0aF90aW1lIjoxNjIxNDE2NTk2LCJqdGkiOiJjNGIzNzhjOS03N2Y2LTQ0M2EtYjU5NS0yNTQ5NTk2ZThjZTQiLCJpc3MiOiJodHRwczovL2F1dGguYXBwcy5vcGVuc2hpZnQtMDMua25vd2lzLmNsb3VkL2F1dGgvcmVhbG1zL2ludC1kZXNpZ25lciIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI5NTUxZjc3YS1kMDUzLTQ1ZDYtOTc1Yi0xYjU2ZDhjNDMwMjkiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJkZXNpZ25lci1jbGllbnQiLCJzZXNzaW9uX3N0YXRlIjoiNjQ1NWE1MTItMjUyYi00ZDQwLWI1OTktZWY0M2Q0MDkzMzZiIiwiYWNyIjoiMCIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkY19hbmFseXN0IiwibXBfdXNlciIsImNtX2FkbWluIiwib2ZmbGluZV9hY2Nlc3MiLCJkY191c2VyIiwiZGNfZGV2ZWxvcGVyIiwibXBfbWFuYWdlciIsImRjX2FkbWluIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwiYXVkIjoiZGVzaWduZXItY2xpZW50IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiTmFtcmF0YSBHdXB0YSIsInByZWZlcnJlZF91c2VybmFtZSI6Im5ndSIsImdpdmVuX25hbWUiOiJOYW1yYXRhIiwiZmFtaWx5X25hbWUiOiJHdXB0YSIsImVtYWlsIjoibmd1QGtub3dpcy5kZSIsInVzZXJuYW1lIjoibmd1In0.HJe9V1PiqnjOpZaQoETFHs7MKRLwmfpZUAEWO3jraMIUQG9jBdU37X4m-1jCdp2IesCiiNWN_FaltjB-h06-T_U7NtXydxV8ZGp94nVMLcYS1-_-D1hQUPiRjjgStcqSxj6cRJ3GR3Gp3-4p5YUQYFJqH9lKaE3X34Dk6YovX2IKYkXoo-HzdKTx3xIVx5zKKxfwamh3TdymPlhOKARGZvMj8AFY4nAwGPUmCAa-h9biujsnMeWmeVPZhFNLeliFX-oe2CBkgeOYZwRIk-zXQkGQlMS9u6P4F_9oGXU4zUXGlK8uPu98l7I2uvlQIU5lY5jorkWiXGVSeEixhFY2Aw'
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
