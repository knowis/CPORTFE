<template>
  <div class="col-md-6">
    <q-card flat bordered >
      <q-card-section class="bg-grey-3">
        <div class="text-h6 text-primary">{{ credit.name }} #{{ credit.id }}</div>
      </q-card-section>

      <q-card-section>
        <money v-model="credit.amount" readonly borderless :currencyCode="credit.currency" :label="$t('credit.amount')" />
        <q-field v-model="credit.start" readonly borderless :label="$t('credit.start_date')">
          <template v-slot:control="{ value }">
            <div>{{ value | dateFormat }}</div>
          </template>
        </q-field>
        <q-input v-model="credit.duration" readonly borderless :label="$t('credit.duration')" />
        <q-field v-model="credit.effectiveInterestRate" readonly borderless :label="$t('credit.interest_rate')">
          <template v-slot:control="{ value }">
            <div>{{ value | formatPercentage }}</div>
          </template>
        </q-field>
        <money v-model="credit.monthlyRate" readonly borderless :currencyCode="credit.currency" :label="$t('credit.new.result.monthly_rate')" />
         <q-input v-model="credit.purpose" readonly borderless :label="$t('credit.purpose')" />
      </q-card-section>
      <q-separator color="bg-grey-3"/>
      <q-card-actions>
        <q-btn color="negative" dense :label="$t('credit.action.recall')" icon="delete" @click="evt => deleteCredit(credit.id)" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import Money from './Money.vue'
import { backendSettings } from 'src/config/backend'

export default {
  components: { Money },
  name: 'InstalmentCreditCard',
  methods: {
    deleteCredit (id) {
      this.$axios
        .delete(`${backendSettings.host}/credit/credits/${id}`, {
          headers: {
            authorization: `Bearer ${this.$store.state.oidcStore.id_token}`
          }
        })
        .then(
          this.$q.notify({
            color: 'positive',
            position: 'center',
            group: false,
            message: this.$i18n.t('credit.action.recall.success'),
            icon: 'done'
          })
        )
    }
  },
  props: {
    credit: {
      type: Object
    }
  }
}
</script>
