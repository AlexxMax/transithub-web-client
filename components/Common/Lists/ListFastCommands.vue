<template>
  <div class="absolute bottom-0 left-0 w-screen z-10 lg:w-2/6">
    <div class="mx-auto md:w-4/5 lg:w-full">
      <div class="bg-black mx-5 p-5 rounded-t-lg text-white">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'th-list-fast-commands',
}
</script>
