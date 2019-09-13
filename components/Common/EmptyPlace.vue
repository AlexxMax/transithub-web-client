<template>
  <div class="h-full">
    <div class="h-full min-h-full flex flex-col">
      <div class="flex flex-1 items-center">
        <MainLogo/>
      </div>
    </div>
  </div>
</template>

<script>
import MainLogo from "@/components/Common/MainLogo"

export default {
  name: 'th-empty-place',

  components: { MainLogo },
}
</script>
