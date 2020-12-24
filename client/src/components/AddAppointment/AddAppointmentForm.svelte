<script lang="ts">
  import { Button, Form, FormGroup, Input, Label } from "sveltestrap";
  import { navigate } from "svelte-routing";

  let date = "";
  let contactName = "";
  let reason = "";
  let time = "";

  function handleSubmit(event: Event) {
    event.preventDefault();

    let newAppt = {
      date: `${date} ${time}`,
      contactName,
      reason,
    };

    fetch(`http://localhost:3000/appointments`, {
      method: "POST",
      body: JSON.stringify(newAppt),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => console.log("response", response))
      .then(() => navigate("/"));
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
    <Label>Contact Name</Label>
    <Input type="text" bind:value={contactName} />
  </FormGroup>
  <FormGroup>
    <Label>Reason</Label>
    <Input type="text" bind:value={reason} />
  </FormGroup>
  <Button type="submit">Submit</Button>
</Form>
