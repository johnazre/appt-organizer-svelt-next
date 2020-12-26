<script lang="ts">
	import { Router, Route } from "svelte-routing";
	import TopNav from "./components/layout/TopNav.svelte";
	import HomeView from "./routes/HomeView.svelte";
	import AddAppointmentView from "./routes/AddAppointmentView.svelte";
	import { onMount } from "svelte";
	import { populateAppointments } from "./stores/AppointmentsStore";

	export let url = "";

	onMount(() => {
		populateAppointments();
	});
</script>

<Router {url}>
	<TopNav />
	<div>
		<Route path="/">
			<HomeView />
		</Route>
		<Route path="/add-appointment">
			<AddAppointmentView />
		</Route>
	</div>
</Router>
