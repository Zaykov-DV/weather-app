<template>
  <label v-if="label">{{ label }}</label>
  <input class="input" type="text"
         :value="modelValue"
         @input="$emit('update:modelValue', $event.target.value)"
         v-bind="$attrs">
</template>

<script setup>
defineProps({
  label: {
    type: [String, Boolean],
    default: false
  },
  modelValue: {
    type: String,
    default: ''
  }
})

</script>

<style lang="scss" scoped>

.input {

  width: 100%;
  border: none;
  background-color: #f2f7f6;
  padding: 4px 4px 4px 30px;
  height: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

  &:focus {
    outline: none;
  }
}

</style>