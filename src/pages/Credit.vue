<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-md-6">
        <q-card flat rounded bordered>
          <q-card-section class="bg-grey-3">
            <div class="text-h6 text-primary">{{ $t('credit.new.title') }}</div>
          </q-card-section>
          <q-card-section class="q-mx-md q-mb-md">
            <div class="row q-gutter-md">
              <div class="col-6">
                <q-input v-model.number="amount" :label="$t('credit.amount')" :hint="$t('credit.amount.hint')" type="number" @blur="calcInterest"/>
              </div>
              <div class="col-3">
                <!-- <q-select  -->
                <q-select v-model="currency" :options="['EUR', 'USD']" :label="$t('credit.currency')" borderless/>
              </div>
            </div>
            <q-field v-model="duration" :label="$t('credit.duration')" borderless>
              <template v-slot:control={}>
                <div>{{ duration }} {{ $t('credit.months') }}</div>
                <q-slider class="q-mx-xs" v-model="duration" color="black" :min="12" :max="60" :step="12" label markers @change="calcInterest"/>
              </template>
            </q-field>

            <q-input v-model="purpose" :label="$t('credit.purpose')" :hint="$t('credit.purpose.hint')" type="area"/>
          </q-card-section>
          <q-card-actions class="q-ma-md q-ml-lg">
            <q-btn :label="$t('credit.action.calculate')" icon="calculate" color="primary" @click="calcInterest"/>
          </q-card-actions>
        </q-card>
      </div>

      <div class="col-md-6">
        <q-card flat rounded bordered >
          <q-card-section class="bg-grey-3">
            <div class="text-h6 text-primary">{{ $t('credit.new.result.title') }}</div>
          </q-card-section>
          <q-card-section class="q-mx-md">
            <div class="row q-gutter-md">
              <div class="col-3">
                <money v-model="amount" readonly borderless :currencyCode="currency" :label="$t('credit.amount')" />
              </div>
              <div class="col-4">
                <q-field v-model="duration" :label="$t('credit.new.result.over')" borderless>
                  <template v-slot:control={}>
                    <div>{{ duration }} {{ $t('credit.months') }}</div>
                  </template>
                </q-field>
              </div>
            </div>
            <div class="row q-gutter-md">
              <div class="col-6">
                <q-field v-model="nominalInterest" readonly outlined :label="$t('credit.new.result.interest')">
                  <template v-slot:control="{ value, floatingLabel }">
                    <div>{{ value | formatPercentage }}
                      <span class="text-weight-thin" style="font-size: 10px;" v-show="floatingLabel"> ({{ $t('credit.new.result.interest_effective') }}: {{ effectiveInterest | formatPercentage4 }})</span>
                    </div>
                  </template>
                </q-field>
              </div>
            </div>
            <div class="row q-gutter-md q-mt-sm">
              <div class="col-6">
                <money v-model="rate" readonly outlined :currencyCode="currency" :label="$t('credit.new.result.monthly_rate')" />
              </div>
            </div>
            <div class="row q-gutter-md">
              <div class="col-12">
                <q-toggle v-model="accept" :label="$t('credit.new.result.accepttc')" />
              </div>
            </div>

          </q-card-section>
          <q-card-actions class="q-ma-md q-ml-lg">
            <q-btn :label="$t('credit.new.apply')" @click="apply" color="accent" icon="send" :disable="!(accept && nominalInterest)"/>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import Money from 'src/components/Money.vue'
import { mapGetters } from 'vuex'
import { backendSettings } from 'src/config/backend'

export default {
  components: { Money },
  // name: 'PageName',
  data () {
    return {
      amount: 1000,
      currency: this.$store.state.userdata.defaultCurrency,
      duration: 12,
      purpose: '',
      nominalInterest: undefined,
      effectiveInterest: undefined,
      rate: undefined,
      accept: false
    }
  },
  computed: {
    ...mapGetters([
      'oidcUser'
    ])
  },
  methods: {
    calcInterest () {
      this.$axios
        .get(`${backendSettings.host}/rateIn/rates/${this.duration}?amount=${this.amount}`, {
          headers: {
            authorization: `Bearer ${this.$store.state.oidcStore.id_token}`
          }
        })
        .then(response => {
          this.nominalInterest = response.data.nominalInterestRate
          this.effectiveInterest = response.data.effectiveInterestRate
          this.rate = response.data.monthlyRate
          this.accept = false
        })
    },
    apply () {
      this.$axios
        // .post(`${backendSettings.host}/credit/credits`, {
        //   user: this.oidcUser.preferred_username,
        //   name: 'Consumer Loan',
        //   purpose: this.purpose,
        //   amount: this.amount,
        //   currency: this.currency,
        //   duration: this.duration,
        //   effectiveInterestRate: this.nominalInterest,
        //   monthlyRate: this.rate,
        //   start: '2020-03-31'
        // }, {
        //   headers: {
        //     authorization: `Bearer ${this.$store.state.oidcStore.id_token}`
        //   }
        // })
        .get('https://int-designer.apps.openshift-03.knowis.cloud/api/v1/gitProviders', {
          headers: {
            authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI5OFFiWnpOMm5ESlZnZldTVlZtZDhweElsMUJxb01wekNlcTFYOC1DNWxJIn0.eyJleHAiOjE2MjE0MTgyNTQsImlhdCI6MTYyMTQxNzM1NCwiYXV0aF90aW1lIjoxNjIxNDE2NTk2LCJqdGkiOiJjNGIzNzhjOS03N2Y2LTQ0M2EtYjU5NS0yNTQ5NTk2ZThjZTQiLCJpc3MiOiJodHRwczovL2F1dGguYXBwcy5vcGVuc2hpZnQtMDMua25vd2lzLmNsb3VkL2F1dGgvcmVhbG1zL2ludC1kZXNpZ25lciIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI5NTUxZjc3YS1kMDUzLTQ1ZDYtOTc1Yi0xYjU2ZDhjNDMwMjkiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJkZXNpZ25lci1jbGllbnQiLCJzZXNzaW9uX3N0YXRlIjoiNjQ1NWE1MTItMjUyYi00ZDQwLWI1OTktZWY0M2Q0MDkzMzZiIiwiYWNyIjoiMCIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkY19hbmFseXN0IiwibXBfdXNlciIsImNtX2FkbWluIiwib2ZmbGluZV9hY2Nlc3MiLCJkY191c2VyIiwiZGNfZGV2ZWxvcGVyIiwibXBfbWFuYWdlciIsImRjX2FkbWluIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwiYXVkIjoiZGVzaWduZXItY2xpZW50IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiTmFtcmF0YSBHdXB0YSIsInByZWZlcnJlZF91c2VybmFtZSI6Im5ndSIsImdpdmVuX25hbWUiOiJOYW1yYXRhIiwiZmFtaWx5X25hbWUiOiJHdXB0YSIsImVtYWlsIjoibmd1QGtub3dpcy5kZSIsInVzZXJuYW1lIjoibmd1In0.HJe9V1PiqnjOpZaQoETFHs7MKRLwmfpZUAEWO3jraMIUQG9jBdU37X4m-1jCdp2IesCiiNWN_FaltjB-h06-T_U7NtXydxV8ZGp94nVMLcYS1-_-D1hQUPiRjjgStcqSxj6cRJ3GR3Gp3-4p5YUQYFJqH9lKaE3X34Dk6YovX2IKYkXoo-HzdKTx3xIVx5zKKxfwamh3TdymPlhOKARGZvMj8AFY4nAwGPUmCAa-h9biujsnMeWmeVPZhFNLeliFX-oe2CBkgeOYZwRIk-zXQkGQlMS9u6P4F_9oGXU4zUXGlK8uPu98l7I2uvlQIU5lY5jorkWiXGVSeEixhFY2Aw'
          }
        })
        .then(
          () => {
            this.$q.notify({
              color: 'positive',
              position: 'center',
              group: false,
              message: this.$i18n.t('credit.new.success'),
              icon: 'done_all'
            })
            this.$router.push('/index')
          })
    }
  }
}
</script>
