<script lang="ts">
	import { Router, Route } from "svelte-routing";
	import TopNav from "./components/layout/TopNav.svelte";
	import HomeView from "./routes/HomeView.svelte";
	import AddAppointmentView from "./routes/AddAppointmentView.svelte";

	export let url = "";
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
