<script>
  let className = '';

  export let onChange = () => {};
  export let value;
  export let title;
  export let inline = false;
  export let options = [];
  export { className as class };
  export let disabled = false;
</script>

<div class={`select-group${inline ? ' inline' : ''}`}>
  <div class="title">{title}</div>
  <select class={className} disabled={disabled} value={value} on:blur="{onChange}">
    {#each options as option}
      <option value={option[1]}>
        {option[0]}
      </option>
    {/each}
  </select>
</div>

<style>
  .select-group {
    display: flex;
    flex-direction: column;
  }

  .select-group.inline {
    flex-direction: row;
  }

  select {
    border-radius: 0.3rem;
    flex: 1 0 auto;
    margin: 0.5rem 0;
    padding: 0.6rem;
  }

  .title {
    flex: 0 0 auto;
    text-align: left;
  }

  .select-group.inline .title {
    align-self: center;
    padding-right: 1rem;
  }
</style>