<script>
  import { get } from "../actions";

  import Button from "../controls/Button.svelte";
  import Select from "../controls/Select.svelte";

  const devices = [
    ["Generic (0)", "255"],
    ["Sonoff Basic (1)", "0"],
    ["Sonoff RF (2)", "1"],
    ["Sonoff TH (4)", "3"],
    ["Sonoff Dual (5)", "4"],
    ["Sonoff Dual R2 (39)", "38"],
    ["Sonoff Pow (6)", "5"],
    ["Sonoff Pow R2 (43)", "42"],
    ["Sonoff 4CH (7)", "6"],
    ["Sonoff 4CH Pro (23)", "22"],
    ["Sonoff S31 (41)", "40"],
    ["Sonoff S2X (8)", "7"],
    ["Sonoff Touch (10)", "9"],
    ["Sonoff T1 1CH (28)", "27"],
    ["Sonoff T1 2CH (29)", "28"],
    ["Sonoff T1 3CH (30)", "29"],
    ["Sonoff D1 (74)", "73"],
    ["Sonoff LED (11)", "10"],
    ["Sonoff BN-SZ (22)", "21"],
    ["Sonoff L1 (70)", "69"],
    ["Sonoff B1 (26)", "25"],
    ["Slampher (9)", "8"],
    ["Sonoff SC (21)", "20"],
    ["Sonoff iFan02 (44)", "43"],
    ["Sonoff iFan03 (71)", "70"],
    ["Sonoff Bridge (25)", "24"],
    ["Sonoff SV (3)", "2"],
    ["Sonoff Dev (19)", "18"],
    ["1 Channel (12)", "11"],
    ["4 Channel (13)", "12"],
    ["Motor C/AC (14)", "13"],
    ["ElectroDragon (15)", "14"],
    ["EXS Relay(s) (16)", "15"],
    ["Supla Espablo (31)", "30"],
    ["Luani HVIO (35)", "34"],
    ["Yunshan Relay (33)", "32"],
    ["WiOn (17)", "16"],
    ["Shelly 1 (46)", "45"],
    ["Shelly 2 (47)", "46"],
    ["BlitzWolf SHP (45)", "44"],
    ["Teckin (52)", "51"],
    ["Teckin US (59)", "58"],
    ["AplicWDP303075 (53)", "52"],
    ["Gosund SP1 v23 (55)", "54"],
    ["Luminea ZX2820 (65)", "64"],
    ["SK03 Outdoor (57)", "56"],
    ["Digoo DG-SP202 (63)", "62"],
    ["KA10 (64)", "63"],
    ["SP10 (67)", "66"],
    ["WAGA CHCZ02MB (68)", "67"],
    ["Neo Coolcam (49)", "48"],
    ["OBI Socket (51)", "50"],
    ["OBI Socket 2 (61)", "60"],
    ["Manzoku strip (60)", "59"],
    ["ESP Switch (50)", "49"],
    ["Tuya MCU (54)", "53"],
    ["ARMTR Dimmer (56)", "55"],
    ["PS-16-DZ (58)", "57"],
    ["EXS Dimmer (72)", "71"],
    ["PWM Dimmer (73)", "72"],
    ["H801 (20)", "19"],
    ["MagicHome (34)", "33"],
    ["Arilux LC01 (37)", "36"],
    ["Arilux LC06 (40)", "39"],
    ["Arilux LC11 (38)", "37"],
    ["Zengge WF017 (42)", "41"],
    ["Huafan SS (24)", "23"],
    ["Mi Desk Lamp (66)", "65"],
    ["KMC 70011 (36)", "35"],
    ["AiLight (27)", "26"],
    ["Xiaomi Philips (48)", "47"],
    ["SYF05 (69)", "68"],
    ["YTF IR Bridge (62)", "61"],
    ["Witty Cloud (32)", "31"],
    ["Generic (18)", "17"],
  ];

  const gpios = [
    ["None", "0"],
    ["Button", "32"],
    ["Button_n", "64"],
    ["Button_i", "96"],
    ["Button_in", "128"],
    ["Button_tc", "5024"],
    ["Switch", "160"],
    ["Switch_n", "192"],
    ["Rotary_a", "3264"],
    ["Rotary_b", "3296"],
    ["Relay", "224"],
    ["Relay_i", "256"],
    ["Led", "288"],
    ["Led_i", "320"],
    ["Counter", "352"],
    ["Counter_n", "384"],
    ["PWM", "416"],
    ["PWM_i", "448"],
    ["Buzzer", "480"],
    ["Buzzer_i", "512"],
    ["LedLink", "544"],
    ["LedLink_i", "576"],
    ["Output Hi", "3840"],
    ["Output Lo", "3872"],
    ["I2C SCL", "608"],
    ["I2C SDA", "640"],
    ["SSPI MISO", "832"],
    ["SSPI MOSI", "864"],
    ["SSPI SCLK", "896"],
    ["SSPI CS", "928"],
    ["SSPI DC", "960"],
    ["Serial Tx", "3200"],
    ["Serial Rx", "3232"],
    ["DHT11", "1184"],
    ["AM2301", "1216"],
    ["SI7021", "1248"],
    ["DHT11_o", "1280"],
    ["DS18x20", "1312"],
    ["DS18x20_o", "1344"],
    ["WS2812", "1376"],
    ["ALux IrRcv", "3136"],
    ["ALux IrSel", "3168"],
    ["MY92x1 DI", "3008"],
    ["MY92x1 DCKI", "3040"],
    ["SM16716 CLK", "2912"],
    ["SM16716 DAT", "2944"],
    ["SM16716 PWR", "2976"],
    ["SM2135 Clk", "4032"],
    ["SM2135 Dat", "4064"],
    ["Tuya Tx", "2272"],
    ["Tuya Rx", "2304"],
    ["EXS Enable", "4128"],
    ["MOODL Tx", "4640"],
    ["SHD Boot 0", "5568"],
    ["SHD Reset", "5600"],
    ["IRsend", "1056"],
    ["IRrecv", "1088"],
    ["HLWBL SEL", "2592"],
    ["HLWBL SEL_i", "2624"],
    ["HLWBL CF1", "2656"],
    ["HLW8012 CF", "2688"],
    ["BL0937 CF", "2720"],
    ["ADE7953 IRQ", "3456"],
    ["CSE7766 Tx", "3072"],
    ["CSE7766 Rx", "3104"],
    ["MCP39F5 Tx", "2752"],
    ["MCP39F5 Rx", "2784"],
    ["MCP39F5 Rst", "2816"],
    ["PZEM0XX Tx", "1472"],
    ["PZEM004 Rx", "1504"],
    ["PZEM016 Rx", "1536"],
    ["PZEM017 Rx", "1568"],
    ["BL0940 Rx", "5056"],
    ["SerBr Tx", "1792"],
    ["SerBr Rx", "1824"],
    ["DeepSleep", "4096"],
  ];

  function handleSaveClick() {
    get('/md?g99=0&g1=0&g2=0&g3=0&g4=0&g14=0&save=');
  }
</script>

<div class="form">
  <Select options={devices} title="Module type" />
  <Select options={gpios} title="GPIO1" inline />
  <Select options={gpios} title="GPIO2" inline />
  <Select options={gpios} title="GPIO3" inline />
  <Select options={gpios} title="GPIO4" inline />
  <Select options={gpios} title="GPIO14" inline />
  <Button type="submit" class="save top-indent" title="Save" onClick={handleSaveClick} />
</div>

<Button to="cn" title="Configuration" class="top-indent" />
