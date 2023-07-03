<script setup lang="ts">
import {RefType} from "vue/macros";
import {useShoppingCart} from "~/composables/states";

const shoppingCart = useShoppingCart()
const errorMessage = ref('')

const emit = defineEmits(['update'])

const removeProductCart = (index: number) => {
  const x = shoppingCart?.value;
  return emit('update', index)
}

const props = defineProps({
  index: {
    type: Number,
    required: true
  },
  item: {
    type: Object as () => ShoppingCart,
    default: null
  }
})
//
watch(() => props.item, (value, oldValue, onCleanup) => {
  /* ... */
  if (value.quantity <= 0) {
    props.item.quantity = 1
  }
})
</script>

<template>
  <li class="py-2 px-4">
    <UCard class="w-full hover:ring-purple-400 dark:hover:ring-purple-900">
      <div class="flex flex-nowrap justify-between align-middle">
        <img :src="`/img/products/${item.product.imageUrl}.png`" class="w-12 h-12 rounded-lg" alt="">
        <div class="flex flex-wrap justify-center text-center">
          <h1 class="w-full text-lg font-semibold">{{ item.product.description }}</h1>
          <p class="w-full text-sm font-medium">{{ item.variant.description }}</p>
        </div>
        <div>

          <UButtonGroup size="sm">
            <UButton icon="i-heroicons-chevron-up-20-solid" color="white" @click="item.quantity++"/>
            <UButton icon="i-heroicons-chevron-down-20-solid" color="gray" @click="item.quantity--" :disabled="item.quantity <=1"/>
          </UButtonGroup>
          <span class="px-2 font-medium">
            <UButton icon="i-heroicons-trash" class="hover:text-red-500 hover:bg-transparents" color="gray"
                     variant="ghost" @click="removeProductCart(index)"/>
        </span>
        </div>

      </div>
      <template #footer>
        <div class="-mx-8 -mt-1.5 -mb-1.5 flex justify-around mt-4 gap-2 align-middle">
          <div class="inline-flex gap-2">
            <div class="font-medium">Valor unitário:</div>
            <div class="w-16 order-1">
              <UInput type="number" v-model="item.variant.value" disabled placeholder="Quantidade" size="xs"
                      class="order-2"
              />
            </div>
          </div>
          <div class="inline-flex gap-2">
            <div class="font-medium">Quantidade:</div>
            <div class="w-16 order-1">
              <UFormGroup :error="errorMessage">
                <UInput type="number" v-model="item.quantity" disabled placeholder="Quantidade" size="xs"
                        class="order-2"
                />
              </UFormGroup>
            </div>
          </div>
        </div>
      </template>
    </UCard>
  </li>
</template>

<style scoped>

</style>
