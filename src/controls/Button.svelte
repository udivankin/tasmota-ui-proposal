<script>
  import { link } from "svelte-routing";

  let className = '';

  export let onClick = () => {};
  export let title;
  export let type;
  export { className as class };
  export let to = undefined;
  export let disabled = false;
</script>

<style>
  .btn {
    border: 0;
    border-radius: 0.3rem;
    background: #1fa3ec;
    color: #faffff;
    display: block;
    font-size: 1.2rem;
    width: 100%;
    transition-duration: 0.4s;
    cursor: pointer;
    padding: 0.5rem 1rem;
    margin: 0.5rem 0;
  }

  .btn:active,
  .btn:hover {
    background: #1284c2;
    text-decoration: none;
  }

  .btn.danger {
    background: #d43535;
  }
  .btn.danger:active,
  .btn.danger:hover {
    background: #931f1f;
  }

  .btn.save {
    background: #47c266;
  }
  .btn.save:active,
  .btn.save:hover {
    background: #5aaf6f;
  }

  .btn.inline {
    display: inline-block;
    width: auto;
  }

  .btn.top-indent {
    margin-top: 1rem;
  }

  .btn.no-indent {
    margin: 0;
  }

  .btn:disabled {
    background: #666;
    cursor: not-allowed;
  }
</style>

{#if to}
  <a href={to} class="btn" use:link>{title}</a>
{:else}
  <button
    on:click={onClick}
    disabled={disabled}
    type={type}
    class="btn{className ? ` ${className}` : ''}">{title}</button>
{/if}
