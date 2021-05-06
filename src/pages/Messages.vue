<template>
  <q-page padding>
    <messages-panel />
  </q-page>
</template>

<script>
import MessagesPanel from 'components/MessagesPanel.vue'

export default {
  components: { MessagesPanel },
  name: 'MessagesPage'
}
</script>
