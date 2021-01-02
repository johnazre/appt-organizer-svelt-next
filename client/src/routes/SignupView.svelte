<script lang="ts">
  import {
    Button,
    Col,
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    Row,
  } from "sveltestrap";
  import { navigate } from "svelte-routing";
  import { userSignup } from "../stores/UsersStore";

  let fullName = "";
  let company = "";
  let email = "";
  let password = "";
  let phone = "";

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    userSignup({ fullName, company, email, password, phone });
    navigate("/login");
  };
</script>

<Container fluid>
  <Row>
    <Col class="mt-5" xs={{ size: 6, offset: 2 }}>
      <h2 class="font-weight-bold">Log in below</h2>
    </Col>
  </Row>
  <Row>
    <Col xs={{ size: 6, offset: 3 }}>
      <Form on:submit={handleSubmit}>
        <FormGroup>
          <Label>Full Name</Label>
          <Input bind:value={fullName} />
        </FormGroup>
        <FormGroup>
          <Label>Company</Label>
          <Input bind:value={company} />
        </FormGroup>
        <FormGroup>
          <Label>Email</Label>
          <Input type="email" bind:value={email} />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input type="password" bind:value={password} />
        </FormGroup>
        <FormGroup>
          <Label>Phone</Label>
          <Input bind:value={phone} />
        </FormGroup>
        <Button type="submit">Submit</Button>
      </Form>
    </Col>
  </Row>
</Container>
