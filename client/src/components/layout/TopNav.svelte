<script lang="ts">
  import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
  } from "sveltestrap";
  import { Link } from "svelte-routing";
  import { AuthStore } from "../../stores/AuthStore";
  import { afterUpdate } from "svelte";

  let isOpen = false;

  function handleUpdate(event) {
    isOpen = event.detail.isOpen;
  }

  afterUpdate(() => {
    console.log("auth store in topnave", $AuthStore);
  });
</script>

<Navbar color="primary" dark expand="md">
  <NavbarBrand href="/">Appointmentr</NavbarBrand>
  <NavbarToggler on:click={() => (isOpen = !isOpen)} />
  <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
    <Nav class="ml-auto" navbar>
      <NavItem>
        {#if !$AuthStore.isAuthed}
          <NavLink tag={Link} to="/login">Login</NavLink>
        {:else}
          {#await $AuthStore}
            <p>...waiting</p>
          {:then thestore}
            <NavLink tag={Link} to="/login">
              Hello there,
              {thestore.activeUser.fullName}!
            </NavLink>
          {/await}
        {/if}
      </NavItem>
    </Nav>
  </Collapse>
</Navbar>
