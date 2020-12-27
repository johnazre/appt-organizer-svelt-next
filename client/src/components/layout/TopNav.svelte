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

  let isOpen = false;

  function handleUpdate(event) {
    isOpen = event.detail.isOpen;
  }
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
          <NavLink tag={Link} to="/login">Hello there!</NavLink>
        {/if}
      </NavItem>
    </Nav>
  </Collapse>
</Navbar>
