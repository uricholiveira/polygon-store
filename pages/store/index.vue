<script setup lang="ts">
const searchInput = ref('')
const config = useRuntimeConfig()
const filteredItems = (inputType?: string) => {
  return products.value?.filter(x => {
    if (inputType != null) {
      return x.imageUrl.toLowerCase().includes(searchInput.value.toLowerCase()) && x.categories?.some(y => y.category.description.toLowerCase() == inputType.toLowerCase())
    }
    return x.imageUrl.toLowerCase().includes(searchInput.value.toLowerCase())
  })
}

const {data: products} = await useFetch<Product[]>("/product", {baseURL: config.public.backend.url});

onUpdated(async () => {
  const {data: products} = await useFetch<Product[]>("/product", {baseURL: config.public.backend.url});
})
const shoppingCart = useState<ShoppingCart[]>('shoppingCart')

</script>

<template>
  <div>
    <div class="flex flex-wrap justify-center" v-if="!products">
      <h1>Produtos não encontrado</h1>
    </div>
    <UContainer class="pb-10"  v-if="products">
      <div class="flex flex-wrap mt-8 p-2">
        <span class="font-bold text-xl">Os mais buscados</span>
        <div class="w-full mt-2 gap-1 flex scroll-smooth overflow-x-auto overflow-y-hidden justify-start">
          <div class="p-1 md:p-2" v-for="item in filteredItems()">
            <div class="w-28 md:w-36 lg:w-40 xl:w-44 h-auto rounded-lg shadow-md border-transparent">
              <NuxtLink :to="`/product/${item.id}`">
                <img :src="'/img/products/'+item.imageUrl+'.png'" alt="Produto"
                     class="object-cover border-transparent rounded-lg transition ease-in-out hover:-translate-y-1 hover:scale-105">
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap p-2">
        <span class="font-bold text-xl">Jogos (PC/Xbox/PS/Nintendo)</span>
        <div class="w-full mt-2 gap-1 flex scroll-smooth overflow-x-auto overflow-y-hidden justify-start">
          <div class="p-1 md:p-2" v-for="item in filteredItems('Games')">
            <div class="w-28 md:w-36 lg:w-40 xl:w-44 h-auto rounded-lg shadow-md border-transparent">
              <NuxtLink :to="`/product/${item.id}`">
                <img :src="'/img/products/'+item.imageUrl+'.png'" alt="Produto"
                     class="object-cover border-transparent rounded-lg transition ease-in-out hover:-translate-y-1 hover:scale-105">
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap p-2">
        <span class="font-bold text-xl">Streaming</span>
        <div class="w-full mt-2 gap-1 flex scroll-smooth overflow-x-auto overflow-y-hidden justify-start">
          <div class="p-1 md:p-2" v-for="item in filteredItems('Streaming')">
            <div class="w-28 md:w-36 lg:w-40 xl:w-44 h-auto rounded-lg shadow-md border-transparent">
              <NuxtLink :to="`/product/${item.id}`">
                <img :src="'/img/products/'+item.imageUrl+'.png'" alt="Produto"
                     class="object-cover border-transparent rounded-lg transition ease-in-out hover:-translate-y-1 hover:scale-105">
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap p-2">
        <span class="font-bold text-xl">Serviços</span>
        <div class="w-full mt-2 gap-1 flex scroll-smooth overflow-x-auto overflow-y-hidden justify-start">
          <div class="p-1 md:p-2" v-for="item in filteredItems('Services')">
            <div class="w-28 md:w-36 lg:w-40 xl:w-44 h-auto rounded-lg shadow-md border-transparent">
              <NuxtLink :to="`/product/${item.id}`">
                <img :src="'/img/products/'+item.imageUrl+'.png'" alt="Produto"
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
