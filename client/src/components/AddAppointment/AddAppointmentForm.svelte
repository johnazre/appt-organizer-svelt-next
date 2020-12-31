<script lang="ts">
  import { Button, Form, FormGroup, Input, Label } from "sveltestrap";
  import { navigate } from "svelte-routing";
  import { addAppointment } from "../../stores/AppointmentsStore";
  import UsersStore from "../../stores/UsersStore";

  let date = "";
  let reason = "";
  let time = "";
  let withUser = "";

  function handleSubmit(event: Event) {
    event.preventDefault();

    let newAppt = {
      date: `${date} ${time}`,
      withUser: +withUser,
      reason,
    };

    // fetch(`http://localhost:3000/appointments`, {
    //   method: "POST",
    //   body: JSON.stringify(newAppt),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((response) => addAppointment(response))
    //   .then(() => navigate("/"));

    addAppointment(newAppt).then(() => navigate("/"));
  }
</script>

<Form on:submit={handleSubmit}>
  <FormGroup>
    <Label>Date</Label>
    <Input type="date" bind:value={date} />
  </FormGroup>
  <FormGroup>
    <Label>Time</Label>
    <Input type="time" bind:value={time} />
  </FormGroup>
  <FormGroup>
    <Label for="exampleSelect">With (Select whom you are meeting with)</Label>
    <Input type="select" name="select" id="exampleSelect" bind:value={withUser}>
      {#each $UsersStore as user (user.id)}
        <option value={user.id}>{user.fullName}</option>
      {/each}
    </Input>
  </FormGroup>
  <FormGroup>
    <Label>Reason</Label>
    <Input type="text" bind:value={reason} />
  </FormGroup>
  <Button type="submit">Submit</Button>
</Form>
