<script>
	import '../app.css';
  </script>
  
  <slot />  

<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

{@render children()}
