<script setup lang="ts">
import {useLocalStorage, useSessionStorage} from "@vueuse/core";
import {useFetch, useLazyFetch} from "#app";
import {$fetch} from "ofetch";
const config = useRuntimeConfig()

const orderId = useSessionStorage<string | undefined>("orderId", () => undefined)
console.log("OrderId:", orderId)

const {data: order} = await useFetch<Order>(`order`, {
  method: 'get',
  baseURL: config.public.backend.url,
  query: {
    referenceId: orderId
  },
})

onBeforeRouteLeave(() => {
  orderId.value = undefined
})
</script>

<template>
  <div>
    <UContainer>
      <div class="flex flex-wrap justify-center mt-12 lg:mt-20">
        <div role="status" v-if="!order">
          <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
               viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"/>
            <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"/>
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
        <div class="flex flex-wrap justify-center" v-if="order">
          <h1 class="w-full text-center font-bold text-2xl">Pedido Concluído!</h1>
          <UIcon name="i-heroicons-check-circle" class="mt-4 w-24 h-24 text-green-600"/>
          <div
              class="w-full mt-12 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div class="flex justify-around font-medium text-lg">
              <div>
                <div>Número do pedido:</div>
                <div class="text-center font-light">{{order.id}}</div>
              </div>
              <div>
                <div>Realizado em:</div>
                <div class="text-center font-light">12/06/2023</div>
              </div>
              <div class="pr-2">
                <div>Valor total:</div>
                <div class="text-center font-light">R${{order.totalAmount}}</div>
              </div>
              <div>
                <button id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots"
                        class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        type="button">
                  <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                       xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                  </svg>
                </button>
                <!-- Dropdown menu -->
                <div id="dropdownDots"
                     class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                  <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
                    <li>
                      <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Visualizar</a>
                    </li>
                  </ul>
                  <div class="py-2">
                    <a href="#"
                       class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Cancelar
                      pedido</a>
                  </div>
                </div>
              </div>
            </div>
            <hr class="mt-4 -mb-2 mx6">
            <div class="flex-row">
              <div v-for="item in order['items']">
                <div class="flex align-middle -mb-12">
                  <div class="py-8">
                    <img class="h-36 w-72 object-cover rounded-lg" :src="`/img/products/${item.product.imageUrl}.png`" alt="image description">
                  </div>
                  <div class="pt-10 pl-6 w-full pr-6">
                    <div class="flex justify-between font-bold text-xl">
                      <div>{{item.product.description}}</div>
                      <div>R${{item.variant.value}}</div>
                    </div>
                    <div class="font-medium text-lg">{{item.variant.description}}</div>
                  </div>
                </div>
                <div class="flex flex-nowrap justify-between pt-8">
                  <div
                      class="flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-300 border border-green-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/>
                    </svg>
                    <span class="pl-1">Entregue</span>
                  </div>
                  <UBadge :label="item.referenceId" size="lg"/>
                  <div>
                    <div class="inline-flex rounded-md shadow-sm" role="group">
                      <button type="button"
                              class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                        Ver produto
                      </button>
                      <button type="button"
                              class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                        Comprar novamente
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </UContainer>
  </div>
</template>

<style scoped>

</style>
