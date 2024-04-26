<script setup lang="ts">
import Text from '@/components/text.vue';
import Tag from '@/components/tag.vue';
import { reactive } from 'vue';
import clsx from 'clsx';

const activeTabs = reactive<(string | number)[]>([]);

function changeTab(item: number) {
  if (activeTabs.includes(item)) {
    activeTabs.splice(activeTabs.indexOf(item), 1);
  } else {
    activeTabs.push(item);
  }
}
</script>

<template>
  <div
    class="relative flex flex-col min-w-0 bg-clip-border text-[rgb(211,211,211)] border-none bg-[rgb(49,49,49)] rounded-lg overflow-hidden sm:p-0 sm:rounded-[20px]"
    style="box-shadow: rgba(0, 0, 0, 0.2) 0px 15px 30px 0px"
  >
    <div class="relative w-full pb-[15px]">
      <div class="overflow-hidden relative h-full pb-3">
        <div class="relative">
          <table class="w-full text-white mb-0 font-normal">
            <thead class="whitespace-nowrap border-none font-normal">
              <tr class="border-none font-normal">
                <th
                  class="border-none text-[rgb(210,210,210)] text-sm font-light pt-[1.625rem] px-[1.375rem] pb-2 align-middle first:text-left"
                  style="text-transform: uppercase"
                >
                  Slot
                </th>
                <th
                  class="border-none text-[rgb(210,210,210)] text-sm font-light pt-[1.625rem] px-[1.375rem] pb-2 align-middle first:text-left"
                  style="text-transform: uppercase"
                >
                  Transaction hash
                </th>
                <th
                  class="border-none text-[rgb(210,210,210)] text-sm font-light pt-[1.625rem] px-[1.375rem] pb-2 align-middle first:text-left"
                  style="text-transform: uppercase"
                >
                  Instructions
                </th>
                <th
                  class="border-none text-[rgb(210,210,210)] text-sm font-light pt-[1.625rem] px-[1.375rem] pb-2 align-middle first:text-left"
                  style="text-transform: uppercase"
                >
                  Status
                </th>
                <th
                  class="border-none text-[rgb(210,210,210)] text-sm font-light pt-[1.625rem] px-[1.375rem] pb-2 align-middle first:text-left"
                  style="text-transform: uppercase"
                >
                  Fee
                </th>
                <th
                  class="border-none text-[rgb(210,210,210)] text-sm font-light pt-[1.625rem] px-[1.375rem] pb-2 align-middle first:text-left"
                  style="text-transform: uppercase"
                >
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody class="whitespace-nowrap border-none font-normal">
              <tr
                v-for="item in Array.from({ length: 10 }, (_, i) => i)"
                :key="item"
                class="border-none font-normal"
              >
                <td
                  class="border-none font-normal pt-[0.9375rem] px-[1.375rem] pb-[0.875rem] align-middle"
                >
                  <div class="whitespace-nowrap">
                    <RouterLink
                      to="#"
                      class="text-[rgb(105,245,225)] hover:underline"
                    >
                      <span class="ml-[5px]">260590386</span>
                    </RouterLink>
                  </div>
                </td>
                <td
                  class="border-none font-normal pt-[0.9375rem] px-[1.375rem] pb-[0.875rem] align-middle"
                >
                  <span class="relative overflow-visible inline-flex mr-[4px]">
                    <Text :copyed="{ text: '3bcNxxxxx8TZT' }">
                      <RouterLink
                        to="#"
                        class="text-[rgb(105,245,225)] ml-2 hover:underline"
                      >
                        <span>3bcN...8TZT</span>
                      </RouterLink>
                    </Text>
                  </span>
                </td>
                <td
                  class="border-none font-normal pt-[0.9375rem] px-[1.375rem] pb-[0.875rem] align-middle"
                >
                  <button
                    class="w-full whitespace-nowrap bg-none border-none p-0 flex flex-col text-white max-w-[200px]"
                  >
                    <div class="flex" @click="changeTab(item)">
                      CreateAssociatedTokenAccount
                      <div
                        class="border border-solid border-[rgb(105,245,225)] py-[2px] px-[6px] rounded-lg text-xs ml-[10px]"
                      >
                        +3
                      </div>
                    </div>
                    <!--展开后的tabs-->
                    <div
                      :class="
                        clsx(
                          'flex max-w-[300px] flex-wrap h-0 overflow-hidden transition-all duration-300 ease-in-out',
                          {
                            'h-auto': activeTabs.includes(item),
                          }
                        )
                      "
                    >
                      <div
                        :class="
                          clsx('flex-wrap pt-[10px]', {
                            hidden: !activeTabs.includes(item),
                            flex: activeTabs.includes(item),
                          })
                        "
                      >
                        <span
                          class="border border-solid border-[rgb(255,255,255)] rounded-[30px] mr-[5px] mb-[5px] py-[3px] px-[6px] text-[12px]"
                          >Unknown</span
                        >
                        <span
                          class="border border-solid border-[rgb(255,255,255)] rounded-[30px] mr-[5px] mb-[5px] py-[3px] px-[6px] text-[12px]"
                          >Unknown</span
                        >
                        <span
                          class="border border-solid border-[rgb(255,255,255)] rounded-[30px] mr-[5px] mb-[5px] py-[3px] px-[6px] text-[12px]"
                          >Unknown</span
                        >
                        <span
                          class="border border-solid border-[rgb(255,255,255)] rounded-[30px] mr-[5px] mb-[5px] py-[3px] px-[6px] text-[12px]"
                          >Unknown</span
                        >
                      </div>
                    </div>
                  </button>
                </td>
                <td
                  class="border-none font-normal pt-[0.9375rem] px-[1.375rem] pb-[0.875rem] align-middle"
                >
                  <Tag>Failed</Tag>
                </td>
                <td
                  class="border-none font-normal pt-[0.9375rem] px-[1.375rem] pb-[0.875rem] align-middle"
                >
                  <div class="relative cursor-default inline-flex">
                    <div class="relative cursor-default inline-block">
                      <span>0.00002552 SOL</span>
                    </div>
                  </div>
                </td>
                <td
                  class="border-none font-normal pt-[0.9375rem] px-[1.375rem] pb-[0.875rem] align-middle"
                >
                  <div class="relative cursor-default inline-flex">
                    <div class="relative cursor-default inline-block">
                      26s ago
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
tbody {
  tr:nth-child(2n + 1) {
    background: rgb(44, 44, 44);
  }
}
</style>
