<script>
  import Button from "../controls/Button.svelte";
  import Input from "../controls/Input.svelte";

  let fn = '';
  let url = 'http://ota.tasmota.com/tasmota/release/tasmota.bin.gz';
</script>

<style>
  .active-region {
    position: relative;
    height: 4rem;
  }

  .active-region .label {
    padding-top: 1.2rem;
    opacity: 0.5;
    text-decoration: underline;
    white-space: nowrap;
  }

  .active-region.chosen .label {
    text-decoration: none;
  }

  .active-region > input[type="file"] {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    height: 100%;
    width: 100%;
    z-index: 10;
  }

  .input-group {
    align-items: center;
    display: flex;
    flex-direction: row;
    margin: 1rem 0;
  }

  .input-group label {
    padding-right: 1rem;
  }
</style>

<div class="form">
  <div class="title">Upgrade by web server</div>
  <div class="input-group">
    <label for="url">OTA Url:</label>
    <Input onInput={(e) => url = e.target?.value} class="flex" defaultValue={url} />
  </div>
  <Button title="Start upgrade" class="no-indent" disabled={!url} />
</div>

<div class="form">
  <div class="title">Upgrade by file upload</div>
  <div class={`active-region${fn ? ' chosen' : ''}`}>
    <input type="file" on:change={(e) => fn = e.target?.files?.[0]?.name} />
    <div class="label">{fn || 'click here to choose file'}</div>
  </div>
  <Button title="Start upgrade" class="no-indent" disabled={!fn} />
</div>

<Button to="/" class="top-indent" title="Main Menu" />
