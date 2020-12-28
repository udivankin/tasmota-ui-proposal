<script>
  import Button from "../controls/Button.svelte";
  import Input from "../controls/Input.svelte";

  let command = "";
</script>

<style>
  textarea {
    resize: vertical;
    width: 100%;
    height: 320px;
    padding: 5px;
    overflow: auto;
    background: #1f1f1f;
    color: #65c115;
  }
</style>

<textarea readonly cols="340" wrap="off" />
<Input
  onInput={(e) => (command = e.target?.value)}
  class="block"
  defaultValue={command} />
<Button to="/" title="Main Menu" class="top-indent" />
