<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid ms-3">
            <router-link class="navbar-brand text-primary" to="/">Where to go next?</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
        </div>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item me-3">
            <router-link class="nav-link" to="/about">About</router-link>
            </li>
        </ul>
        </div>
    </nav>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>
