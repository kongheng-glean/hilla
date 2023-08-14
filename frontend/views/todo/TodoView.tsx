import { EndpointValidationError } from "@hilla/frontend";
import { Button } from "@hilla/react-components/Button.js";
import { Checkbox } from "@hilla/react-components/Checkbox.js";
import { TextField } from "@hilla/react-components/TextField.js";
import Todo from "Frontend/generated/com/example/application/entity/Todo";
import { TodoController } from "Frontend/generated/endpoints";
import { FormikErrors, useFormik } from "formik";
import { useEffect, useState } from "react";

export default function TodoView() {

  const empty: Todo = { id: 0, task: '', done: false };
  const [ todos, setTodos ] = useState(Array<Todo>());

  const formik = useFormik({
    initialValues: empty,
    onSubmit: async (value: Todo, { setSubmitting, setErrors }) => {
      try {
        const saved = await TodoController.save(value) ?? value;
        setTodos([...todos, saved]);
        formik.resetForm();
      } catch (e: unknown) {
        if (e instanceof EndpointValidationError) {
          const errors: FormikErrors<Todo> = {};
          for (const error of e.validationErrorData) {
            if (typeof error.parameterName === 'string' && error.parameterName in empty) {
              const key = error.parameterName as (string & keyof Todo);
              errors[key] = error.message;
            }
          }
          setErrors(errors);
        }
      } finally {
        setSubmitting(false);
      }
    }
  });

  async function changeStatus(todo: Todo, done: boolean) {
    const newTodo = {...todo, done: done};
    const saved = await TodoController.save(newTodo) ?? newTodo;
    setTodos(todos.map(item => item.id === todo.id ? saved : item));
  }

  useEffect(() => {
    (async () => {
      setTodos(await TodoController.fetchTodos());
    })();
    return () => {};
  }, [])

  return (
    <>
      <div className="m-m flex items-baseline gap-m"></div>
      <TextField
        name="task"
        label="Task"
        value={formik.values.task}
        onChange={formik.handleChange}
        onBlur={formik.handleChange}
      />
      <Button
        theme="primary"
        disabled={formik.isSubmitting}
        onClick={formik.submitForm}
      >
        Add
      </Button>

      <div className="m-m flex flex-col items-stretch gap-s">
        {
          todos.map(todo => (
            <Checkbox
              key={todo.id}
              label={todo.task}
              checked={todo.done}
              onCheckedChanged={({ detail: { value } }) => changeStatus(todo, value)}
            />
          ))
        }
      </div>
    </>
  );
}
