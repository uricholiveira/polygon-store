<script setup lang="ts">

import {Navbar} from "#components";

useHead({
  bodyAttrs: {
    class: ''
  }
})
</script>

<template>
  <div>
    <Navbar/>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>
