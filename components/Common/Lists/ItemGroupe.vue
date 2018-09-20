<template>
  <div>
    <div class="ListItemGroupe__wrapper" @click="$emit('onClick')">
      <div class="ListItemGroupe">
        <div class="ListItemGroupe__title">{{ title }}</div>
        <div class="ListItemGroupe__subtitle">{{ subtitle }}</div>
      </div>
    </div>

    <slot/>
  </div>
</template>

<script>
export default {
  name: 'th-item-groupe',

  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.ListItemGroupe__wrapper {
  margin: 10px 0;
  padding: 0 5px;

  .ListItemGroupe {
    padding: 10px 20px;
    // border: 1px solid #bebebe1a;
    border-radius: 5px;
    // font-size: 14px;
    cursor: pointer;

    &:hover {
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      background-color: white;
      text-decoration: underline;
      color: #FECD34;

      .ListItemGroupe__subtitle {
        color: #FECD34;
      }
    }

    .ListItemGroupe__title {
      color: #FECD34;
    }

    .ListItemGroupe__subtitle {
      font-size: 13px;
      color: #909399;
    }
  }
}
</style>
