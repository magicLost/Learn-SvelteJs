<script>
	import { onMount } from 'svelte';
	import { beforeUpdate } from 'svelte';

	export let name = "Angular";

	beforeUpdate(() => {
		console.log('Nested is about to update');
	});

	onMount(() => {
		console.log('Nested has mounted');
	});
</script>

<p>This is another paragraph about {name}.</p>