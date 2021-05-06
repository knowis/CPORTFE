<template>
  <q-field :borderless="borderless" :readonly="readonly" :label="label"
    :stackLabel="stackLabel" :hint="hint" :hideHint="hideHint" :prefix="prefix" :suffix="suffix"
    :labelColor="labelColor" :color="color" :bgColor="bgColor"
    :filled="filled" :outlined="outlined" :standout="standout"
    :square="square" :loading="loading" :rounded="rounded" :dense="dense" :itemAligned="itemAligned"
    :labelSlot="labelSlot" :bottomSlots="bottomSlots" :hideBottomSpace="hideBottomSpace"
    :counter="counter" :clearable="clearable" :clearIcon="clearIcon" :disable="disable" :autofocus="autofocus"
    v-bind:value="value" v-on:input="$emit('input', $event)"
  >
    <template v-slot:control="{ id, floatingLabel, value, emitValue, editable }">
      <currency-input :id="id" class="q-field__input" :value="value" @input="emitValue"
        :currency="currencyCode" v-show="floatingLabel" :locale="locale" v-if="editable"/>
      <currency-input :id="id" readonly class="q-field__input" :value="value" @input="emitValue"
        :currency="currencyCode" :distractionFree=false v-show="floatingLabel" :locale="locale" v-if="!editable"/>
    </template>
  </q-field>
</template>

<script>
export default {
  props: {
    value: Number,
    locale: {
      type: String,
      default () {
        return this.$store.state.userdata.preferredLocale
      }
    },
    currencyCode: {
      type: String,
      default () {
        return this.$store.state.userdata.defaultCurrency
      }
    },
    label: String,
    stackLabel: Boolean,
    hint: String,
    hideHint: Boolean,
    prefix: String,
    suffix: String,

    labelColor: String,
    color: String,
    bgColor: String,

    filled: Boolean,
    outlined: Boolean,
    borderless: Boolean,
    standout: [Boolean, String],

    square: Boolean,

    loading: Boolean,

    labelSlot: Boolean,

    bottomSlots: Boolean,
    hideBottomSpace: Boolean,

    rounded: Boolean,
    dense: Boolean,
    itemAligned: Boolean,

    counter: Boolean,

    clearable: Boolean,
    clearIcon: String,

    disable: Boolean,
    readonly: Boolean,

    autofocus: Boolean
  }
}
</script>
