<script setup lang="ts">
import Footer from "~/components/Footer.vue";
import {useShoppingCart} from "~/composables/states";

const route = useRoute()
const config = useRuntimeConfig()
const shoppingCart = useShoppingCart()
const addProductCart = (product: Product, variant: Variant, quantity: number) => {
  var existingProduct = shoppingCart.value.filter(x => {
    return x.product.id == product.id && x.variant.id == variant.id
  });
  if (shoppingCart.value.length > 0 && existingProduct.length > 0) {
    existingProduct[0].quantity += Number(quantity);
  } else {
    shoppingCart.value.push({product: product, variant: variant, quantity: quantity})
  }
}

// When accessing /posts/1, route.params.id will be 1
const selectedVariant = ref<Variant | null>(null)
const productQuantity = ref(1)

const {data} = await useFetch<Product>(`/product/${route.params.id}`, {baseURL: config.public.backend.url})
const product: Product | null = data.value;
onUpdated(async () => {
  const {data: product} = await useFetch<Product>(`/product/${route.params.id}`, {baseURL: config.public.backend.url});
})
</script>

<script lang="ts">

</script>

<template>
  <UContainer>
    <div class="flex flex-wrap justify-center" v-if="!product">
      <h1>Produto não encontrado</h1>
    </div>
    <div class="flex flex-wrap align-middle justify-center md:justify-start md:flex-nowrap md:px-6 gap-6"
         v-if="product">
      <div class="lg:order-1">
        <img :src="`/img/products/${product?.imageUrl}.png`" alt="" class="rounded-lg w-52 md:w-64 lg:w-[21.3rem]">
      </div>
      <div class="lg:order-2">
        <h1 class="text-4xl font-medium">{{ product?.description }}</h1>
        <UBadge label="Resgatável apenas no Brasil" class="mt-2 w-52"/>
        <div class="w-full flex">
          <div class="flex flex-wrap w-full mt-4 gap-6" v-if="product?.variants?.length == 0">
            <UBadge label="Não temos estoque disponível para esse produto" color="red"
                    class="w-72 border-red-500 bg-red-100 dark:bg-red-500 dark:border-red-500 ring-red-500"/>
          </div>
          <ul class="flex flex-wrap w-full mt-4 gap-6">
            <li v-for="(variant, key) in product?.variants" :key="key">
              <input type="radio" :id="key" name="hosting" :value="variant" class="hidden peer"
                     v-model="selectedVariant">
              <label :for="key"
                     class="inline-flex items-center justify-between w-full p-5 border border-gray-200 rounded-lg cursor-pointer dark:border-gray-700 dark:peer-checked:text-purple-500 peer-checked:border-purple-600 peer-checked:text-purple-600 hover:bg-gray-100 dark:text-white dark:bg-gray-800 dark:hover:bg-gray-900"
                     :class="product?.variants?.length > 3? 'h-16' : 'h-24'">
                <div class="block">
                  <div class="w-full text-lg font-semibold">R${{ variant?.value }}</div>
                  <div class="w-full">{{ variant.description }}</div>
                </div>
              </label>
            </li>
          </ul>
          <!--          <URadio class="" v-for="variant in variants" :label="variant.price.toString()" :help="variant.value"></URadio>-->
        </div>
        <div class="pt-4 font-semibold text-xl">
          Preço: BRL {{ selectedVariant?.value }}
        </div>
        <hr class="my-4">
        <div class="w-24 flex flex-wrap gap-2 align-middle">
          <span class="text-xl font-medium">Quantidade</span>
          <UInput type="number" v-model="productQuantity" size="lg" class="order-2"
                  :disabled="product?.variants?.length == 0 || selectedVariant == null"/>
        </div>
        <div class="flex flex-wrap gap-2 align-middle mt-2">
          <UButton size="md" block variant="solid" class="dark:text-white" label="Adicionar ao carrinho"
                   :disabled="product?.variants?.length == 0 || selectedVariant == null"
                   @click="addProductCart(product, selectedVariant!, productQuantity)"/>
          <UButton size="md" block variant="solid" color="blue" class="bg-blue-400 hover:bg-blue-500 dark:text-white"
                   label="Comprar agora" :disabled="product?.variants?.length == 0 || selectedVariant == null"/>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap justify-center mt-4">
      <span class="w-full font-medium text-center">Entrega imediata após a confirmação do pagamento.</span>
      <p class="w-full font-medium text-center pt-1">Pagamentos realizados através da plataforma:</p>
      <img src="/img/stripe-logo.svg" alt="Stripe Logo" class="w-24"/>
    </div>
  </UContainer>
</template>

<style scoped>
</style>
