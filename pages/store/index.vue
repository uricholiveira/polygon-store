<script setup lang="ts">
const searchInput = ref('')
const filteredItems = (inputType?: string) => {
  return items.filter((x) => {
    if (inputType != null) {
      return x.icon.toLowerCase().includes(searchInput.value.toLowerCase()) && x.inputType == inputType
    }
    return x.icon.toLowerCase().includes(searchInput.value.toLowerCase())
  })
}

const items = [{
  description: "Game Pass - 1 mês",
  icon: 'xbox',
  inputType: 'games',
  price: 28
}, {
  description: "Game Pass - 2 meses",
  icon: 'steam',
  inputType: 'games',
  price: 50
}, {
  description: "Game Pass - 3 meses",
  icon: 'valorant',
  inputType: 'games',
  price: 70
}, {
  description: "Steam - 50 reais",
  icon: 'lol',
  inputType: 'games',
  price: 120
}, {
  description: "Netflix",
  icon: 'netflix',
  inputType: 'services',
  price: 120
}, {
  description: "Airbnb",
  icon: 'airbnb',
  inputType: 'services',
  price: 120
}, {
  description: "Uber",
  icon: 'uber',
  inputType: 'services',
  price: 120
}, {
  description: "Spotify",
  icon: 'spotify',
  inputType: 'services',
  price: 120
}, {
  description: "Crunchyroll",
  icon: 'crunchyroll',
  inputType: 'services',
  price: 120
}]
</script>

<template>
  <div>
    <UContainer class="pb-10">
      <div class="flex flex-wrap mt-8 p-2">
        <span class="font-bold text-xl">Os mais buscados</span>
        <div class="w-full mt-2 gap-2 flex scroll-smooth overflow-x-auto overflow-y-hidden justify-start">
          <div class="" v-for="item in filteredItems()">
            <div class="w-48 rounded-lg shadow-md border-transparent">
              <NuxtLink>
                <img :src="'/img/products/'+item.icon+'.png'" alt="Produto"
                     class="object-cover border-transparent rounded-lg transition ease-in-out hover:-translate-y-1 hover:scale-105">
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap p-2">
        <span class="font-bold text-xl">Jogos (PC/Xbox/PS/Nintendo)</span>
        <div class="w-full mt-2 gap-2 flex scroll-smooth overflow-x-auto overflow-y-hidden justify-start">
          <div class="" v-for="item in filteredItems('games')">
            <div class="w-48 rounded-lg shadow-md border-transparent">
              <NuxtLink>
                <img :src="'/img/products/'+item.icon+'.png'" alt="Produto"
                     class="object-cover border-transparent rounded-lg transition ease-in-out hover:-translate-y-1 hover:scale-105">
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap p-2">
        <span class="font-bold text-xl">Streaming</span>
        <div class="w-full mt-2 gap-2 flex scroll-smooth overflow-x-auto overflow-y-hidden justify-start">
          <div class="" v-for="item in filteredItems('services')">
            <div class="w-48 rounded-lg shadow-md border-transparent">
              <NuxtLink>
                <img :src="'/img/products/'+item.icon+'.png'" alt="Produto"
                     class="object-cover border-transparent rounded-lg transition ease-in-out hover:-translate-y-1 hover:scale-105">
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<style scoped>
</style>
