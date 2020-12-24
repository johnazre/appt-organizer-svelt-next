<script lang="ts">
  import { Container, Row, Col } from "sveltestrap";
  import AddAppointmentForm from "../components/AddAppointment/AddAppointmentForm.svelte";
</script>

<Container>
  <Row>
    <Col>
      <h1>Add Appointment</h1>
    </Col>
  </Row>
  <Row>
    <Col>
      <AddAppointmentForm />
    </Col>
  </Row>
</Container>
