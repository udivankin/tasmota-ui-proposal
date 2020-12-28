<script>
  import { onMount } from 'svelte';
      
  let className;
  let value;

  export let onInput = () => {};
  export { className as class };
  export let defaultValue = '';

	onMount(() => {
		value = defaultValue;
	})
</script>

<style>
  input {
    border-radius: 0.3rem;
    margin: 0.5rem 0;
    padding: 0.6rem;
  }

  input.flex {
    flex: 1 0 auto;
  }

  input.block {
    display: block;
    width: 100%;
  }
</style>

<input type="text" class={className} on:input={onInput} value={value} />