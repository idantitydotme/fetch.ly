<script setup lang="ts"></script>

<template>
  <div class="bg-white">
    <IDAppHeader />
    <slot />
    <LazyIDAppFooter hydrate-on-visible />
  </div>
</template>

<style scoped></style>
