<template>
<div class="container p-5 text-center">
  <div class="h2 mb-4 fw-bold">Choose sport</div>
  <router-link class="btn btn-primary px-4 py-3" to="/climbing">Climbing</router-link>
</div>

</template>

<script>
export default {
  created () {
    document.title = 'Where to go next?'
  }
}
</script>
