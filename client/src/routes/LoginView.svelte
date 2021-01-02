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
    import { navigate, Link } from "svelte-routing";
    import { setIsAuthed } from "../stores/AuthStore";

    let email = "";
    let password = "";
    let showError = false;

    const handleSubmit = (e: Event) => {
        e.preventDefault();
        if (!email || !password) {
            showError = true;
        } else {
            setIsAuthed(true, email);
            navigate("/home");
        }
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
                    <Input type="email" bind:value={email} />
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input type="password" bind:value={password} />
                </FormGroup>
                <Button type="submit">Submit</Button>
            </Form>
        </Col>
    </Row>
    {#if showError}
        <Row>
            <Col class="mt-4 font-size-54" xs={{ size: 6, offset: 3 }}>
                <h4 class="text-center font-weight-bold text-danger">
                    Both email and password must be filled in to continue
                </h4>
            </Col>
        </Row>
    {/if}
    <Row>
        <Col class="mt-4 font-size-54" xs={{ size: 6, offset: 3 }}>
            <h4 class="text-center">
                If you don't have an account yet,
                <Link to="/signup">Click here to create one</Link>
            </h4>
        </Col>
    </Row>
</Container>
