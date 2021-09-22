<template>

</template>

<script>
export default {
  async middleware ({store, redirect, route}) {
    if (process.server) {
      const url = await store.dispatch('getUrlData', route.params.url)
      return redirect(302, url.data ? url.data.originalUrl : '/')
    }
  }
}
</script>

<style scoped>

</style>
