<script setup lang="ts">

import {RouteLocation} from "vue-router";

const showFooter = ref(false)
const route = useRoute()
const setupFooter = (route: RouteLocation) => {
  switch (route.path) {
    case "/":
      showFooter.value = false;
      break;
    default:
      showFooter.value = true;
      break;
  }
}

watch(route, value => {
  setupFooter(route)
})

onMounted(() => {
  setupFooter(route)
})
</script>

<template>
  <footer class="border-t mt-12 bottom-0" v-if="showFooter">
    <div
        class="mx-auto w-full space-y-8 px-4 py-8 sm:px-6 lg:space-y-16 lg:px-8"
    >
      <div class="grid grid-cols-1 gap-8">
        <div>
          <div class="flex flex-nowrap justify-between align-middle">
            <div class="flex flex-nowrap">
              <img src="/img/logo.svg" alt="Logo" class="w-8 text-purple-700">
              <span class="px-2 font-bold text-purple-700">Polygon Store</span>
            </div>
            <NuxtLink
                to="https://github.com/uricholiveira/polygon-store"
                rel="noreferrer"
                target="_blank"
                class="text-gray-700 transition hover:opacity-75 pl-4"
            >
              <span class="sr-only">Facebook</span>

              <svg aria-hidden="true" class="dark:fill-white" height="24" version="1.1" viewBox="0 0 16 16" width="24"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>

      <p class="text-xs text-gray-500">
        &copy; 2023. Polygon Store. Todos os direitos reservados.
      </p>
    </div>
  </footer>
</template>

<style scoped>

</style>
