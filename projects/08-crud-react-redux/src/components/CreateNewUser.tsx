import { Badge, Button, Card, TextInput, Title } from "@tremor/react";
import { useUserActions } from '../hooks/UseUserActions';
import React, { useState } from "react";

export function CreateNewUser() {
  const { addUser } = useUserActions();
  const [result, setResult] = useState<"ok" | "ko" | null>(null)

  const handleSubmit = (event) => {
    event.preventDefault();
    setResult(null);

    const form = event.target;
    const formData = new FormData(form);

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const github = formData.get('github') as string;

    if (!name || !email || !github) {
      // validaciones que tu quieras
      return setResult("ko")
    }

    addUser({ name, email, github });
    setResult("ok");
    form.reset();
  }

  return (
    <Card className="container mx-auto text-center p-5" style={{ marginTop: '16px' }}>
      <Title>Create New User</Title>

      <form onSubmit={handleSubmit} className="">
        <TextInput name="name" placeholder="Name" />
        <TextInput name="email" placeholder="Email" />
        <TextInput name="github" placeholder="Github User" />

        <div>
          <Button style={{ marginTop: '16px' }} type="submit">
            Create User
          </Button>
          <span>
            {result === "ok" && (
              <Badge color='green'>Guardado correctamente</Badge>
            )}
            {result === "ko" && <Badge color='red'>Error con los campos</Badge>}
          </span>
        </div>
      </form>
    </Card>
  )
}
