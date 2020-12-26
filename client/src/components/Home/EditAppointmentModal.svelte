<script lang="ts">
  import { afterUpdate } from "svelte";
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

  export let selectedAppt: IAppointment;
  export let open: boolean;
  export let toggle: () => void;

  afterUpdate(() => {
    if (selectedAppt) {
      console.log(typeof date);

      id = selectedAppt.id;
      date = selectedAppt.date;
      contactName = selectedAppt.contactName;
      reason = selectedAppt.reason;
    }
  });

  let date: string;
  let contactName: string;
  let reason: string;
  let id: number;

  async function handleSubmit(event: Event) {
    event.preventDefault();

    let updatedAppt = {
      id,
      date,
      contactName,
      reason,
    };

    updateAppointment(updatedAppt);

    toggle();
  }
</script>

<Modal isOpen={open} {toggle} transitionOptions={{}}>
  <ModalHeader {toggle}>Modal title</ModalHeader>
  <ModalBody>
    <Form on:submit={handleSubmit}>
      <FormGroup>
        <Label>Date and Time</Label>
        <Input type="datetime" bind:value={selectedAppt.date} />
      </FormGroup>
      <FormGroup>
        <Label>Contact Name</Label>
        <Input type="text" bind:value={selectedAppt.contactName} />
      </FormGroup>
      <FormGroup>
        <Label>Reason</Label>
        <Input type="text" bind:value={selectedAppt.reason} />
      </FormGroup>
      <Button type="submit">Submit</Button>
    </Form>
  </ModalBody>
</Modal>
