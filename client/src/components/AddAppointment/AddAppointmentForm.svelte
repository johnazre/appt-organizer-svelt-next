<script lang="ts">
  import { Button, Form, FormGroup, Input, Label } from "sveltestrap";
  import { navigate } from "svelte-routing";
  import { addAppointment } from "../../stores/AppointmentsStore";
  import UsersStore from "../../stores/UsersStore";

  let date = "";
  let reason = "";
  let time = "";
  let withUser = "0";

  function handleSubmit(event: Event) {
    event.preventDefault();

    let newAppt = {
      date: `${date} ${time}`,
      withUser: +withUser,
      reason,
    };

    console.log("newappt", newAppt);

    addAppointment(newAppt).then(() => navigate("/home"));
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
      <option value="0" disabled>-- Select a user from below --</option>
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
