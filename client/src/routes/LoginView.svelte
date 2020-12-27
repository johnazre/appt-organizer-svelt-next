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
    import { setIsAuthed } from "../stores/AuthStore";

    let email = "";
    let password = "";

    const handleSubmit = (e: Event) => {
        e.preventDefault();
        setIsAuthed(true);
        navigate("/home");
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
                    <Label>Email</Label>
                    <Input bind:value={email} />
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input bind:value={password} />
                </FormGroup>
                <Button type="submit">Submit</Button>
            </Form>
        </Col>
    </Row>
</Container>
