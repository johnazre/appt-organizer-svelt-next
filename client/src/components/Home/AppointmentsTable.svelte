<script lang="ts">
  import { onMount } from "svelte";
  import AppointmentsStore, {
    removeAppointment,
  } from "../../stores/AppointmentsStore";
  import { Table, Button } from "sveltestrap";
  import type { IAppointment } from "../../interfaces/IAppointment";
  import EditAppointmentModal from "./EditAppointmentModal.svelte";

  onMount(() => {
    fetch("http://localhost:3000/appointments")
      .then((res: Response) => res.json())
      .then((appointments: IAppointment[]) => (appts = appointments));
  });

  let appts: IAppointment[] = [];
  let selectedAppt: IAppointment;
  let open: boolean = false;

  const updateAppts = (event: any) => {
    appts = appts.map((appt: IAppointment) => {
      if (appt.id == event.detail.updatedAppt.id) {
        return event.detail.updatedAppt;
      }
      return appt;
    });
  };

  const toggle = (): boolean => (open = !open);
  const setSelectedAppt = (id: number): void => {
    selectedAppt = appts.find((appt) => appt.id == id);
    toggle();
  };

  const handleRemove = async (id: number): Promise<void> => {
    removeAppointment(id);
  };
</script>

<Table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Date/Time</th>
      <th>Contact Name</th>
      <th>Reason for meeting</th>
      <th>Manage</th>
    </tr>
  </thead>
  <tbody>
    {#each $AppointmentsStore as { id, date, contactName, reason }, i}
      <tr>
        <th scope="row">{id}</th>
        <td>{date}</td>
        <td>{contactName}</td>
        <td>{reason}</td>
        <td>
          <Button color="warning" on:click={() => setSelectedAppt(id)}>
            Edit
          </Button>
          <Button color="danger" on:click={() => handleRemove(id)}>
            Remove
          </Button>
        </td>
      </tr>
    {/each}
  </tbody>
</Table>
<EditAppointmentModal
  {open}
  {toggle}
  {selectedAppt}
  on:update-appts={updateAppts} />
