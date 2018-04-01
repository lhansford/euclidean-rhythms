<template>
	<div id="app">
		<h1>My App!</h1>
    <p>{{ test }}</p>
	</div>
</template>

<script lang="ts">
  export default {
    name: 'App',
    data() {
      return { test: 'test' };
    }
  }
</script>