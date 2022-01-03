import { useState } from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';

const Search = ({ value }: any) => {
	const [validated, setValidated] = useState(false);

	const handleSubmit = (event: any) => {
		event.preventDefault();
		setValidated(true);

		const form = event.currentTarget;

		if (!form.checkValidity()) return;

		window.location.replace(`/preview?host=${form.elements[0].value}&bedrock=${form.elements[2].checked}`)
	};

    return (
        <main>
            <h1 className='title'>
                Minecraft Server Status
            </h1>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <InputGroup>
                    <Form.Control type="text" placeholder='Server IP' defaultValue={value ? value : ''} required />
                    <Button type="submit">Search</Button>
                </InputGroup>
                <Form.Check
                    label="Bedrock Server"
                />
            </Form>
        </main>
    )
}

export default Search;