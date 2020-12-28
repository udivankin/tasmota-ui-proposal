<script>
  import Button from "../controls/Button.svelte";

  const info = [
    ['Program Version', '9.2.0(tasmota)'],
    ['Build Date & Time', '2020-12-21T15:03:40'],
    ['Core/SDK Version', '2_7_4_9/2.2.2-dev(38a443e)'],
    ['Uptime', '1T22:32:38'],
    ['Flash write Count', '77 at 0xF7000'],
    ['Boot Count', '10'],
    ['Restart Reason', 'Power On'],
    ['Friendly Name 1', 'TasmotaPowerStripAlfa'],
    null,
    ['AP1 SSId (RSSI)','allx (96%, -52 dBm)'],
    ['Hostname','tasmota_E4BBCE-7118'],
    ['MAC Address','DC:4F:22:E4:BB:CE'],
    ['IP Address (wifi)','192.168.0.33'],
    null,
    ['Gateway','192.168.0.1'],
    ['Subnet Mask','255.255.255.0'],
    ['DNS Server','1.1.1.1'],
    null,
    ['MQTT Host','192.168.0.31'],
    ['MQTT Port','1883'],
    ['MQTT User','homeassistant'],
    ['MQTT Client','DVES_E4BBCE'],
    ['MQTT Topic','tasmota_%06X'],
    ['MQTT Group Topic 1','cmnd/tasmotas/'],
    ['MQTT Full Topic','cmnd/tasmota_E4BBCE/'],
    ['MQTT Fallback Topic','cmnd/DVES_E4BBCE_fb/'],
    ['MQTT No Retain','Disabled'],
    null,
    ['Emulation','None'],
    ['mDNS Discovery','Disabled'],
    null,
    ['ESP Chip Id','14990286'],
    ['Flash Chip Id','0x144051'],
    ['Flash Size','1024kB'],
    ['Program Flash Size','1024kB'],
    ['Program Size','586kB'],
    ['Free Program Space','416kB'],
    ['Free Memory','25kB'],
    null,
  ]
</script>

<table>
  <tbody>
    {#each info as i}
      {#if i}
        <tr>
          <th>{i[0]}</th>
          <td>{i[1]}</td>
        </tr>
      {:else}
        <tr class="spacer"></tr>
      {/if}
    {/each}
  </tbody>
</table>

<Button to="/" class="top-indent" title="Main Menu" />
