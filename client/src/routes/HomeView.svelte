<script lang="ts">
  import { Button, Col, Container, Row, Table } from "sveltestrap";
  import { navigate } from "svelte-routing";
  import AppointmentsTable from "../components/Home/AppointmentsTable.svelte";

  function handleClick(): void {
    navigate("/add-appointment");
  }
</script>

<Container>
  <Row>
    <Col>
      <Button on:click={handleClick}>Add Appointment</Button>
    </Col>
  </Row>
  <Row>
    <Col>
      <h1 class="mt-4 mb-3">List of appointments</h1>
      <AppointmentsTable />
    </Col>
  </Row>
</Container>
