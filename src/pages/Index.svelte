<script>
  import Button from "../controls/Button.svelte";
  import { get } from "../actions";

  let toggleState = false;

  function handleRestartClick() {
    if (confirm("Confirm Restart")) {
      get('/?rst');
    }
  }
  
  function handleToggleClick() {
    toggleState = !toggleState;
    get(`/?m=1&o=1`);
  }
</script>

<h1>{toggleState ? 'ON' : 'OFF'}</h1>
<Button title="Toggle" onClick={handleToggleClick} />
<Button to="cn" title="Configuration" class="top-indent" />
<Button to="in" title="Information" />
<Button to="up" title="Firmware Upgrade" />
<Button to="cs" title="Console" />
<Button
  title="Restart"
  class="danger top-indent"
  onClick={handleRestartClick} />
