<script setup lang="ts">

</script>

<template>
  <li class="py-2 px-4">
    <UCard class="w-full hover:ring-purple-400 dark:hover:ring-purple-900">
      <div class="flex flex-nowrap justify-between">
        <img :src="'/img/products/valorant.png'" class="w-20 rounded -my-2" alt="">
        <div class="grid grid-cols-1">
          <span class="px-2 font-medium">
          Valorant
        </span>
          <span class="px-2 mt-8 font-medium text-lg">
          R$200
        </span>
        </div>
        <span class="px-2 font-medium">
          <UButton icon="i-heroicons-trash" class="hover:text-red-500 hover:bg-transparents" color="gray" variant="ghost" @click="console.log('aaaaa')"/>
        </span>
      </div>
    </UCard>
  </li>
</template>

<style scoped>

</style>
