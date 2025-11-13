<script setup lang="ts"></script>

<template>
  <div class="bg-white">
    <IDAppHeader />
    <UMain>
      <slot />
    </UMain>
    <LazyIDAppFooter hydrate-on-visible />
  </div>
</template>

<style scoped></style>
