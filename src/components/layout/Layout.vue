<script setup lang="ts">
import Header from './Header.vue'
import Sidebar from './Sidebar.vue'
</script>

<template>
  <div class="layout-container">
    <Header />
    <Sidebar />

    <main class="main-content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.layout-container {
  --sidebar-width: 240px;
  --gap-size: 20px;
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding-top: 4rem;
  padding-left: var(--gap-size);
  width: calc(100% - var(--sidebar-width) - var(--gap-size));
}
</style>
