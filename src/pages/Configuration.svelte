<script>
  import Button from "../controls/Button.svelte";

  function handleResetClick() {
    confirm("Confirm Reset Configuration");
  }
</script>

<Button to="/cm" title="Configure Module" />
<Button title="Configure WiFi" />
<Button title="Configure MQTT" />
<Button title="Configure Domoticz" />
<Button title="Configure Timer" />
<Button title="Configure Logging" />
<Button title="Configure Other" />
<Button title="Configure Template" />
<Button title="Reset Configuration" class="danger top-indent" onClick={handleResetClick} />
<Button title="Backup Configuration" />
<Button title="Restore Configuration" />
<Button to="/" class="top-indent" title="Main Menu" />