<template>
  <router-view :key="$route.fullPath"/>
</template>

<script>

import router from 'vue-router'

export default {
name:"App"
}
</script>

