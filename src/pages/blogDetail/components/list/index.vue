<template>
  <ul :style="{ lineHeight: 2 }">
    <li v-for="(item, key) in navList" :key="item.title">
      <div
        :class="item.selected ? 'selected' : ''"
        @click.stop="select(item.top, key)"
        :style="{ marginLeft: (item.type - 1) * gap + 'px' }"
      >
        {{ item.title }}
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  navList: {
    type: Array as PropType<Array<any>>,
    default: [],
  },
  gap: {
    type: Number,
    default: 0,
  },
})
const emits = defineEmits(['click'])
const select = (top: number, key: number) => {
  emits('click', top, key)
}
</script>

<style scoped>
.selected {
  color: #1e80ff;
}
</style>
