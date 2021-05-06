<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-md-6">
        <q-card flat bordered >
          <q-card-section class="bg-grey-3">
            <div class="text-h6 text-primary">{{ $t('testdata.clearAll.lbl') }}</div>
          </q-card-section>
          <q-card-section>
            <p>{{ $t('testdata.clearAll.desc') }}</p>
          </q-card-section>
          <q-separator color="bg-grey-3"/>
          <q-card-actions>
            <q-btn :label="$t('testdata.clearAll.lbl')" icon="clear_all" @click="clearAll" :loading="progressClearAll" color="warning"/>
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-md-6">
        <q-card flat bordered >
          <q-card-section class="bg-grey-3">
            <div class="text-h6 text-primary">{{ $t('testdata.generate.lbl') }}</div>
          </q-card-section>
          <q-card-section>
            <p>{{ $t('testdata.generate.desc') }}</p>
          </q-card-section>
          <q-separator color="bg-grey-3"/>
          <q-card-actions>
            <q-btn :label="$t('testdata.generate.lbl')" icon="perm_data_setting" @click="generate" :loading="progressGenerate" color="primary"/>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { backendSettings } from 'src/config/backend'
export default {
  name: 'Testdata',
  data () {
    return {
      progressClearAll: false,
      progressGenerate: false
    }
  },
  methods: {
    clearAll () {
      this.progressClearAll = true
      this.$axios
        .delete(`${backendSettings.host}/testdata`, {
          headers: {
            authorization: `Bearer ${this.$store.state.oidcStore.id_token}`
          }
        })
        .then(response => {
          this.progressClearAll = false
          this.$q.notify({
            color: 'success',
            position: 'center',
            message: this.$i18n.t('testdata.clearAll.success'),
            icon: 'done_all'
          })
        })
        .catch(response => {
          this.progressClearAll = false
          console.log(response)
          this.$q.notify({
            color: 'negative',
            position: 'center',
            message: this.$i18n.t('testdata.clearAll.error'),
            icon: 'report_problem'
          })
        })
    },
    generate () {
      this.progressGenerate = true
      this.$axios
        .post(`${backendSettings.host}/testdata`, {}, {
          headers: {
            authorization: `Bearer ${this.$store.state.oidcStore.id_token}`
          }
        })
        .then(response => {
          this.progressGenerate = false
          this.$q.notify({
            color: 'success',
            position: 'center',
            message: this.$i18n.t('testdata.generate.success'),
            icon: 'done_all'
          })
        })
        .catch(response => {
          this.progressGenerate = false
          console.log(response)
          this.$q.notify({
            color: 'negative',
            position: 'center',
            message: this.$i18n.t('testdata.generate.error'),
            icon: 'report_problem'
          })
        })
    }
  }
}
</script>
