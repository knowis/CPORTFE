<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-md-6">
        <q-banner class="bg-grey-3 text-black" rounded inline-actions>
          <template v-slot:avatar>
            <q-icon name="upcoming" color="secondary" />
          </template>
          <p>{{ $t('index.hello') }} {{ this.$store.state.userdata.username }},
          {{ $t('index.offer') }}</p>
          <template v-slot:action>
            <q-btn to="/credits/add" color="primary" :label="$t('index.offer.action')" icon="assignment_turned_in"/>
          </template>
        </q-banner>
      </div>
      <div class="col-md-6">
        <q-card flat bordered >
          <q-card-section class="bg-grey-3">
            <div class="text-h6 text-primary">{{ $t('messages.desc') }}</div>
          </q-card-section>
          <q-card-section>
            <q-scroll-area style="height: 400px;" ref="messages">
              <messages-panel/>
            </q-scroll-area>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import MessagesPanel from 'components/MessagesPanel.vue'
export default {
  components: { MessagesPanel },
  name: 'Index'
}
</script>
