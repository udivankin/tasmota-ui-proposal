<script>
  import { onMount } from 'svelte';
      
  let notification;
  let hidden = 1;
  let timeout;

	onMount(() => {
		window.showToastNotification = (type, payload) => {
      notification = {
        type: 'success',
        text: payload?.text,
      }
      hidden = 0;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        hidden = 1;
        notification = null;
      }, 3000);
    };
	})
</script>

<style>
  .container {
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
    position: fixed;
    width: 100%;
  }

  .notification {
    display: flex;
    margin: 12px;
    background: #e75917;
    padding: 1rem;
    color: #fff;
    border-radius: 0.3rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    opacity: 1;
    transition: opacity ease-in-out 200ms;
  }
  .notification.hidden {
    opacity: 0;
  }
</style>

<div class="container">
  <div class={`notification${hidden ? ' hidden' : '' }`}>
    {notification?.text}
  </div>
</div>