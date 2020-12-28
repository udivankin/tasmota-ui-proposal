<script>
	import { Router, Route } from "svelte-routing";
	import Index from './pages/Index.svelte';
	import Configuration from './pages/Configuration.svelte';
	import ConfigurationModule from './pages/Configuration.Module.svelte';
	import Information from './pages/Information.svelte';
	import Firmware from './pages/Firmware.svelte';
	import Console from './pages/Console.svelte';
	import ToastNotifications from "./controls/ToastNotifications.svelte";

	export let url = '';
</script>

<main>
	<h3>Sonoff Basic Module</h3>
	<h2>TasmotaPowerStripAlfa</h2>
	<Router url="{url}">
    <Route path="cn" component="{Configuration}" />
    <Route path="cm" component="{ConfigurationModule}" />
    <Route path="in" component="{Information}" />
    <Route path="up" component="{Firmware}" />
    <Route path="cs" component="{Console}" />
    <Route path="/" component="{Index}"/>
	</Router>
	<footer>
		Tasmota 9.2.0 by Theo Arends
	</footer>
	<ToastNotifications />
</main>

<style>
	footer {
		border-top: 1px solid #888;
		color: #888;
		font-size: 0.75rem;
		margin: 1rem 0.3rem 0 0.3rem;
		padding-top: 0.3rem;
		text-align: right;
	}
</style>