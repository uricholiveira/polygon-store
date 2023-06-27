<script setup lang="ts">
import {RefType} from "vue/macros";
import {useShoppingCart} from "~/composables/states";

const shoppingCart = useShoppingCart()

const emit = defineEmits(['update'])

const removeProductCart = (index: number) => {
  const x = shoppingCart?.value;
  return emit('update', index)
}

defineProps({
  index: {
    type: Number,
    required: true
  },
  product: {
    type: Object as () => Product,
    default: null
  },
  variant: {
    type: Object as () => Variant,
    default: null
  }
})
</script>

<template>
  <li class="py-2 px-4">
    <UCard class="w-full hover:ring-purple-400 dark:hover:ring-purple-900">
      <div class="flex flex-nowrap justify-between">
        <img :src="`/img/products/${product.imageUrl}.png`" class="w-24 rounded -my-2" alt="">
        <div class="grid grid-cols-1">
          <span class="px-2 font-medium">
          {{ product.description }}
        </span>
          <span class="px-2 font-light">
          {{ variant.description }}
        </span>
          <span class="px-2 mt-4 font-medium text-lg">
          R${{ variant.value }}
        </span>
        </div>
        <span class="px-2 font-medium">
          <UButton icon="i-heroicons-trash" class="hover:text-red-500 hover:bg-transparents" color="gray"
                   variant="ghost" @click="removeProductCart(index)"/>
        </span>
      </div>
    </UCard>
  </li>
</template>

<style scoped>

</style>
