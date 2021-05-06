<template>
  <q-page padding>
    <div class="bg-primary text-white text-center q-pa-md flex flex-center">
    <div>
      <div class="text-h2" style="opacity:.4">
        You successfully logged out.
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="primary"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
  </q-page>
</template>

<script>
export default {
  name: 'Logout',
  data () {
    return {
      username: undefined,
      password: undefined
    }
  }
}
</script>
