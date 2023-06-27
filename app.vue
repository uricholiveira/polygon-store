<script setup lang="ts">

import {Navbar} from "#components";
import Footer from "~/components/Footer.vue";

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
    <Footer />
  </div>
</template>
