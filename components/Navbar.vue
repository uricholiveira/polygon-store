<script setup lang="ts">
import {RouteLocation} from "vue-router";
import {useShoppingCart} from "~/composables/states";
import arg from "arg";

const colorMode = useColorMode()

const shoppingCart = useShoppingCart()
const total = computed(() => {
  let y: number = 0;
  shoppingCart.value.forEach(x => {
    y += (x.variant?.value * x.quantity) || 0
  })
  return y
})

const removeProductCart = (index: number) => {
  let newArray = [...shoppingCart.value];
  newArray = newArray.filter((item, i) => i !== index)
  shoppingCart.value = newArray
}


const isOpen = ref(false)
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})

const items = [
  [
    {
      label: 'Meu perfil',
    },
    {
      label: 'Meus pedidos',
    },
  ],
  [
    {
      label: 'Sair',
    }
  ]
]

const showMenuItems = ref(false)
const route = useRoute()
const setupMenuItems = (route: RouteLocation) => {
  switch (route.path) {
    case "/":
      showMenuItems.value = false;
      break;
    default:
      showMenuItems.value = true;
      break;
  }
}

watch(route, value => {
  setupMenuItems(route)
})

onMounted(() => {
  setupMenuItems(route)
})
</script>

<template>
  <nav class="border-gray-200">
    <div class="max-w-screen-xl h-24 flex flex-wrap items-center justify-between mx-auto p-4">
      <NuxtLink to="/" class="items-center">
        <img src="/img/logo.svg" class="h-8 mr-3" alt="Logo"/>
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
      </NuxtLink>
      <div class="flex justify-end gap-2 items-center">
        <ClientOnly>
          <NuxtLink to="/store">
            <UButton v-show="showMenuItems" icon="i-heroicons-shopping-bag" size="sm" color="gray" variant="ghost"/>
          </NuxtLink>
        </ClientOnly>
        <ClientOnly>
          <div class="block" v-show="showMenuItems">
            <div class="relative py-2">
              <div class="t-0 absolute bottom-8 left-4" v-if="shoppingCart.length > 0">
                <UBadge :label="shoppingCart.length.toString()" size="xs" />
              </div>
              <UButton icon="i-heroicons-shopping-cart" size="sm" color="gray" variant="ghost"
                       @click="isOpen=true"/>
            </div>
          </div>
          <USlideover v-model="isOpen">
            <div class="p-2 flex justify-end">
              <UButton icon="i-heroicons-x-mark" size="sm" color="gray" variant="ghost" @click="isOpen=false"></UButton>
            </div>
            <ol class="w-full overflow-y-auto mb-32">
              <CartItems v-for="(i, key) in shoppingCart" :item="i" :index="key" @update="removeProductCart($event)"/>
            </ol>
            <div class="absolute w-full bottom-0 pb-4">
              <div class="flex justify-center font-bold text-xl pt-2 pb-2">
                Valor total: R${{total}}
              </div>
              <div class="flex justify-center pt-2">
                <UButton label="Finalizar compra"/>
              </div>
            </div>
          </USlideover>
        </ClientOnly>
        <ClientOnly>
          <UButton
              :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
              color="gray"
              variant="ghost"
              aria-label="Theme"
              @click="isDark = !isDark"
          />

          <template #fallback>
            <div class="w-8 h-8"/>
          </template>
        </ClientOnly>
        <UDropdown v-show="showMenuItems" :items="items" :popper="{ placement: 'bottom-end', strategy: 'fixed' }">
          <UAvatar src="https://avatars.githubusercontent.com/u/48108280?&v=4" alt="Avatar"/>
        </UDropdown>
      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>
