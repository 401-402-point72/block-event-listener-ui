<script setup lang="ts">
const emits = defineEmits(['enterCb']);
defineProps({
  placeholder: {
    type: String,
    required: true,
  },
});
const enterCb = (e: any) => {
  const v = e.target.value;
  emits('enterCb', v);
};
</script>

<template>
  <div class="flex items-center mb-6 justify-between min-h-9">
    <div
      class="absolute left-[15px] right-[15px] -top-[12px] sm:relative sm:top-[unset] sm:left-[unset] sm:right-[unset] sm:bottom-[unset] sm:m-0 sm:w-full"
    >
      <div class="w-full">
        <div>
          <div class="relative box-border">
            <div
              class="flex flex-wrap items-center rounded justify-between min-h-[38px] transition-all outline-0"
            >
              <!--search -->
              <div
                class="flex items-center flex-1 flex-wrap relative overflow-hidden py-[10px] px-[19px] bg-[rgb(49,49,49)] shadow-none rounded-[15px] max-sm:hidden"
              >
                <div
                  class="text-white z-10 m-[2px] py-[2px] visible"
                  style="width: calc(100% - 50px)"
                >
                  <div class="inline-block w-full">
                    <input
                      autocapitalize="none"
                      autocomplete="off"
                      spellcheck="false"
                      type="text"
                      :placeholder="placeholder"
                      style="
                        box-sizing: content-box;
                        width: 100%;
                        background: 0px center;
                        border: 0px;
                        font-size: inherit;
                        opacity: 1;
                        outline: 0px;
                        padding: 0px;
                        color: inherit;
                      "
                      class="overflow-visible m-0"
                      @keydown.enter="enterCb"
                    />
                  </div>
                </div>
              </div>
              <!--search icon-->
              <div
                class="flex items-center self-center flex-shrink-0 box-border absolute right-0"
              >
                <button
                  class="text-[rgb(136,136,136)] search-icon hover:text-white border-0 py-[13px] px-[19px] bg-[rgb(49,49,49)]"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      id="Symbols"
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <g
                        id="Search-Bar"
                        transform="translate(-613.000000, -13.000000)"
                        fill="currentColor"
                        fill-rule="nonzero"
                      >
                        <path
                          d="M636.371801,36.8359307 L636.835881,36.371851 C637.056202,36.1515757 637.056202,35.7952991 636.835881,35.5749779 L630.78902,29.5281174 C630.681217,29.4203143 630.540592,29.3640552 630.390584,29.3640552 L629.907781,29.3640552 C631.515581,27.6250152 632.499954,25.3047082 632.499954,22.7500268 C632.499954,17.3640839 628.13592,13.0000501 622.749977,13.0000501 C617.364034,13.0000501 613,17.3640839 613,22.7500268 C613,28.1359698 617.364034,32.5000036 622.749977,32.5000036 C625.304658,32.5000036 627.624965,31.5156309 629.364005,29.9125006 L629.364005,30.3906336 C629.364005,30.5406424 629.424979,30.6812671 629.528067,30.7890702 L635.574928,36.8359307 C635.795249,37.0562519 636.151526,37.0562519 636.371801,36.8359307 Z M622.749977,31.0000072 C618.189059,31.0000072 614.499996,27.3109443 614.499996,22.7500268 C614.499996,18.1891094 618.189059,14.5000465 622.749977,14.5000465 C627.310894,14.5000465 630.999957,18.1891094 630.999957,22.7500268 C630.999957,27.3109443 627.310894,31.0000072 622.749977,31.0000072 Z"
                          id="search-icon"
                        ></path>
                      </g>
                    </g>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-icon {
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;

  @media only screen and (max-width: 640px) {
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
  }
}
</style>
