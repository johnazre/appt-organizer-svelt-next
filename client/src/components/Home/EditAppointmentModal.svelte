<script lang="ts">
  import { afterUpdate, onMount } from "svelte";
  import {
    Button,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalHeader,
  } from "sveltestrap";
  import type { IAppointment } from "../../interfaces/IAppointment";
  import { updateAppointment } from "../../stores/AppointmentsStore";
  import UsersStore from "../../stores/UsersStore";

  export let selectedAppt: IAppointment;
  export let open: boolean;
  export let toggle: () => void;

  onMount(() => {
    console.log("on mount");
    if (selectedAppt) {
      id = selectedAppt.id;
      date = selectedAppt.date;
      withUser = selectedAppt.withUser;
      reason = selectedAppt.reason;
    }
  });

  afterUpdate(() => {
    let updatedAppt = {
      id,
      date,
      withUser,
      reason,
    };
    date = date;
    reason = reason;
    withUser = withUser;
    console.log("updated appt in afterupdate", updatedAppt);
  });

  let date: string;
  let withUser: any;
  let reason: string;
  let id: number;

  function handleInput(e) {
    withUser = e.target.value;
  }

  async function handleSubmit(event: Event) {
    event.preventDefault();

    let updatedAppt = {
      id,
      date,
      withUser,
      reason,
    };

    updateAppointment(updatedAppt);

    toggle();
  }
</script>

<Modal isOpen={open} {toggle} transitionOptions={{}}>
  <ModalHeader {toggle}>Modal title</ModalHeader>
  {#if selectedAppt.date}
    <ModalBody>
      <Form on:submit={handleSubmit}>
        <FormGroup>
          <Label>Date and Time</Label>
          <Input type="datetime" bind:value={date} />
        </FormGroup>
        <FormGroup>
          <Label>With (Select whom you are meeting with)</Label>
          <Input type="select" bind:value={withUser} on:input={handleInput}>
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
    </ModalBody>
  {/if}
</Modal>
