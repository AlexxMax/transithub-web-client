<template>
  <div class="-mx-20px -my-20px mx-auto">
    <div class="lg:flex">
      <div class="-mb-5 h-list overflow-y-auto p-5 md:w-4/5 md:mx-auto lg:w-2/6">
        <slot name="list"/>
      </div>

      <div class="-mb-5 invisible h-0 overflow-y-auto w-4/6 lg:h-list lg:visible lg:py-5 lg:pr-5 lg:pl-1">
        <slot name="form"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'th-list-page-scaffold'
}
</script>
