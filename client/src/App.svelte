<script lang="ts">
	import { Router, Route, navigate } from "svelte-routing";
	import TopNav from "./components/layout/TopNav.svelte";
	import HomeView from "./routes/HomeView.svelte";
	import AddAppointmentView from "./routes/AddAppointmentView.svelte";
	import { afterUpdate, onMount } from "svelte";
	import { populateAppointments } from "./stores/AppointmentsStore";
	import LoginView from "./routes/LoginView.svelte";
	import Redirect from "./components/util/Redirect.svelte";
	import { AuthStore } from "./stores/AuthStore";
	import { populateUsers } from "./stores/UsersStore";

	export let url = "";

	onMount(() => {
		populateAppointments();
		populateUsers();
	});

	afterUpdate(() => {
		console.log("auth store", $AuthStore);
	});
</script>

<Router {url}>
	<TopNav />
	<div>
		<Route path="/">
			<Redirect to="/login" />
		</Route>
		<Route path="/home">
			<HomeView />
		</Route>
		<Route path="/login">
			<LoginView />
		</Route>
		<Route path="/add-appointment">
			<AddAppointmentView />
		</Route>
	</div>
</Router>
