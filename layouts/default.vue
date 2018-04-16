<template>
  <div>
    <Navbar />

    <Navmenu />

    <el-container>
      <el-main>
        <nuxt></nuxt>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar/Navbar'
import Navmenu from '@/components/Navmenu'

export default {
  components: {
    Navbar,
    Navmenu
  }
};
</script>
